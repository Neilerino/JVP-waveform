export const UPDATE_GRAPH_DATA: string = 'UPDATE';
interface graphData {
    value: number,
    time: number
}

const updateGraphData = (data: graphData) => {
    return {
        type: UPDATE_GRAPH_DATA,
        data: data
    }
}

export default updateGraphData;