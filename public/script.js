const SEARCH_BOX = document.querySelector('input');

const CITY = document.getElementById('city');

const TEMPERATURE = document.getElementById("temperature-today");

const WEATHER = document.getElementById("weather");

const TEMP_MIN_MAX = document.getElementById("min-max-temp");

const HUMIDITY = document.getElementById("humidity");

const WIND = document.getElementById("wind");

const DATE_TODAY = document.getElementById('date-today');

const TIME_TODAY = document.getElementById('time-today');

function isRaining (weatherID){
  return ((200 <= weatherID && weatherID <= 299) || (300 <= weatherID && weatherID <= 399) || (500 <= weatherID && weatherID <= 599));
}

function isSnowing (weatherID){
  return (600 <= weatherID && weatherID <= 699);
}

function getDawnImage(weatherID){
  if (isRaining(weatherID)){
      return "url(../assets/rain-dawn-night.jpg)";

  }else if (isSnowing(weatherID)){
      return "url(../assets/snow-dawn-night.jpg)";

  }else{
      return "url(../assets/dawn.jpg)";
  }
}

function getMorningImage(weatherID){
  if (isRaining(weatherID)){
      return "url(../assets/rain-morning-afternoon.jpg)";

  }else if (isSnowing(weatherID)){
      return "url(../assets/snow-morning-afternoon.jpg)";

  }else{
      return "url(../assets/morning-afternoon.jpg)";
  }
}

function getLateAfternoonImage(weatherID){
  if (isRaining(weatherID)){
      return "url(../assets/rain-morning-afternoon.jpg)";

  }else if (isSnowing(weatherID)){
      return "url(../assets/snow-morning-afternoon.jpg)";

  }else{
      return "url(../assets/late-afternoon.jpg)";
  }
}

function getNightImage(weatherID){
  if (isRaining(weatherID)){
      return "url(../assets/rain-dawn-night.jpg)";

  }else if (isSnowing(weatherID)){
      return "url(../assets/snow-dawn-night.jpg)";

  }else{
      return "url(../assets/night.jpg)";
  }
}

function setBackground(hour, weatherID){
  if (5 <= hour && hour <= 6){
      document.body.style.backgroundImage = getDawnImage(weatherID);
  }else if (7 <= hour && hour <= 16){
      document.body.style.backgroundImage = getMorningImage(weatherID);
  }else if (17 <= hour && hour <= 18){
      document.body.style.backgroundImage = getLateAfternoonImage(weatherID); 
  }else{
      document.body.style.backgroundImage = getNightImage(weatherID);
  }
}

function getLocalTime(){
  let date = new Date();

  let localTime = date.getTime();

  let localOffset = date.getTimezoneOffset() * 60000;

  return localTime + localOffset;
}

function getCalcTimeOffset(timezone){    
  let utc = getLocalTime()
  let cityTime = utc + (1000 * timezone);

  let date = new Date(cityTime)

  DATE_TODAY.textContent = date.toDateString();
  TIME_TODAY.textContent = date.toLocaleTimeString();

  return date.getHours();
}

function getWeatherInfo(location){
  CITY.textContent = `${location.name}, ${location.sys.country}`;

  TEMPERATURE.textContent = `${location.main.temp} F`;

  WEATHER.textContent = `${location.weather[0].main} - ${location.weather[0].description}`;

  TEMP_MIN_MAX.textContent = `L: ${location.main.temp_min} F / H: ${location.main.temp_max} F`;

  HUMIDITY.textContent = `Humidity: ${location.main.humidity} %`;

  WIND.textContent = `Wind: ${Math.round(location.wind.speed)} mph`;

  let currentTime = getCalcTimeOffset(location.timezone);
  setBackground(currentTime, location.weather[0].id);

  console.log(location);
}

function getCity(city){
  fetch('/weather_targetLocation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      city: city,
    })
  }).then(res => res.json()).then(data => {
    getWeatherInfo(data);
  })
}

function getKeyEvent(keyEvent){
  if (keyEvent.key == 'Enter'){
      getCity(SEARCH_BOX.value);
  }
}

function getPosition(position){
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }).then(res => res.json()).then(data => {
    getWeatherInfo(data);
  })
}

function getCurrentLocation(){
  if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getPosition)
  }
}
getCurrentLocation();

SEARCH_BOX.addEventListener('keypress', getKeyEvent);