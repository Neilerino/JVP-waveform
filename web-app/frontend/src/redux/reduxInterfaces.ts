import { TypedUseSelectorHook, useSelector } from "react-redux";
import { PlotParams } from '../interfaces';

export interface StoreState {
    displaySideBar: boolean;
    graphData: PlotParams;
    gainValue: number;
    collecting: boolean;
};

const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default typedUseSelector;
