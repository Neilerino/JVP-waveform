import React from "react";
import styles from "./dataCollection.module.scss";
import TitleBox from "../../components/pageContent/titleBox/titleBox";
import GainBox from "../../components/pageContent/gain/gainBox/gainBox";
import StatsBox from "../../components/pageContent/statsBox/statsBox";
import FreqBox from "../../components/pageContent/frequency/freqBox";
import MovingAverage from "../../components/pageContent/movingAverage/movingAverage";
import typedUseSelector from "../../redux/reduxInterfaces";
import Plot from "react-plotly.js";

// Note logic for changing layout based on how many points there are
// can be done here.
const makePlotlyLayout = (title: string, datarevision: number) => ({
  title,
  datarevision
});

const dataCollection: React.FC = () => {
  const collecting = typedUseSelector(
    (state: { collecting: boolean }) => state.collecting
  );

  const graphData = typedUseSelector(
    (state: { graphData: any }) => state.graphData
  );

  return (
    <>
      <div className={styles.graphBackground}>
        <Plot
          data={[graphData]}
          layout={makePlotlyLayout(
            "Jugular Venous Pressure Information",
            graphData.x.length
          )}
          revision={graphData.x.length}
          config={{ scrollZoom: true }}
        />
      </div>
      <div className={styles.microprocessorInformation}>
        <TitleBox text="Data Collection" />
        <StatsBox collecting={collecting} />

        <TitleBox text="Frequency" />
        <FreqBox />

        <TitleBox text="Digital Potentiometer" />
        <GainBox collecting={collecting} />

        <TitleBox text="Moving Average Filter" />
        <MovingAverage />
      </div>
    </>
  );
};

export default dataCollection;
