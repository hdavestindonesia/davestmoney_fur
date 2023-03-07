import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import { Platform } from 'react-native';

//==============COLOR==========
let screenBackgroundColor = 'rgb(242, 243, 244)'
let blue = '#0079c2'
let green = '#0f3947'
let greenOld = '#0b2c38'
let grey = 'rgb(124,124,124)'
let yellow = '#f9c828'

//081321520614 pass=146315

//=============API==============
//LIVE
// let API_BASE_URL = "http://209.97.167.125:14001"
// let WEB_TRX_URL = "http://209.97.167.125:14001"

//DEVELOPMENT
// let API_BASE_URL = "http://209.97.167.125:14001"
// let API_TRX_URL = "http://209.97.167.125:14003"

let API_BASE_URL = "http://api.davestmoney.com:18001"
let API_TRX_URL = "http://api.davestmoney.com:18003"

let SECRET_CODE = "D40ap17Baks"

let navigatorStyle = {
	screenBackgroundColor: 'white',
	statusBarColor: green,
	statusBarTextColorScheme: 'light',
	navBarBackgroundColor: green,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	navBarNoBorder: true,
	navBarTitleTextCentered: true,
  navBarSubTitleTextCentered: true
}

let navigatorStyleGrey = {
	screenBackgroundColor: 'white',
	statusBarTextColorScheme: 'light',
	navBarBackgroundColor: 'lightgrey',
	navBarTextColor: 'black',
	navBarButtonColor: 'black',
	navBarNoBorder: true,
	navBarTitleTextCentered: true,
  navBarSubTitleTextCentered: true
}

let navBarHidden = {
	screenBackgroundColor: 'white',
	statusBarTextColorScheme: 'light',
	navBarHidden: true,
	navBarNoBorder: true
}

export {
	SECRET_CODE,
	navBarHidden,
	navigatorStyle,
	navigatorStyleGrey,
	screenBackgroundColor,
	blue,
	green,
	greenOld,
	grey,
	API_BASE_URL,
	API_TRX_URL,
	yellow
}