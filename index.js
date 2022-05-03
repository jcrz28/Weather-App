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


function setBackground(hour){
    if (6 <= hour && hour <= 16){
        document.body.style.backgroundImage = "url(../assets/morning-afternoon.png)";
        document.body.style.color = "black";

    }else if (17 <= hour && hour <= 18){
        document.body.style.backgroundImage = "url(../assets/late-afternoon.png)";
        document.body.style.color = "black";
        
    }else{
        document.body.style.backgroundImage = "url(../assets/night.png)";
        document.body.style.color = "white";
    }
}

function getLocalTime(){
    let date = new Date();

    let localTime = date.getTime();

    let localOffset = date.getTimezoneOffset() * 60000;

    return localTime + localOffset;
}

function setDateAndTime(timezone){    
    let utc = getLocalTime()
    let cityTime = utc + (1000 * timezone);

    let date = new Date(cityTime)

    DATE_TODAY.textContent = date.toDateString();
    TIME_TODAY.textContent = date.toLocaleTimeString();

    setBackground(date.getHours())
}

function setWeatherInfo(location){
    CITY.textContent = `${location.name}, ${location.sys.country}`;
    TEMPERATURE.textContent = `${location.main.temp} F`
    WEATHER.textContent = `${location.weather[0].main} - ${location.weather[0].description}`
    TEMP_MIN_MAX.textContent = `L: ${location.main.temp_min} F / H: ${location.main.temp_max} F`
    HUMIDITY.textContent = `Humidity: ${location.main.humidity} %`;
    WIND.textContent = `Wind: ${Math.round(location.wind.speed)} mph`

    console.log(location);

    setDateAndTime(location.timezone);
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