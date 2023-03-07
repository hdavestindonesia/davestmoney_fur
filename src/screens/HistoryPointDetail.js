import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import Rupiah from '../libs/Rupiah';
import moment from 'moment';
import 'moment/locale/id';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	render() {
		let {data} = this.props.navigation.state.params

		if(!data){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:80}}>
					<Image
						style={{height:150, width:null, resizeMode:'contain'}}
						source={require('../assets/images/SUKSES.png')}/>
				</View>

        <View style={{marginTop:30}}>
          <Text style={{fontWeight:'700', color:blue, fontSize:16, textAlign:'center'}}>{data.desc}</Text>
        </View>

        <View style={{padding:20}}>
          <Text style={{color:blue}}>Waktu</Text>
          <Text>{moment(data.waktu).locale('id').format('DD MMM YYYY HH:mm:ss')}</Text>
        </View>

        <View style={{padding:20}}>
          <Text style={{color:blue}}>Detail</Text>
          <Text>{data.desc_detail}</Text>
        </View>

        <View style={{padding:20}}>
          <Text style={{color:blue}}>Point</Text>
          <Text>{data.bonus}</Text>
        </View>

        <View style={{marginTop:50, marginBottom:20}}>
          <Button onPress={() => 
          	this.props.navigation.dispatch(
	            StackActions.pop()
	          )
        	} text={'Tutup'} />
        </View>
				
			</ScrollView>
		);
	}
}