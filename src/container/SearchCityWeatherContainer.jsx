import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../store/modules/duckToHandleAction';
import { bindActionCreators } from 'redux';
import CityWeatherList from '../component/CityWeatherList';
import getSearchResult from '../utils/module';
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
  }

  handleInputChange(event) {
    let value = event.target.value;
    this.setState({
      input: value
    }); // 서울
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
        let item = {
          cityName: city.first + " " + city.second + " " + city.third,
          cityTemperature : temperature
        }
        
        this.props.Actions.insert(item);

        this.setState({input: ''});
      });
  }

  handleRemove(id) {
    this.props.Actions.remove(id);
  }
  
  render() {
    const { 
      handleInputChange, 
      handleSearchAndInsert,
      handleRemove
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