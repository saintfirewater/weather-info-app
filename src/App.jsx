import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import CityWeatherList from './component/CityWeatherList';
import SearchCityWeatherContainer from './container/SearchCityWeatherContainer';
import store from './store'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <SearchCityWeatherContainer /> 
        </div>
      </Provider>
    );
  }
}

export default App;
