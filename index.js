// if (!__DEV__) {
//   console.log = () => {};
// }
// import App from './src/app';




if (!__DEV__) {
  console.log = () => {};
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);