import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { INSERT, REMOVE } from './actions';

let id = 0;
let initialState = Map({
  cityList: List()
})

export default handleActions({
  [INSERT]: (state, action) => {
    const newItem = Map({
      id: id++,
      cityName: '', ///////
      cityTemperature: '' ///////
    });
    return state.update('cityList', cityList => cityList.push(newItem));
  },
  [REMOVE]: (state, action) => {
    const id = action.payload;
    const index = state.get('cityList').findIndex(item => item.get('id') === id);

    return state.deleteIn(['cityList', index]);
  }
}, initialState);

