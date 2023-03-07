import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { reducer as formReducer } from "redux-form";

import thunk from "redux-thunk";

import devTools from "remote-redux-devtools";

import homeReducer from "../screens/HomeScreen/reducer";
import pendanaReducer from "../screens/PendanaScreen/reducer";
const rootReducer =  combineReducers({
  form: formReducer,
  homeReducer,
  pendanaReducer
});


// const rootReducer = combineReducers({
//   count: CountReducer,
// });

const enhancer = compose(
  applyMiddleware(thunk),
  devTools({
    name: "DavestMoney",
    realtime: true
  })
);

 
export const store = createStore(rootReducer, enhancer);