import { TypedUseSelectorHook, useSelector } from "react-redux";
import { PlotParams } from '../interfaces';

export interface StoreState {
    displaySideBar: Boolean;
    graphData: PlotParams;
    gainValue: number;
};

const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default typedUseSelector;
