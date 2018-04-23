import React from 'react';
import './CityWeatherList.css'
import CityWeatherListElement from './CityWeatherListElement';

function CityWeatherList() {
  return (
    <div id="myDIV" className="header">
      <h2 style={{margin:'5px'}}>Weather</h2>
      <input type="text" id="myInput" placeholder="Enter City" />
      <span className="addBtn">Add</span>
      <CityWeatherListElement />
    </div>
  );
}

export default CityWeatherList;