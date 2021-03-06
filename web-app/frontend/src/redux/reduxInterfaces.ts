import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface StoreState {
  displaySideBar: boolean;
  graphId: number;
  graphData: Array<Object>;
  gainValue: number;
  frequencyValue: number;
  movingAverageValue: number | null;
  collecting: boolean;
}

const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default typedUseSelector;
