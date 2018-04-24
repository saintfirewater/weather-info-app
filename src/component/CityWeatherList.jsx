import React from 'react';
import './CityWeatherList.css'
import CityWeatherListElement from './CityWeatherListElement';

function CityWeatherList() {
  const testList = ['Hit the gym', 'Pay bills', 'Meet George', 'Buy eggs'];
  return (
    <div id="myDIV" className="header">
      <h2 style={{margin:'5px'}}>Weather</h2>
      <input type="text" id="myInput" placeholder="Enter City" />
      <span className="addBtn">Search</span>
      <ul>
        { testList.map(item => (
          <CityWeatherListElement item={item}/>
        ))}
      </ul>
    </div>
  );
}

export default CityWeatherList;