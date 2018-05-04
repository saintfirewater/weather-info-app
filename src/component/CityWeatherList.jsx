import React from 'react';
import './CityWeatherList.css'
import CityWeatherListElement from './CityWeatherListElement';

class CityWeatherList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      cityList, 
      handleInputChange, 
      handleSearchAndInsert, 
      handleRemove,
      inputValue,
      handleEnterKeyEvent,
      handleRefreshButtonClick
    } = this.props;

    return (
      <div id="myDIV" className="header" >
        <button 
          className="refresh_button"
          onClick={handleRefreshButtonClick}
        >
          새로고침
        </button>
        <h2 style={{margin:'5px'}}>Weather</h2>
        <input 
          onKeyPress={handleEnterKeyEvent}
          value={inputValue}
          onChange={handleInputChange} 
          type="text" 
          id="myInput" 
          placeholder="Enter City" 
        />
        <span className="addBtn" onClick={handleSearchAndInsert}>Search</span>
        <ul>
          { cityList.map(item => (
            <CityWeatherListElement
              key={item.id}
              handleRemove={handleRemove}
              cityWeatherInfo={item}/>
          ))}
        </ul>
      </div>
    );
  }
}

export default CityWeatherList;