import {Navigation} from 'react-native-navigation';

export default (text, showClose=false, autoDismissTimerSec=3) =>  {
	Navigation.showInAppNotification({
	  screen:'Notification',
	  autoDismissTimerSec,
	  passProps: {
	    text,
	    showClose
	  }
	})
}