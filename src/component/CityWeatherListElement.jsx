import React from 'react';
import './CityWeatherListElement.css'

function CityWeatherListElement(props) {
  return ( //props.city, props.temperature
    <li className="city-weater-element">{props.item}</li>
  );
}

export default CityWeatherListElement;