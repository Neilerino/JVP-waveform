import { combineReducers } from 'redux';
import sideBarReducer from './sideBarReducer';

export default combineReducers({
    displaySideBar: sideBarReducer
});
