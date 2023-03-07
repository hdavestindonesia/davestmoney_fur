import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Vibration,
  Alert,
} from 'react-native';
import Camera from 'react-native-camera';
import {blue} from '../libs/Constants';
import {getApi} from '../libs/api';
import timer from 'react-native-timer';
import {navigatorStyle} from '../libs/Constants'
import getItem from '../libs/getItem';
import deeplink from '../libs/deeplink';
import Permissions from 'react-native-permissions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window')
export default class extends Component{
  static navigatorStyle = navigatorStyle

  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {
    // this.props.navigator.setTitle({
    //   title: 'Camera'
    // })
  }

  takePicture = () => {
    if (this.camera) {

      const options = { jpegQuality: 50 };
      this.camera.capture(options)
        .then((data) => {
          this.props.onCapture(data)
          // this.props.navigator.pop()

          this.props.navigation.dispatch(
            StackActions.pop()
          )
        })
        .catch(err => console.error(err));

    }
  };

  render() {
    let {typeCamera} = this.props.navigation.state.params

    return (
      <View style={{flex:1}}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={typeCamera == 'front' ? Camera.constants.Type.front : Camera.constants.Type.back}
          captureTarget={Camera.constants.CaptureTarget.disk}
          keepAwake>
        </Camera>

        <View style={{position:'absolute', bottom:0, alignItems:'center', width:'100%', padding:10}}>
          <TouchableOpacity onPress={this.takePicture}>
            <Image
              style={{height:75, width:75, tintColor:'white'}}
              source={require('../assets/images/takefoto.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});