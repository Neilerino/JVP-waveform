// TODO: Define a type for action
import { PlotParams } from './../../interfaces';

const graphReducer = (graphData: PlotParams, action: any) => {
    if (graphData === undefined) {
        graphData = {
            data: [
                {
                    x: [ 0 ],
                    y: [ new Date().getTime() ],
                    type: 'scatter'
                }
            ],
            layout: {
                title: 'Jugular Venous Pressure Information',
            }
        }
    }

    switch(action.type) {
        case('UPDATE'):
            Array(graphData.data[0].x).push(action.value);
            Array(graphData.data[0].y).push(action.time);
            return graphData;
        default:
            return graphData;
    }
}

export default graphReducer;