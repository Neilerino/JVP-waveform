import React, { useState } from "react";
import Plot from "react-plotly.js";
import typedUseSelector from "../../../redux/reduxInterfaces";

const Graph: React.FC = () => {
  const graphData = typedUseSelector(
    (state: { graphData: any }) => state.graphData
  );

  return (
    <Plot
      data={graphData.data}
      layout={graphData.layout}
      revision={graphData.revision}
    />
  );
};

export default Graph;
