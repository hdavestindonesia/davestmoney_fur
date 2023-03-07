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
import SwitchSelector from '../components/SwitchSelector';
import DropDownList from '../components/DropDownList';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
const selectorOptions = [
	{
		label: 'Transfer', value: 0
	},
	{
		label: 'History', value: 1
	}
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			switchSelected: 0
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Penarikan'
		// })
	}

	render() {
		let {switchSelected} = this.state
		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<Text style={{fontSize:14, fontWeight:'600'}}>Saldo Merchnat</Text>
					<Text style={{fontSize:20, fontWeight:'600'}}>Rp. 10.000</Text>
				</View>

				<View style={{marginVertical:20, marginHorizontal:40}}>
					<SwitchSelector backgroundColor={'whitesmoke'} borderColor={'grey'} buttonColor={yellow} selectedColor={'white'} bold={true} options={selectorOptions} initial={0} onPress={(value) => this.setState({switchSelected: value})} />
				</View>

				{switchSelected == 0 && 
					<View style={{marginHorizontal:20}}>
						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								placeholder="Jumlah Penarikan" />
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<DropDownList text={'Nama Bank'}/>
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								placeholder="No. Rekening" />
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								placeholder="Pesan (Opsional)" />
						</View>

						<Button text={'Transfer'} />
					</View>
				}

				{switchSelected == 1 && 
					<View style={{marginHorizontal:20}}>
						<View style={{borderWidth:1, borderColor:'lightgrey', paddingVertical:20, paddingHorizontal:10, marginTop:10}}>
							<SpaceBetween>
								<View>
									<Text style={{fontWeight:'700'}}>Trnasfer ke BRI xxxxx</Text>
									<Text style={{fontSize:10}}>12 Sep 2018</Text>
								</View>

								<View>
									<Text style={{fontWeight:'700', color:blue}}>Rp. 10.000</Text>
								</View>
							</SpaceBetween>
						</View>

						<View style={{borderWidth:1, borderColor:'lightgrey', paddingVertical:20, paddingHorizontal:10, marginTop:10}}>
							<SpaceBetween>
								<View>
									<Text style={{fontWeight:'700'}}>Trnasfer ke BRI xxxxx</Text>
									<Text style={{fontSize:10}}>12 Sep 2018</Text>
								</View>

								<View>
									<Text style={{fontWeight:'700', color:blue}}>Rp. 10.000</Text>
								</View>
							</SpaceBetween>
						</View>
					</View>
				}
			</ScrollView>
		);
	}
}