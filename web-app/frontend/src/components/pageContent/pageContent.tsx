import React from "react";
import "./pageContent.css";
import SideBar from "./sideBar/sideBar";
import TitleBox from "./titleBox/titleBox";
import GainBox from "./gain/gainBox/gainBox";
import StatsBox from "./statsBox/statsBox";
import FreqBox from "./frequency/freqBox";
import MovingAverage from "./movingAverage/movingAverage";
import typedUseSelector from "../../redux/reduxInterfaces";
import Plot from "react-plotly.js";

// Note logic for changing layout based on how many points there are
// can be done here.
const makePlotlyLayout = (title: string, datarevision: number) => ({
  title,
  width: 700,
  height: 600,
  datarevision
});

const PageContent: React.FC = () => {
  const collecting = typedUseSelector(
    (state: { collecting: boolean }) => state.collecting
  );
  const graphData = typedUseSelector(
    (state: { graphData: any }) => state.graphData
  );

  return (
    <div className="page-content">
      <SideBar />
      <div className="graph-background">
        <Plot
          data={[graphData]}
          layout={makePlotlyLayout(
            "Jugular Venous Pressure Information",
            graphData.x.length
          )}
          revision={graphData.x.length}
        />
      </div>
      <div className="microprocessor-information">
        <TitleBox text="Data Collection" />
        <StatsBox collecting={collecting} />

        <TitleBox text="Frequency" />
        <FreqBox />

        <TitleBox text="Digital Potentiometer" />
        <GainBox collecting={collecting} />

        <TitleBox text="Moving Average Filter" />
        <MovingAverage />
      </div>
    </div>
  );
};

export default PageContent;
