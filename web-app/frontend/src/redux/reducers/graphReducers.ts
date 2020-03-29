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

const graphActions = {
  UPDATE: "UPDATE_GRAPH",
  RESET: "RESET_GRAPH"
};

export const graphReducer = (
  data: any = initialState(),
  { data: newData, type }: any
) => {
  const { UPDATE, RESET } = graphActions;
  switch (type) {
    case UPDATE: {
      let dataUpdate = { ...data };
      newData.forEach((dataPoint: any) => {
        dataUpdate = {
          ...dataUpdate,
          x: dataUpdate.x.concat([dataPoint.x]),
          y: dataUpdate.y.concat([dataPoint.y])
        };
      });
      return dataUpdate;
    }
    case RESET: {
      return initialState();
    }
    default: {
      return data;
    }
  }
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
