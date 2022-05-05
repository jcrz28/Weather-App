const API_KEY = "YOUR_API_KEY";
const WEATHER_WEBSITE = "https://api.openweathermap.org/data/2.5/"


const CITY = document.getElementById('city');

const TEMPERATURE = document.getElementById("temperature-today");

const WEATHER = document.getElementById("weather");

const TEMP_MIN_MAX = document.getElementById("min-max-temp");

const HUMIDITY = document.getElementById("humidity");

const WIND = document.getElementById("wind");

const DATE_TODAY = document.getElementById('date-today');

const TIME_TODAY = document.getElementById('time-today');


function getDawnImage(weatherID){
    if ((200 <= weatherID && weatherID <= 299) || (300 <= weatherID && weatherID <= 399) || (500 <= weatherID && weatherID <= 599)){
        return "url(../assets/rain-dawn-night.jpg)";

    }else if (600 <= weatherID && weatherID <= 699){
        return "url(../assets/snow-dawn-night.jpg)";
        
    }else{
        return "url(../assets/dawn.jpg)";
    }
}

function getMorningImage(weatherID){
    if ((200 <= weatherID && weatherID <= 299) || (300 <= weatherID && weatherID <= 399) || (500 <= weatherID && weatherID <= 599)){
        return "url(../assets/rain-morning-afternoon.jpg)";

    }else if (600 <= weatherID && weatherID <= 699){
        return "url(../assets/snow-morning-afternoon.jpg)";

    }else{
        return "url(../assets/morning-afternoon.jpg)";
    }
}

function getLateAfternoonImage(weatherID){
    if ((200 <= weatherID && weatherID <= 299) || (300 <= weatherID && weatherID <= 399) || (500 <= weatherID && weatherID <= 599)){
        return "url(../assets/rain-morning-afternoon.jpg)";

    }else if (600 <= weatherID && weatherID <= 699){
        return "url(../assets/snow-morning-afternoon.jpg)";

    }else{
        return "url(../assets/late-afternoon.jpg)";
    }
}

function getNightImage(weatherID){
    if ((200 <= weatherID && weatherID <= 299) || (300 <= weatherID && weatherID <= 399) || (500 <= weatherID && weatherID <= 599)){
        return "url(../assets/rain-dawn-night.jpg)";

    }else if (600 <= weatherID && weatherID <= 699){
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

function setDateAndTime(timezone, weatherID){    
    let utc = getLocalTime()
    let cityTime = utc + (1000 * timezone);

    let date = new Date(cityTime)

    DATE_TODAY.textContent = date.toDateString();
    TIME_TODAY.textContent = date.toLocaleTimeString();

    setBackground(date.getHours(), weatherID)
}

function setWeatherInfo(location){
    CITY.textContent = `${location.name}, ${location.sys.country}`;

    TEMPERATURE.textContent = `${location.main.temp} F`;

    WEATHER.textContent = `${location.weather[0].main} - ${location.weather[0].description}`;

    TEMP_MIN_MAX.textContent = `L: ${location.main.temp_min} F / H: ${location.main.temp_max} F`;

    HUMIDITY.textContent = `Humidity: ${location.main.humidity} %`;

    WIND.textContent = `Wind: ${Math.round(location.wind.speed)} mph`;
    setDateAndTime(location.timezone, location.weather[0].id);

    console.log(location);
}

function getCity(city){
    fetch(`${WEATHER_WEBSITE}weather?q=${city}&appid=${API_KEY}&units=imperial`)
    .then(weather => {
        return weather.json();
    }).then(setWeatherInfo);
}

function getKeyEvent(keyEvent){
    if (keyEvent.key == 'Enter'){
        getCity(searchBox.value);
    }
}

function getPosition(position){
    const LATITUDE = position.coords.latitude;
    const LONGITUDE = position.coords.longitude;

    fetch(`${WEATHER_WEBSITE}weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=imperial`)
    .then(weather => {
        return weather.json();
    }).then(setWeatherInfo);
}


function setCurrentLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition)
    }
}

setCurrentLocation();
const searchBox = document.querySelector('input');
searchBox.addEventListener('keypress', getKeyEvent);