import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface StoreState {
    displaySideBar: Boolean;
};

const typedUseSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default typedUseSelector;
