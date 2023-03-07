import React, { Component } from 'react';
import {Text, Dimensions, Image, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import {blue, yellow} from '../libs/Constants';
import Bold from '../components/Bold';

export default class extends Component {
	state = {
		open: this.props.isOpen != null ? this.props.isOpen : true
	}

	componentDidUpdate(prevProps, prevState) {
		let {open} = this.state
		if (prevProps.isOpen !== this.props.isOpen) {
			this.setState({open:this.props.isOpen})
		}
	}

	onPress = () => this.setState({open:!this.state.open})

	render() {
		let {open} = this.state
		let {text, children, style={}, backgroundColor=yellow, color='black'} = this.props

		return (
			<View style={style}>
				<TouchableOpacity onPress={this.onPress} style={{marginTop:10, backgroundColor: backgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
					<Bold style={{color:color}}>{text}</Bold>
					<Bold style={{color:color}}>{open ? `▲` : `▼`}</Bold>
				</TouchableOpacity>
				{open ? children : null}
			</View>
		);
	}
}