import React from 'react';
import sunny from '../resource/image/맑음.svg';
import muchCloud from '../resource/image/구름많음.svg';
import littleCloud from '../resource/image/구름조금.svg';
import lightening from '../resource/image/낙뢰.svg';
import snow from '../resource/image/눈.svg'
import rain from '../resource/image/비.svg';
import cloudy from '../resource/image/흐림.svg';
import sleet from '../resource/image/진눈깨비.svg'
// import  weatherInfoIcon from '../resource/image';
import './CityWeatherListElement.css'

class CityWeatherListElement extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { handleRemove } = this.props;
    
    const {
      id,
      cityName,
      cityTemperature,
      citySkyTypeCode,
      cityRainTypeCode,
      cityLightening,
      cityPM10Value
    } = this.props.cityWeatherInfo;
  
    // 하늘 형태 이미지
    // let imgSrc = '../resource/image/';
    let imgSrc = '';
    
    if(cityLightening) {
      imgSrc = lightening;
    }
    else if(cityRainTypeCode === 1) {
      imgSrc = rain;
    }
    else if(cityRainTypeCode === 2) {
      imgSrc = sleet;
    }
    else if(cityRainTypeCode === 3) {
      imgSrc = snow;
    }
    else if(citySkyTypeCode === 1) {
      imgSrc = sunny;
    }
    else if(citySkyTypeCode === 2) {
      imgSrc = littleCloud;
    }
    else if(citySkyTypeCode === 3) {
      imgSrc = muchCloud;
    }
    else if(citySkyTypeCode === 4) {
      imgSrc = cloudy;
    }
    else {
      //something prob
    }

    // pm10 value categorize
    let pm10Class = '';
    /* - 미세먼지
          0~30   좋음
          31~80  보통
          81~150 나쁨
          151~   매우나쁨 */
    if(cityPM10Value < 31) {
      pm10Class = '좋음';
    }
    else if(cityPM10Value > 30 && cityPM10Value < 81) {
      pm10Class = '보통';
    }
    else if(cityPM10Value > 80 && cityPM10Value <151) {
      pm10Class = '나쁨';
    }
    else if(cityPM10Value > 150) {
      pm10Class = '매우나쁨';
    }
    
    return (
      <li 
        className="city-weater-element"
      >
        {cityName + ' ' + cityTemperature + '°C' + ' ' + '미세먼지' + ' ' + pm10Class}
        <img 
          src={imgSrc}
          className='weather-icon'
          alt='날씨상태'
        />
        <button 
          onClick={() => handleRemove(id)}
          className="li-button">X</button>
      </li>
    );
  }
}

export default CityWeatherListElement;