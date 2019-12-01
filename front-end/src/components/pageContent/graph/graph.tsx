import React from 'react';
import Plot from 'react-plotly.js';
import { PlotParams } from '../../../interfaces';


interface GraphProps extends React.Props<any> {
    graphData: PlotParams;
};

const Graph: React.FC<GraphProps> = ({ graphData }) => {

    return (
        <Plot data={graphData.data} layout={graphData.layout} revision={graphData.revision}/>
    )
}

export default Graph;