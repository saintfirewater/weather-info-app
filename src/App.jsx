import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import CityWeatherList from './component/CityWeatherList'
import store from './store';
import Constants from './utils/Constants'

import fetch from 'isomorphic-fetch';

class App extends Component {

  constructor(props) {
    super(props);

    //현재 날짜 시간
    let dateStr = new Date().toLocaleDateString();
    let time = new Date();

    let year = dateStr.substr(0, 4);
    let month = dateStr.indexOf(5) !== '1' ? '0' + dateStr.substr(6, 1) : dateStr.substr(5, 2);
    let day = dateStr.substr(9, 2);

    // 초단기실황 ( 매시간 30분에 생성되고 10분마다 동일한 파일로 최신 정보를 업데이트 됨)
    let hour = time.getHours();
    hour = time.getMinutes() <= 40 ? (hour-1).toString() : hour.toString();
    let minute = '00';
    let currentDate = year + month + day;
    let currentTime = hour + minute;
    console.log(currentTime);
    
    const { SERVICE_KEY, 
            URL, 
            PAGE_NUMBER, 
            NUMBER_OF_ROWS, 
            TYPE, 
            TEST_X, 
            TEST_Y 
          } = Constants;
      
    const serviceKey = SERVICE_KEY;
    const baseDate = currentDate;
    const baseTime = currentTime;
    const coordX = TEST_X;
    const coordY = TEST_Y;
    const pageNo = PAGE_NUMBER;
    const numOfRows = NUMBER_OF_ROWS;
    const type = TYPE;

    const url = URL 
              + 'ServiceKey=' + serviceKey 
              + '&base_date=' + baseDate 
              + '&base_time=' + baseTime 
              + '&nx=' + coordX
              + '&ny=' + coordY
              + '&pageNo=' + pageNo 
              + '&numOfRows=10' + numOfRows
              + '&_type=' + type
              ;
   
    let currentTemperature = '';          
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      // 2) 그다음 
      currentTemperature = data.response.body.items.item[5].obsrValue;
      console.log(currentTemperature);
      return currentTemperature;
    });

    // 1) 비동기라 여기가 먼저 불림 console.log(currentTemperature);
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
