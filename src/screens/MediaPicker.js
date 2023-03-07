import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, PermissionsAndroid, Dimensions } from 'react-native';
import {navigatorStyle} from '../libs/Constants';
import MediaPicker from "react-native-mediapicker"

const marker = require('../assets/images/placeholder_land.jpg');

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle

	constructor(props){
    super(props);
    this.state = {
      totalFiles: 0,
      selected: [],
      hasPermission: false
    }
  }
  
  componentWillMount(){
    // this.props.navigator.setTitle({
		// 	title: 'Media'
		// })
  }
  
  getSelectedFiles(items) {
    this.props.onSelected(items[0])
    this.props.navigation.dispatch(
            StackActions.pop()
          )
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MediaPicker
				  callback={items => this.getSelectedFiles(items)}
				  groupTypes="SavedPhotos"
				  assetType="Photos"
				  maximum={1}
				  imagesPerRow={3}
				  imageMargin={5}
				  showLoading={true}
				  backgroundColor="black"
				  selectedMarker={
				    <Image
				      style={[styles.checkIcon, {width: 25, height: 25, right: this.props.imageMargin + 5},]}
				      source={require('../assets/images/placeholder_land.jpg')}
				    />
				  } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  marker:{
    width: 30,
    height: 30,
    zIndex: 2445,
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
  markerWrapper: {
    position: 'absolute',
    flex:1,
    top: 0 ,
    zIndex: 2445,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});