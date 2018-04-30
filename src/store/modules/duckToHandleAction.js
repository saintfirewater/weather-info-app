import { List, Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
// import { INSERT, REMOVE } from './actions';

const INSERT = 'INSERT';
const REMOVE = 'REMOVE';
const CHANGE_WEATHER = 'CHANGE_WEATHER';

export const insert = createAction(INSERT, result => result);
export const remove = createAction(REMOVE, id => id);
export const changeWeather = createAction(CHANGE_WEATHER);


let id = 0;
let initialState = Map({
  cityList: List()
})

export default handleActions({
  [INSERT]: (state, action) => { 
    const newItem = Map({
      id: id++,
      cityName: action.payload.cityName, 
      cityTemperature: action.payload.cityTemperature,
      citySkyTypeCode: action.payload.citySkyTypeCode,
      cityRainTypeCode: action.payload.cityRainTypeCode,
      cityLightening: action.payload.cityLightening
    });
    
    return state.update('cityList', cityList => cityList.push(newItem));
  },
  [REMOVE]: (state, action) => {
    const id = action.payload;
    console.log('id');
    console.log(id);
    const index = state.get('cityList').findIndex(item => item.get('id') === id);

    return state.deleteIn(['cityList', index]);
  }
}, initialState);

