const initialState = {
  data_loginpendana: [],
  data_preregister: [],
  data_verifikasiemail: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
  	

    case "LOGINPENDANA_FETCH_DATA_SUCCESS":
      return { ...state, data_loginpendana: action.data_loginpendana };

    case "PREREGISTER_FETCH_DATA_SUCCESS":
      return { ...state, data_preregister: action.data_preregister };

    case "VERIFIKASIEMAIL_FETCH_DATA_SUCCESS":
      return { ...state, data_verifikasiemail: action.data_verifikasiemail };

    default:
      return state;
  }
}