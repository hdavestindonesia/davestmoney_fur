import React from "react";

import Setup from "./src/boot/setup";

export default class App extends React.Component {
  render() {
    return <Setup />;
  }
}





// import React from 'react';
// import { View, Text } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import HomeScreen from "./src/screens/HomeScreen";
// const AppNavigator = createStackNavigator(
//   {
//     Home: { screen: HomeScreen }
//   },
//   {
//     index: 0,
//     initialRouteName: "Home",
//     headerMode: "none"
//   }
// );
// export default createAppContainer(AppNavigator);