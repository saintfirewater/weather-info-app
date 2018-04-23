import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import CityWeatherList from './component/CityWeatherList'
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div class="App">
          <CityWeatherList /> 
        </div>
      </Provider>
    );
  }
}

export default App;
