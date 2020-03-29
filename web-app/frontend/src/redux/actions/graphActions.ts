export const UPDATE_GRAPH_DATA: string = "UPDATE_GRAPH";
interface graphData {
  value: number;
  time: number;
}

export const updateGraphData = (data: graphData) => {
  return {
    type: UPDATE_GRAPH_DATA,
    data: data
  };
};

export const resetGraph = () => {
  return {
    type: "RESET_GRAPH",
    data: null
  };
};

export const updateGraphId = (data: number) => {
  return {
    type: "UPDATE_ID",
    data: data
  };
};
