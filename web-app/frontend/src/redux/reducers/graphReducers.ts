// TODO: Fix the typing

interface IDAction {
  type: string;
  value: number;
}

const initialState = () => {
  return {
    x: [new Date().toTimeString().split(" ")[0]],
    y: [0],
    type: "scatter"
  };
};

export const graphReducer = (
  data: any = initialState(),
  { data: newData, type }: any
) => {
  if (type === "UPDATE_GRAPH") {
    let dataUpdate = { ...data };
    newData.forEach((dataPoint: any) => {
      dataUpdate = {
        ...dataUpdate,
        x: dataUpdate.x.concat([dataPoint.x]),
        y: dataUpdate.y.concat([dataPoint.y])
      };
    });
    return dataUpdate;
  } else if (type === "RESET_GRAPH") {
    return initialState();
  }
  return data;
};

export const graphIdReducer = (
  state: number | null | undefined,
  action: IDAction
) => {
  if (action.type === "UPDATE_ID") {
    state = action.value;
  } else {
    state = null;
  }
  return state;
};
