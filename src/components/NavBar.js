import React from 'react';
import {Image, TouchableOpacity, Text, View, Platform} from 'react-native';
import Bold from '../components/Bold';
import CartButton from '../components/CartButton';
import {blue, yellow} from '../libs/Constants';
import kAlert from '../libs/kAlert';

const IOS = Platform.OS === 'ios'

export default ({ShoppingCartCount, flex=2, children, title, navigator, style={}}) =>  {

	let onPress = () => {
		navigator.popToRoot()
		navigator.showModal({screen:'KeranjangBelanja',animated: true,animationType: 'slide-up'})
	}

	return (
		<View style={style}>
			<View style={{height:64, paddingTop:(IOS ? 20 : 10), alignItems:'center', justifyContent:'space-between', flexDirection:'row', backgroundColor:yellow, paddingHorizontal: (IOS ? 10 : 0)}}>
				<TouchableOpacity onPress={()=> navigator.pop()} style={{flex, justifyContent:'center', alignItems:'center'}}>
					<Image style={{width:24, height:24, tintColor:blue}} source={require('../assets/back_arrow.png')} />
				</TouchableOpacity>
				<View style={{flex:10 - (2*flex), justifyContent:'center', alignItems:'center'}}>
					<Text numberOfLines={1} style={{color:blue, fontWeight:'700', fontSize:16}}>{title}</Text>
				</View>
				<CartButton ShoppingCartCount={ShoppingCartCount} onPress={()=> onPress()} flex={flex} />
			</View>
			{children}
		</View>
	)
}