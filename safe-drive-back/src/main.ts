const road = require('./find_road');
const weather = require('./weather');
const tbilisi =
    {
        lat: 41.6938,

        lon: 44.8015
    }
const batumi =
    {
        lat:41.6461,

        lon:41.6405
    }



weather.get_weather(batumi.lat, batumi.lon)