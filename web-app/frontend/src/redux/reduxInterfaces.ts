import { TypedUseSelectorHook, useSelector } from "react-redux";
import { PlotParams } from '../interfaces';

export interface StoreState {
    displaySideBar: boolean;
    graphData: PlotParams;
    gainValue: number;
    frequencyValue: number;
    movingAverageValue: number | null;
    collecting: boolean;
};

const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default typedUseSelector;
