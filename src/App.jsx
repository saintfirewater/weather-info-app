import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import CityWeatherList from './component/CityWeatherList';
import store from './store';
import getSearchResult from './utils/module';


class App extends Component {

  constructor(props) {
    super(props);
    
    const testUserInput1 = '서울';
    const testUserInput2 = '동작';
    const testUserInput3 = '송도';

    let result = '';
    getSearchResult(testUserInput3).then((data) => {
      return data;
    }).then((data) => {
      result = data;
      console.log('in');
      console.log(result);
    });
    
    console.log('result');
    console.log(result);
  }
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <CityWeatherList /> 
        </div>
      </Provider>
    );
  }
}

export default App;
