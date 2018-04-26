import cityCoordList from './cityCoord';
import firstCityList from './firstCities';
import Constants from './Constants';

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

function getCurrentDate() {
  let date = new Date().toLocaleDateString();
  let year = date.substr(0, 4);
  let month = date.indexOf(5) !== '1' ? '0' + date.substr(6, 1) : date.substr(5, 2);;
  let day = date.substr(9, 2);

  return (year + month + day); /////
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

async function getTemperatureAndCity(searchInput) {

  console.log(searchInput);
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const city = findCity(searchInput);
  const cityCoordX = city.X;
  const cityCoordY = city.Y;

  const url = generateURL(currentDate, currentTime, cityCoordX, cityCoordY);
  
  console.log(url);
  let currentTemperature = await fetch(url) // 0)
                                  .then(res => res.json())
                                  .then((data) => {
                                    // 2) 그다음 
                                    currentTemperature = data.response.body.items.item[5].obsrValue;
                                    console.log(currentTemperature);
                                    return currentTemperature;
                                  });

  // 1) 비동기라 여기가 먼저 불림 console.log(currentTemperature);
  
  return {
    currentTemperature : currentTemperature,
    city: city
  };
}

////////////
function getSearchResult(searchInput) {
  let result = getTemperatureAndCity(searchInput);
  return result;
}

export default getSearchResult;

