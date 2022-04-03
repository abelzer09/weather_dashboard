var APIKey = "65593a96c96d3428f2a08b76a4e29e4d";
var cityEl = document.getElementById("city");
var currentEl = document.getElementById("Current");
var dateEl = document.getElementById("currentDate");
var currentIconEl = document.getElementById("currentIcon")
var currentTemp1El = document.getElementById('currentTemp')
var currentWindEl = document.getElementById('currentWind')
var currentHumEl = document.getElementById('currentHum')
var currentUvEl = document.getElementById('currentUv')

var BtnSubmit = document.getElementById("submitBtn");
var citySearch = document.getElementById("search-input")
var searchCities = JSON.parse(window.localStorage.getItem("cities")) || [];
console.log(searchCities)

function apiCity(city){
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city  + "&appid=" + APIKey
fetch(queryURL)
.then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
})
.then(function (data) {
      var lat = data.coord.lat
      var lon = data.coord.lon
	return fetch("https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon +"&exclude=minutely,hourly,alerts" +"&appid=" + APIKey + "&units=imperial");
})
.then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data1) {
    var date = data1.daily[0].dt
    var reformatDate = moment(date, "X" ).format("l")
    dateEl.textContent = reformatDate
    // var cIcon = data1.daily[0].weather[0].icon
    // currentIconEl.textContent = fetch("http://openweathermap.org/img/wn/"+ cIcon +"@2x.png")
    var cTemp = data1.daily[0].temp.max;
    currentTemp1El.textContent = "Temp: " + cTemp + " °F"
    var cWind = data1.daily[0].wind_speed
    currentWindEl.textContent = "Wind: " + cWind + " MPH"
    var cHum = data1.daily[0].humidity
    currentHumEl.textContent = "Humidity: " + cHum + " %"
    var cUv = data1.daily[0].uvi
    currentUvEl.textContent = "UV Index: " + cUv
    console.log(data1);
    for (let i = 1 ; i < 6; i++) {
        var dateDiv = document.getElementById(`date${i}`)
        var date = data1.daily[i].dt
        var reformatDate = moment(date, "X" ).format("l")
        dateDiv.textContent = reformatDate
        var tempDiv = document.getElementById(`temp${i}`)
        var temps = data1.daily[i].temp.max
        tempDiv.textContent = "Temp: " + temps + " °F"
        var windDiv = document.getElementById(`wind${i}`)
        var windy = data1.daily[i].wind_speed
        windDiv.textContent = "Wind: " + windy +" MPH"
        var humDiv = document.getElementById(`hum${i}`)
        var humid = data1.daily[i].humidity
        humDiv.textContent = "Humidity " + humid +" %"

    }
}).catch(function (error) {
	console.warn(error);
});
}

BtnSubmit.addEventListener("click", function(event){
    event.preventDefault();
    console.log(citySearch.value)
    apiCity(citySearch.value)
    if (searchCities.includes(citySearch.value)) {
        return
    }else {
        searchCities.push(citySearch.value)
        var cityHistory = document.getElementById("searchHistory")
        var btn = document.createElement("button")
        btn.innerText = citySearch.value
        btn.value = citySearch.value
        cityHistory.appendChild(btn)
        localStorage.setItem("cities", JSON.stringify(searchCities))
    }

})

for (let j = 0; j < searchCities.length; j++) {
var cityHistory = document.getElementById("searchHistory")
var btn = document.createElement("button")
btn.innerText = searchCities[j]
btn.value = searchCities[j]
cityHistory.appendChild(btn)
    
}