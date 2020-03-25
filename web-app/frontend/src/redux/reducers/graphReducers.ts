// TODO: Fix the typing

const initialState = () => {
  return {
    x: [new Date().toTimeString().split(" ")[0]],
    y: [0],
    type: "scatter"
  };
};

const graphReducer = (
  data: any = initialState(),
  { data: newData, type }: any
) => {
  if (type === "UPDATE_GRAPH") {
    const { value, time } = newData;
    return { ...data, x: data.x.concat([time]), y: data.y.concat([value]) };
  }
  return data;
};

export default graphReducer;
