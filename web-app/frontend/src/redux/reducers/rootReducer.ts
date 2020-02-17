import { combineReducers } from 'redux';
import sideBarReducer from './sideBarReducer';
import graphReducer from './graphReducers';
import { gainReducer, collectionReducer, frequencyReducer } from './microReducers';

export default combineReducers({
    displaySideBar: sideBarReducer,
    graphData: graphReducer,
    gainValue: gainReducer,
    frequencyValue: frequencyReducer,
    collecting: collectionReducer,
});
