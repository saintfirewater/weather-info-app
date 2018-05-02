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
      .then((data) => ( data ))
      .then((data) => {
        result = data;
        
        let city = result.city;
        let temperature = result.currentTemperature;
        let skyTypeCode = result.currentSkyTypeCode;
        let rainTypeCode = result.currentRainTypeCode;
        let lightening = result.currentLightening;
        let pm10Value = result.currentPM10;
        
        let item = {
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
  
  render() {
    const { 
      handleInputChange, 
      handleSearchAndInsert,
      handleRemove,
      handleEnterKeyEvent
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