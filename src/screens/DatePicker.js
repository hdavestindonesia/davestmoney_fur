import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Image,
  //DatePickerIOS
} from 'react-native';
import Separator from '../components/Separator'
import {omit} from 'lodash';
import {BlurView} from 'react-native-blur';
import moment from 'moment';
import 'moment/locale/id';

const width = Dimensions.get('window').width * 0.8
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static defaultProps = {
		date: new Date(),
	  timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
	}

	state = {
		viewRef: null,
		date: this.props.date ? this.props.date : moment().toDate(),
		minDate: this.props.minDate ? this.props.minDate : moment().add(-10, 'years').toDate(),
		maxDate: this.props.maxDate ? this.props.maxDate : moment().add(10, 'years').toDate(),
		timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
	}

	componentDidMount() {
		let {date} = this.state
		if(Platform.OS === 'android') this.showPicker(this, 'spinner', {date: date, mode: 'spinner'})
	}

	onSave = () => {
		let {navigator, onValueChange} = this.props.navigation.state.params
		let {date} = this.state
		onValueChange(date)
		navigator.dismissLightBox()
	}

	//DatePickerAndroid show function
	async showPicker(){
		let {navigator} = this.props.navigation.state.params
		let {date, minDate, maxDate} = this.state
    try {
    	const DatePickerAndroid = require('react-native').DatePickerAndroid
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.date,
        minDate: minDate,
        maxDate: maxDate,
        mode: 'spinner'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({
            date: new Date(year,month,day)/*day+"/"+month+"/"+year*/
        });
        this.onSave()
      }
      else{
      	navigator.dismissLightBox()
      }
		} catch ({code, message}) {
			//alert('Cannot open date picker: '+message);
		}
	}

	onDateChange = (date) => this.setState({date})
	
	render() {
		let {navigator, title} = this.props.navigation.state.params
		let {date, minDate, maxDate} = this.state
		//blurRadius={10} overlayColor={'rgba(255,255,255, .10'}
		if(Platform.OS === 'ios'){
			const DatePickerIOS = require('react-native').DatePickerIOS
			return (
				<BlurView blurType='xlight' style={styles.container}>
					<Text numberOfLines={1} style={styles.welcome}>
					  {title}
					</Text>
					<Separator />
				  <DatePickerIOS 
						date={date}
						minimumDate={minDate}
						maximumDate={maxDate}
						mode="date"
						timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
						onDateChange={this.onDateChange}/>
				  <Separator />
				  <Button title='Simpan' onPress={this.onSave} />
				</BlurView>
			)
		}
		return (
			null
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: width,
		paddingBottom: 8,
		borderRadius: 10
	},
	welcome: {
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
		marginTop: 10
	}
});