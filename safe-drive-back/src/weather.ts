const request = require('request');
var key = "36590f00de7e4c2b1dda2a979f203aa5";

function get_url(lat: number, lon: number) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
}

export function get_weather(lat: number, lon: number) {
    let url = get_url(lat, lon);
    request(url, function(err:any, response:any, body: any){
        var weather = JSON.parse(body)
        console.log(weather);
        return weather;
    });
}