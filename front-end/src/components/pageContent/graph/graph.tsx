import React from 'react';
import Plot from 'react-plotly.js';
import typedUseSelector from '../../../redux/reduxInterfaces';
import { PlotParams } from '../../../interfaces';


const Graph: React.FC = () => {

    let graphData = typedUseSelector((state: { graphData: PlotParams; }) => state.graphData);

    if (graphData === undefined) {
        graphData = {
            data: [
                {
                    x: [ 0, 1, 2, 3 ],
                    y: [ 0, 1, 2, 3 ],
                    type: 'scatter'
                }
            ],
            layout: {
                title: 'Jugular Venous Pressure Information',
                width: 700,
                height: 600,
            }
        }
    }

    return (
        <Plot data={graphData.data} layout={graphData.layout}/>
    )
}

export default Graph;