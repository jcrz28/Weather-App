const API_KEY = "YOUR_API_KEY";
const WEATHER_WEBSITE = "https://api.openweathermap.org/data/2.5/"


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
    let dateToday = document.getElementById('date-today');
    let timeToday = document.getElementById('time-today');

    let utc = getLocalTime()
    let cityTime = utc + (1000 * timezone);

    let date = new Date(cityTime)
    dateToday.textContent = date.toDateString();
    timeToday.textContent = date.toLocaleTimeString();

    setBackground(date.getHours())
}

function setWeatherInfo(location){
    let city = document.getElementById('city');
    let temperature = document.getElementById("temperature-today");
    let weather = document.getElementById("weather");
    let tempMinMax = document.getElementById("min-max-temp");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");

    city.textContent = `${location.name}, ${location.sys.country}`;
    temperature.textContent = `${location.main.temp} F`
    weather.textContent = `${location.weather[0].main} - ${location.weather[0].description}`
    tempMinMax.textContent = `L: ${location.main.temp_min} F / H: ${location.main.temp_max} F`
    humidity.textContent = `Humidity: ${location.main.humidity} %`;
    wind.textContent = `Wind: ${Math.round(location.wind.speed)} mph`
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
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    fetch(`${WEATHER_WEBSITE}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`)
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