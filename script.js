let currCity = "Lagos";
let units = "metric";
let city = document.querySelector(".city");
let datetime = document.querySelector(".datetime");
let weatherforecast = document.querySelector(".weather-forecast");
let weathertemperature = document.querySelector(".weather-temperature");
let weathericon = document.querySelector(".weather-icon");
let minmax = document.querySelector(".minmax")
let weatherrealfeel = document.querySelector(".weather-realfeel");
let weatherhumidity = document.querySelector(".weather-humidity");
let weatherwind = document.querySelector(".weather-wind");
let weatherpressure = document.querySelector(".weather-pressure");

document.querySelector(".weather-search").addEventListener('submit', e=>{
    let search = document.querySelector(".weather-form");
    e.preventDefault();
    currCity = search.value;
    getWeather()
})

document.querySelector(".celcius").addEventListener('click',() => {
   if (units !=="metric"){
    units="metric"
    getWeather()
   }
})

document.querySelector(".farhenheit").addEventListener('click',() => {
    if (units !=="imperial"){
     units="imperial"
     getWeather()
    }
 })
function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}

function getWeather() {
    const API_KEY = '1695b89f2da5352bf07b59a332ad3aa0';

    function convertCountryCode(country) {
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(country);
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
        .then((res) => res.json())
        .then((data) => {
            city.innerHTML = `${data.name},${convertCountryCode(data.sys.country)}`;
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weatherforecast.innerHTML = `<p>${data.weather[0].main}</p>`;
            weathertemperature.innerHTML = `${data.main.temp.toFixed()}&#176`
            weathericon.innerHTML = `  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
            minmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}&#176</p><p>Max:${data.main.temp_max.toFixed()}&#176</p>`
            weatherrealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
            weatherhumidity.innerHTML = `${data.main.humidity}%`
            weatherwind.innerHTML = `${data.wind.speed}m/s`
            weatherpressure.innerHTML = `${data.main.pressure}hPa`
          
        });
}

document.addEventListener('DOMContentLoaded', getWeather);
