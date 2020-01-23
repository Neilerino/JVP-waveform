import { combineReducers } from 'redux';
import sideBarReducer from './sideBarReducer';
import graphReducer from './graphReducers';

export default combineReducers({
    displaySideBar: sideBarReducer,
    graphData: graphReducer
});
