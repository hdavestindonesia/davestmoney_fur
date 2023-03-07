import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import BottomBar from '../components/BottomBar';
import Rupiah from '../libs/Rupiah';
import {orderBy} from 'lodash'

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			notifications: null
		}
	}

	componentDidMount() {
		getItem('NOTIFICATIONS', (notifications) => {
			if(notifications && notifications.length > 0){
				let notifOrder = orderBy(notifications, ['dateTime'], ['desc'])
  			this.setState({notifications: notifOrder})
			}
  	})	
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'NOTIFICATION'
		// })
	}

	renderNotif = () => {
		let result = null;
		if(this.state.notifications){
			var tgl = [];
			
			result = this.state.notifications.map((val, idx) => {
				let head = <View />;
				
				var tglNow = val.dateTime.split(' ')[0];
				var jamNow = val.dateTime.split(' ')[1];
				
				jamNow = jamNow.split(':')[0] + ':' + jamNow.split(':')[1];
				
				if(tgl.indexOf(tglNow) < 0){
					tgl.push(tglNow);
					
					head = (
						<View style={{flex:1, backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
							<Text style={{fontSize:16, fontWeight:'600'}}>{moment(tglNow).locale('id').format('MMMM YYYY')}</Text>
						</View>
					);
				}
				
				return (
					<View key={idx} style={{flex:1}}>
						{head}
						
							<View style={{flex:1, borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:20}}>
								<View style={{flexDirection:'row', alignItems:'center'}}>
									<View style={{flex:8}}>
										<Text style={{fontWeight:'700'}}>{val.payload.body}</Text>
									</View>

									<View style={{flex:2}}>
										<Text style={{fontSize:10, textAlign:'right'}}>{moment(val.dateTime).locale('id').format('DD MMM YYYY')}</Text>
										<Text style={{fontSize:10, textAlign:'right'}}>{moment(val.dateTime).locale('id').format('hh:mm:ss')}</Text>
									</View>
								</View>
							</View>
						
					</View>
				);
			});
			
			
		}
		
		return result;
	}

	render() {
		let {notifications} = this.state

		if(!notifications){
			return (
				<View style={{flex:1, padding:10}}>
					<Text style={{textAlign:'center'}}>Belum Ada Notifikasi</Text>
				</View>
			)
		}

		return (
			<ScrollView style={{flex:1, backgroundColor:'white'}}>		

				{this.renderNotif()}
				
			</ScrollView>
		);
	}
}