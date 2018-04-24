import React from 'react';
import './CityWeatherListElement.css'

function CityWeatherListElement(props) {
  return ( //props.city, props.temperature
    <li className="city-weater-element">{props.item}</li>
    // <div> 
    //   <ul id="myUL">
    //     <li>Hit the gym</li>
    //     <li>Pay bills</li>
    //     <li>Meet George</li>
    //     <li>Buy eggs</li>
    //     <li>Read a book</li>
    //     <li>Organize office</li>
    //   </ul>
    // </div>
  );
}

export default CityWeatherListElement;