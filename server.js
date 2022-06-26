if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const API = process.env.API;
const WEATHER_WEBSITE = "https://api.openweathermap.org/data/2.5/"
const axios = require('axios');
const express = require ('express');
const app = express ();

app.use(express.json());
app.use(express.static('public'));

app.post ('/weather_targetLocation', (req, res) => {
    let url =`${WEATHER_WEBSITE}weather?q=${req.body.city}&appid=${API}&units=imperial`;
    axios({
        url: url, 
        responseType: 'json'
    }).then(data =>res.json(data.data))
});

app.post ('/', (req, res) => {
    let url = `${WEATHER_WEBSITE}weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${API}&units=imperial`;
    axios({
        url: url, 
        responseType: 'json'
    }).then(data =>res.json(data.data))
});

app.listen(3000, () => {
    console.log('Server Running');
});