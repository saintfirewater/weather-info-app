import React from 'react';
import './CityWeatherListElement.css'

function CityWeatherListElement(props) {

  const{ handleRemove } = props;

  const {
    id,
    cityName,
    cityTemperature
  } = props.cityWeatherInfo;

  return (
    <li 
      className="city-weater-element"
    >
      {cityName + ' ' + cityTemperature + '°C'}
      <button 
        onClick={() => handleRemove(id)}
        className="li-button">X</button>
    </li>
  );
}

export default CityWeatherListElement;