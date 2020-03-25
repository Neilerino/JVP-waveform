import { combineReducers } from "redux";
import sideBarReducer from "./sideBarReducer";
import { graphReducer, graphIdReducer } from "./graphReducers";
import {
  gainReducer,
  collectionReducer,
  frequencyReducer,
  movingAverageReducer
} from "./microReducers";

export default combineReducers({
  displaySideBar: sideBarReducer,
  graphId: graphIdReducer,
  graphData: graphReducer,
  gainValue: gainReducer,
  frequencyValue: frequencyReducer,
  movingAverageValue: movingAverageReducer,
  collecting: collectionReducer
});
