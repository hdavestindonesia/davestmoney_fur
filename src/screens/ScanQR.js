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
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import timer from 'react-native-timer';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import {postApi} from '../libs/api';
import getItem from '../libs/getItem';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
const {width, height} = Dimensions.get('window')

let isBarcodeFound = false

export default class extends Component {
  static navigatorStyle = navigatorStyle;

  constructor(props){
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
    }

    let { navigator } = props
    navigator.setOnNavigatorEvent((event)=> {
      let {id} = event
      if (id == 'didAppear') {
        isBarcodeFound = false
      }
    })
  }

  componentDidMount() {
    getItem('USER', (user) => {
      this.setState({user: user})
    })
  }

  componentWillMount() {
    // this.props.navigator.setTitle({
    //   title: 'Scan QR Code Untuk Transaksi'
    // })
  }

  onBarCodeRead = (e) => {
    if(!isBarcodeFound){
      isBarcodeFound = true
      let barcode = e.data
      if(barcode[0] == '0' && barcode[1] == '8'){
        // this.props.navigator.push({
        //   screen: 'AntarLifesWallet',
        //   passProps: {
        //     noPonsel: barcode
        //   }
        // })

        this.props.navigation.navigate("AntarLifesWallet",{
          noPonsel: barcode
        })
      }else{
        this.inquiry(barcode)
      }
    }
  }

  inquiry = (qrCode) => {
    let {user} = this.state

    generateCounter((counter) => {
      let params = {
        command : 'INQUIRYQRPAY',
        idproduk : 'MONEY',
        counter : counter,
        no_telp : user.no_telp,
        signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
        datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
        qr_data : qrCode
      }

      postApi('', params, true, (resp) => {
        if(resp.resultcode == '0000'){
          // this.props.navigator.push({
          //   screen: 'PembayaranTagihan',
          //   passProps: {
          //     data:resp
          //   }
          // })


          this.props.navigation.navigate("PembayaranTagihan",{
            data:resp
          })
          
        }else{
          Alert.alert('Info', resp.result)
        }
      })
    })
  }

  render() {
    return (
      <Camera
        style={styles.preview}
        onBarCodeRead={this.onBarCodeRead}
        defaultOnFocusComponent={true}
        keepAwake>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            
          </Text>
        </View>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    top: height / 5,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(244, 246, 247, 0.4)'
  },
  overlayText: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: 150,
    textAlign: 'center'
  }
});