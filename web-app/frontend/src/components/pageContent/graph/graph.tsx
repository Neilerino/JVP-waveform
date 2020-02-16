import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import typedUseSelector from '../../../redux/reduxInterfaces';
import { type } from 'os';

const Graph: React.FC = () => {

    const graphData = typedUseSelector((state: {graphData: any}) => state.graphData);

    return(
        <Plot
            data={graphData.data}
            layout={graphData.layout}
            revision={graphData.revision}
        />
    )
};

export default Graph;