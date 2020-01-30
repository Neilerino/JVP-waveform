import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import typedUseSelector from '../../../redux/reduxInterfaces';

const Graph: React.FC = () => {

    const state = useState(typedUseSelector(state => state.graphData));

    useEffect(() => {
        console.log('Graph State Revision: ' + state[0].revision);
    })

    return(
        <Plot 
            data={state[0].data}
            layout={state[0].layout}
            revision={state[0].revision}
        />
    )
};

export default Graph;