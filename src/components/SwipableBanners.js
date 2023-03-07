import React from 'react';
import {Image, TouchableOpacity, Dimensions, View} from 'react-native';
import Dot from '../components/Dot';
import ActiveDot from '../components/ActiveDot';
import {ASSETS_URL} from '../libs/Constants';
import Swiper from 'react-native-swiper';
let {width} = Dimensions.get('window')

export default ({height=width/1.5, Banners, onPress, isVirtual=false}) => (
	<View style={{height}}>
		<Swiper 
	  	autoplayTimeout={5}
  		dot={<Dot />}
  	  activeDot={<ActiveDot />} 
  	  paginationStyle={{justifyContent:'flex-end', bottom:10}}
	    height={height} 
	    autoplay>
	    {Banners.map((banner,i) => (
	    	<TouchableOpacity onPress={()=> onPress(banner)} key={i} activeOpacity={1} key={i}>
	    		{isVirtual ? (
	    			<Image
		    	    defaultSource={require('../assets/pre01.png')}
		    	    style={{width, backgroundColor:'#f1eff0', height, resizeMode:'cover'}}
		    	    source={{uri: banner.ImageUrl}} />
	    		) : (
	    			<Image
		    	    defaultSource={require('../assets/pre01.png')}
		    	    style={{width, backgroundColor:'#f1eff0', height, resizeMode:'cover'}}
		    	    source={{uri: `${ASSETS_URL}${banner.AssetImgUrl}`}} />
	    		)}
	    	</TouchableOpacity>
	    ))}
	  </Swiper>
	</View>
)