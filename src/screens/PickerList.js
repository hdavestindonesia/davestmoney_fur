import React, { Component } from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import SpaceBetween from '../components/SpaceBetween';
import Bold from '../components/Bold';
import {navigatorStyle} from '../libs/Constants';
import getItem from '../libs/getItem';
import moment from 'moment';
import 'moment/locale/id';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	onPress = (data, i) => {
		this.props.onChange(data, i)
		this.props.navigation.dispatch(
            StackActions.pop()
          )
	}

	renderItem = (data, i) => {
		return (
			<TouchableOpacity key={i} onPress={() => this.onPress(data, i)} style={{padding:10, borderBottomWidth:1, borderBottomColor:'whitesmoke'}}>
				<Text style={{fontSize:16, color: 'black'}}>{data.label}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		let {options} = this.props.navigation.state.params

		return (
			<ScrollView style={{flex: 1, padding:10}}>
				{options && options.length > 0 ? (
						
					<View>
						{options.map(this.renderItem)}
					</View>
						
					
				) : null}
			</ScrollView>
		);
	}
}
