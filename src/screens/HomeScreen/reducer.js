const initialState = {
  data_home: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
  	

    case "HOME_FETCH_DATA_SUCCESS":
      return { ...state, data_home: action.data_home };

    default:
      return state;
  }
}