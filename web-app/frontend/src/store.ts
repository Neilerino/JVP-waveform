import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";

const configureStore = () => {
  const composeEnhancers =
    (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore();
