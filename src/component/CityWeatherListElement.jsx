import React from 'react';
import './CityWeatherListElement.css'

function CityWeatherListElement(props) {
  console.log('props');
  console.log(props);

  const{ handleRemove } = props;

  const {
    id,
    cityName,
    cityTemperature
  } = props.cityWeatherInfo;

  return (  ////
    <li 
      onDoubleClick={() => handleRemove(id)} 
      className="city-weater-element"
    >
      {cityName + ' ' + cityTemperature + '°C'}
    </li>
  );
}

export default CityWeatherListElement;