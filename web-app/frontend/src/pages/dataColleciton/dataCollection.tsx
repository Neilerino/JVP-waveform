import React from "react";
import styles from "./dataCollection.module.scss";
import TitleBox from "../../components/pageContent/titleBox/titleBox";
import GainBox from "../../components/pageContent/gain/gainBox/gainBox";
import StatsBox from "../../components/pageContent/statsBox/statsBox";
import FreqBox from "../../components/pageContent/frequency/freqBox";
import MovingAverage from "../../components/pageContent/movingAverage/movingAverage";
import typedUseSelector from "../../redux/reduxInterfaces";
import Plot from "react-plotly.js";
import { tourSelectors } from "../../helpTour";

// Note logic for changing layout based on how many points there are
// can be done here.
export const makePlotlyLayout = (
  title: string,
  datarevision: number,
  yaxis?: object
) => ({
  title,
  datarevision,
  yaxis
});

const dataCollection: React.FC = () => {
  const collecting = typedUseSelector(
    (state: { collecting: boolean }) => state.collecting
  );

  const graphData = typedUseSelector(
    (state: { graphData: any }) => state.graphData
  );

  const getUpdatedGraphData = () => {
    const x = graphData.x;
    const y = graphData.y;

    return {
      x: x.slice(x.length - 300 * 0.75),
      y: y.slice(y.length - 300 * 0.75),
      type: "scatter"
    } as any;
  };

  return (
    <>
      <div className={styles.graphBackground}>
        <Plot
          data={[getUpdatedGraphData()]}
          layout={makePlotlyLayout(
            "Jugular Venous Pressure Information",
            graphData.x.length,
            {
              range: [0, 5000]
            }
          )}
          revision={graphData.x.length}
          config={{ scrollZoom: true }}
        />
      </div>
      <div className={styles.microprocessorInformation}>
        <TitleBox text="Data Collection" />

        <span data-tut={tourSelectors.timer}>
          <StatsBox collecting={collecting} />
        </span>

        <span data-tut={tourSelectors.frequency}>
          <TitleBox text="Frequency" />
          <FreqBox />
        </span>

        <span data-tut={tourSelectors.potentiometer}>
          <TitleBox text="Digital Potentiometer" />
          <GainBox collecting={collecting} />
        </span>

        <span data-tut={tourSelectors.movingAverage}>
          <TitleBox text="Moving Average Filter" />
          <MovingAverage />
        </span>
      </div>
    </>
  );
};

export default dataCollection;
