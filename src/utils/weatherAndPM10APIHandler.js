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

function mapFirstToSidoName(first) {
  
  const frontTwoWordCities = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '제주특별자치도'
  ];
  const midTwoWordCities = [
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도'
  ];

  const ieodo = '이어도';

  let sidoName = '';

  if(first === ieodo) {
    sidoName = ieodo;
  }
  else if(frontTwoWordCities.includes(first)) {
    sidoName = first.substr(0, 2);
  }
  else {
    sidoName = first.charAt(0) + first.charAt(2);
  }
  return sidoName;
}

function generatePM10URL(sidoName) {
  const {
    PM10_URL,
    SERVICE_KEY,
    SEARCH_CONDITION,
    PAGE_NUMBER, 
    NUMBER_OF_ROWS,
    TYPE
  } = Constants;

  const url = PM10_URL
            + 'sidoName=' + sidoName
            + '&searchCondition=' + SEARCH_CONDITION
            + '&pageNo=' + PAGE_NUMBER
            + '&numOfRows=' + NUMBER_OF_ROWS
            + '&ServiceKey=' + SERVICE_KEY
            + '&_returnType=' + TYPE
            ;
  
  return url;
}

function generateWeatherURL(currentDate, currentTime, x, y) {
  
  const { 
    SERVICE_KEY, 
    WEATHER_URL, 
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

  const url = WEATHER_URL 
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
  
  console.log('searchInput');
  console.log(searchInput);
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const city = findCity(searchInput);
  const cityCoordX = city.X;
  const cityCoordY = city.Y;
  const sidoName = mapFirstToSidoName(city.first);

  const weatherUrl = generateWeatherURL(currentDate, currentTime, cityCoordX, cityCoordY);
  const pm10Url = generatePM10URL(sidoName);
  
  console.log('url s');
  console.log(weatherUrl);
  console.log(pm10Url);
  
  let currentLightening = '';
  let currentTemperature = ''; 
  let currentRainTypeCode = '';
  let currentSkyTypeCode = '';
  let currentPM10 = '';

  let apiCallResults = [];
  
  await Promise.all([fetch(weatherUrl), fetch(pm10Url)])
        .then(responses => responses.map(res => res.json()))
        .then(([weatherResult, pm10Result]) => {
          apiCallResults.push(weatherResult);
          apiCallResults.push(pm10Result);
        })

  await apiCallResults[0].then(weatherResult => {
    console.log('weatherResult');
    console.log(weatherResult);
    currentLightening = weatherResult.response.body.items.item[LGT].obsrValue;
    currentTemperature = weatherResult.response.body.items.item[T1H].obsrValue;
    currentRainTypeCode = weatherResult.response.body.items.item[PTY].obsrValue;
    currentSkyTypeCode = weatherResult.response.body.items.item[SKY].obsrValue;
  })
  await apiCallResults[1].then(pm10Result => {
    console.log('pm10Result');
    console.log(pm10Result);

    let airInfoOfTheCity = '';
    if(city.third || city.second) {
      airInfoOfTheCity = pm10Result.list.filter(item => city.second.includes(item.cityName))[0];
    }
    else {
      airInfoOfTheCity = pm10Result.list[0];
    }

    currentPM10 = airInfoOfTheCity.pm10Value;
    console.log('currentPM10');
    console.log(currentPM10);
  })

  
  return {
    currentLightening: currentLightening,
    currentTemperature: currentTemperature,
    currentRainTypeCode: currentRainTypeCode,
    currentSkyTypeCode: currentSkyTypeCode,
    currentPM10: currentPM10,
    city: city
  };
}

function getSearchResult(searchInput) {
  let result = apiCallToGetWeatherInfo(searchInput);
  return result;
}

export default getSearchResult;

