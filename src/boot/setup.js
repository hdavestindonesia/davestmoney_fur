
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";

import App from "../App";
import { store } from './store';

export default class Setup extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}