import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../store/modules/duckToHandleAction';
import { bindActionCreators } from 'redux';
import CityWeatherList from '../component/CityWeatherList';
import getSearchResult from '../utils/weatherAndPM10APIHandler';
import { Map } from 'immutable';

class SearchCityWeatherContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchAndInsert = this.handleSearchAndInsert.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEnterKeyEvent = this.handleEnterKeyEvent.bind(this);
    this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
  }

  handleInputChange(event) {
    let value = event.target.value;
    this.setState({
      input: value
    }); 
  };

  handleSearchAndInsert() { // 분리 할 수 없을까?
    const userInput = this.state.input;

    let result = '';
    getSearchResult(userInput)
      .then(data => {
        result = data;
        
        if(result === null) {
          console.log('call it!');
          alert('정확한 도시 명을 입력해주세요!');
        }
        else {
          let city = result.city;
          let temperature = result.currentTemperature;
          let skyTypeCode = result.currentSkyTypeCode;
          let rainTypeCode = result.currentRainTypeCode;
          let lightening = result.currentLightening;
          let pm10Value = result.currentPM10;
          
          let item = {
            userInput: userInput,
            cityName: city.first + " " + city.second + " " + city.third,
            cityTemperature: temperature,
            citySkyTypeCode: skyTypeCode,
            cityRainTypeCode: rainTypeCode,
            cityLightening: lightening,
            cityPM10Value: pm10Value
          }
          console.log('item');
          console.log(item);
          this.props.Actions.insert(item);
        }
        this.setState({input: ''});
      });
  }

  handleRemove(id) {
    this.props.Actions.remove(id);
  }

  handleEnterKeyEvent(event) {
    if(event.key === 'Enter') {
      this.handleSearchAndInsert();
    }
  }
  
  handleRefreshButtonClick() {

    if(JSON.stringify(this.props.cityList) === JSON.stringify('')) return ;

    let promisesArr = this.props.cityList.map(async (city) => {
      const nCity = await getSearchResult(city.userInput)
      .then(result => {
        let resultcity = result.city;
        let temperature = result.currentTemperature;
        let skyTypeCode = result.currentSkyTypeCode;
        let rainTypeCode = result.currentRainTypeCode;
        let lightening = result.currentLightening;
        let pm10Value = result.currentPM10;
        
        let item = {
          userInput: city.userInput,
          cityName: resultcity.first + " " + resultcity.second + " " + resultcity.third,
          cityTemperature: temperature,
          citySkyTypeCode: skyTypeCode,
          cityRainTypeCode: rainTypeCode,
          cityLightening: lightening,
          cityPM10Value: pm10Value
        };
        return item;
      })
      return nCity;
    });

    Promise.all(promisesArr)
    .then(arr => {
          console.log('arr');
          console.log(arr);
          this.props.Actions.refresh(arr);
    });
  }

  render() {
    const { 
      handleInputChange, 
      handleSearchAndInsert,
      handleRemove,
      handleEnterKeyEvent,
      handleRefreshButtonClick
    } = this;

    const {
      cityList
    } = this.props;

    return (
      <CityWeatherList 
        inputValue={this.state.input}
        cityList={cityList}
        handleInputChange={handleInputChange}
        handleSearchAndInsert={handleSearchAndInsert} 
        handleRemove={handleRemove}
        handleEnterKeyEvent={handleEnterKeyEvent}
        handleRefreshButtonClick={handleRefreshButtonClick}
      />
    );
  }
}

export default connect(
  (state) => (
    { cityList: state.duckToHandleAction.get('cityList').toJS() }
  ),
  (dispatch) => (
    { Actions: bindActionCreators(Actions, dispatch) }
  )
)(SearchCityWeatherContainer);