import cityCoordList from './cityCoord';
import firstCityList from './firstCities';
import Constants from './Constants';

function getCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return (year + '' + month + '' + day);
}

function getCurrentTime() {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();

  hour = minute <= 40 ? (hour-1) : hour;
  if(hour < 10) {
    hour = '0' + hour;
  }

  return (hour + '00');
}

function findCity(searchInput) {
  // const testUserInput3 = '송도';
  
  let userInput = searchInput;
  let isFirst = false;
  let firstCityName = '';
  let city = '';
  
  for(let i=0 ; i<firstCityList.length ; i++) {
    if(firstCityList[i].includes(userInput)) {
      isFirst = true;
      firstCityName = firstCityList[i];
      break;
    }
  }

  // let first = isFirst ? firstCityName : '';
  let second = '';
  let third = '';

  if(isFirst) {
    city = cityCoordList.find((city) => {
      return (city.first === firstCityName);
    })
  }
  if(!isFirst) {
    for(let i=0 ; i<cityCoordList.length; i++) {
      city = cityCoordList[i];

      second = String(city.second); 
      third = String(city.third);
      
      if(second.includes(userInput) || third.includes(userInput)) {
        break;
      }
    }
  }
  return city;
}

function generateURL(currentDate, currentTime, x, y) {
  
  const { 
    SERVICE_KEY, 
    URL, 
    PAGE_NUMBER, 
    NUMBER_OF_ROWS, 
    TYPE
        } = Constants;
    
  const serviceKey = SERVICE_KEY;
  const pageNo = PAGE_NUMBER;
  const numOfRows = NUMBER_OF_ROWS;
  const type = TYPE;

  const baseDate = currentDate;
  const baseTime = currentTime;

  const cityCoordX = x;
  const cityCoordY = y;

  const url = URL 
            + 'ServiceKey=' + serviceKey 
            + '&base_date=' + baseDate 
            + '&base_time=' + baseTime 
            + '&nx=' + cityCoordX
            + '&ny=' + cityCoordY
            + '&pageNo=' + pageNo 
            + '&numOfRows=' + numOfRows
            + '&_type=' + type
            ;

  return url;            
}

async function apiCallToGetWeatherInfo(searchInput) {

  const {
    LGT,
    PTY,
    SKY,
    T1H
        } = Constants;

  console.log(searchInput);
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const city = findCity(searchInput);
  const cityCoordX = city.X;
  const cityCoordY = city.Y;

  const url = generateURL(currentDate, currentTime, cityCoordX, cityCoordY);
  
  console.log(url);
  
  let currentLightening = '';
  let currentTemperature = ''; 
  let currentRainTypeCode = '';
  let currentSkyTypeCode = '';

  await fetch(url)
  .then(res => res.json())
  .then((data) => {
    currentLightening = data.response.body.items.item[LGT].obsrValue;
    currentTemperature = data.response.body.items.item[T1H].obsrValue;
    currentRainTypeCode = data.response.body.items.item[PTY].obsrValue;
    currentSkyTypeCode = data.response.body.items.item[SKY].obsrValue;
    console.log(currentLightening);
    console.log(currentRainTypeCode);
    console.log(currentSkyTypeCode);
    console.log(currentTemperature);
  });
  
  return {
    currentLightening: currentLightening,
    currentTemperature: currentTemperature,
    currentRainTypeCode: currentRainTypeCode,
    currentSkyTypeCode: currentSkyTypeCode,
    city: city
  };
}

function getSearchResult(searchInput) {
  let result = apiCallToGetWeatherInfo(searchInput);
  return result;
}

export default getSearchResult;

