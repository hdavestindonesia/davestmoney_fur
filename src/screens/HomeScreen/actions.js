import { View, Text, Alert } from 'react-native';

export function homeFetchDataSuccess(data_home: Object) {
  return {
    type: "HOME_FETCH_DATA_SUCCESS",
    data_home
  };
}


export function homeFetchData(body_home: String) {
  return function(dispatch) {
      // var data_home = body_home;
      // Alert.alert("COBA PRINT",body_home);
      return dispatch(homeFetchDataSuccess(data_home));








      // fetch("", {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(body_home)
      // }).then((response) => response.json())
      // .then((data_home) => {
      //   return dispatch(homeFetchDataSuccess(data_home));
      // }).catch((error) => {
      //   return dispatch(homeFetchData());
      //   throw(error);
      // });
  };
}