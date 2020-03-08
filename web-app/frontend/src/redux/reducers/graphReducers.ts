// TODO: Fix the typing

const initialState = () => {
  return {
    data: [
      {
        x: [new Date().toTimeString().split(" ")[0]],
        y: [0],
        type: "scatter"
      }
    ],
    layout: {
      title: "Jugular Venous Pressure Information",
      width: 700,
      height: 600,
      datarevision: 0
    },
    revision: 0
  };
};

const graphReducer = (state: any = initialState(), action: any) => {
  if (action.type === "UPDATE_GRAPH") {
    const newState = {
      data: state.data,
      layout: state.layout,
      revision: state.revision
    };
    newState.data[0].y.push(action.data.value);
    newState.data[0].x.push(action.data.time);
    newState.layout.datarevision++;
    newState.revision++;
    return newState;
  }
  return state;
};

export default graphReducer;
