import { List, Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import getSearchResult from '../../utils/weatherAndPM10APIHandler';

const INSERT = 'INSERT';
const REMOVE = 'REMOVE';
const REFRESH = 'REFRESH';

export const insert = createAction(INSERT, result => result);
export const remove = createAction(REMOVE, id => id);
export const refresh = createAction(REFRESH, arr => arr);

let id = 0;
let initialState = Map({
  cityList: List()
})

export default handleActions({
  [INSERT]: (state, action) => { 
    const newItem = Map({
      id: id++,
      userInput: action.payload.userInput,
      cityName: action.payload.cityName, 
      cityTemperature: action.payload.cityTemperature,
      citySkyTypeCode: action.payload.citySkyTypeCode,
      cityRainTypeCode: action.payload.cityRainTypeCode,
      cityLightening: action.payload.cityLightening,
      cityPM10Value: action.payload.cityPM10Value
    });
    
    return state.update('cityList', cityList => cityList.push(newItem));
  },
  [REMOVE]: (state, action) => {
    const id = action.payload;
    console.log('id');
    console.log(id);
    const index = state.get('cityList').findIndex(item => item.get('id') === id);

    return state.deleteIn(['cityList', index]);
  },
  [REFRESH]: (state, action) => {
    let arr = List(action.payload);

    console.log('refresh');
    console.log(arr);

    return state.set('cityList', arr);
  }
}, initialState);

