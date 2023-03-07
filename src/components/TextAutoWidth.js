import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class extends Component {
	state = {
		width: 9
	}

	render() {
		let {text, backgroundColor} = this.props
		let {width} = this.state
		console.warn(width)
		return (
			<Text 
				onLayout={(e)=> this.setState({width:e.nativeEvent.layout.width + 10})}
				style={[{backgroundColor, width}, styles.text]}>
				{text}
			</Text>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		padding: 5,
		color: 'white',
		fontSize: 12,
		fontWeight: '600'
	},
});