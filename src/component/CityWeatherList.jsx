import React from 'react';
import './CityWeatherList.css'
import CityWeatherListElement from './CityWeatherListElement';
// import { Map } from 'immutable';

class CityWeatherList extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    // const testList = ['Hit the gym', 'Pay bills', 'Meet George', 'Buy eggs'];
    const {
      cityList, 
      handleInputChange, 
      handleSearchAndInsert, 
      handleRemove,
      inputValue
    } = this.props;

    return (
      <div id="myDIV" className="header">
        <h2 style={{margin:'5px'}}>Weather</h2>
        <input 
          
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