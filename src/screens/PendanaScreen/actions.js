import { View, Text, Alert } from 'react-native';
import Globals from '../../boot/api/globals';

export function loginpendanaFetchDataSuccess(data_loginpendana: Object) {
  return {
    type: "LOGINPENDANA_FETCH_DATA_SUCCESS",
    data_loginpendana
  };
}


export function loginpendanaFetchData(body_loginpendana: Object) {
  return function(dispatch) {
         
          fetch(Globals.URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body_loginpendana)
                
          }).then((response) => response.json())
          .then((responseJson) => {
            return dispatch(loginpendanaFetchDataSuccess(responseJson));
          }).catch((error) => {
            console.error(error);
            Alert.alert("Scan Face Failed 2",JSON.stringify(error),JSON.stringify(body_loginpendana))
          })

  };
}













export function preregisterFetchDataSuccess(data_preregister: Object) {
  return {
    type: "PREREGISTER_FETCH_DATA_SUCCESS",
    data_preregister
  };
}


export function preregisterFetchData(body_preregister: Object) {
  return function(dispatch) {
         
          fetch(Globals.URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body_preregister)
                
          }).then((response) => response.json())
          .then((responseJson) => {
            // Alert.alert("preregister",JSON.stringify(responseJson))
            return dispatch(preregisterFetchDataSuccess(responseJson));
          }).catch((error) => {
            console.error(error);
            Alert.alert("Scan Face Failed 2",JSON.stringify(error),JSON.stringify(body_preregister))
          })

  };
}




















export function verifikasiemailFetchDataSuccess(data_verifikasiemail: Object) {
  return {
    type: "VERIFIKASIEMAIL_FETCH_DATA_SUCCESS",
    data_verifikasiemail
  };
}


export function verifikasiemailFetchData(body_verifikasiemail: Object) {
  return function(dispatch) {
         
          fetch(Globals.URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body_verifikasiemail)
                
          }).then((response) => response.json())
          .then((responseJson) => {
            // Alert.alert("verifikasiemail",JSON.stringify(responseJson))
            return dispatch(verifikasiemailFetchDataSuccess(responseJson));
          }).catch((error) => {
            console.error(error);
            Alert.alert("Scan Face Failed 2",JSON.stringify(error),JSON.stringify(body_verifikasiemail))
          })

  };
}