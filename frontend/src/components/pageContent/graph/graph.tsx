import React from 'react';
import Plot from 'react-plotly.js';
import { PlotParams } from '../../../interfaces';


interface GraphProps extends React.Props<any> {
    graphData: PlotParams;
};

// const Graph: React.FC<GraphProps> = ({ graphData }) => {

//     return (
//         <Plot data={graphData.data} layout={graphData.layout} revision={graphData.revision}/>
//     )
// }

class Graph extends React.Component<GraphProps, any> {
    constructor(props: GraphProps) {
        super(props);
        this.state = {
            data: props.graphData.data,
            layout: props.graphData.layout,
            revision: props.graphData.revision
        };
    }

    render() {
        return(
            <Plot data={this.state.data} layout={this.state.layout} revision={this.state.revision}/>
        )
    }
}

export default Graph;