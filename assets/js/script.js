var APIKey = "65593a96c96d3428f2a08b76a4e29e4d";
var cityEl = document.getElementById("city");
var currentEl = document.getElementById("Current");
var dateEl = document.getElementById("currentDate");
var currentIconEl = document.getElementById("currentIcon")
var currentTemp1El = document.getElementById('currentTemp')
var currentWindEl = document.getElementById('currentWind')
var currentHumEl = document.getElementById('currentHum')
var currentUvEl = document.getElementById('currentUv')
var unRange = document.getElementById("unIndex");
var BtnSubmit = document.getElementById("submitBtn");
var citySearch = document.getElementById("search-input")
var searchCities = JSON.parse(window.localStorage.getItem("cities")) || [];
var cityHistory = document.getElementById("searchHistory")
// function that for pulls city search data from api
function apiCity(city){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city  + "&appid=" + APIKey
fetch(queryURL)
.then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
})       //fuction to convert city search to latitude and longitude coordinates for weather data api
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
	}     // fuction to pull data for current weather information
}).then(function (data1) {
    var date = data1.daily[0].dt
    var reformatDate = moment(date, "X" ).format("l")
    dateEl.textContent = reformatDate
    var cIcon = data1.daily[0].weather[0].icon
    currentIconEl.src = "http://openweathermap.org/img/wn/" + cIcon + "@2x.png"
    var cTemp = data1.daily[0].temp.max;
    currentTemp1El.textContent = "Temp: " + cTemp + " °F"
    var cWind = data1.daily[0].wind_speed
    currentWindEl.textContent = "Wind: " + cWind + " MPH"
    var cHum = data1.daily[0].humidity
    currentHumEl.textContent = "Humidity: " + cHum + " %"
    var cUv = data1.daily[0].uvi
    unRange.textContent = cUv
    console.log(data1);
   
    // conditional statement for color uvi data index
    if(cUv < 3 ){
        unRange.classList.add("good")
        } else if(cUv < 6 || cUv > 8){
        unRange.classList.add("med")
        } else if(cUv < 8 || cUv > 11 ){
        unRange.classList.add("high")
        } else  {
        unRange.classList.add("danger")
        }

            // for log for getting weather data for 5day forcast
    for (let i = 1 ; i < 6; i++) {
        var dateDiv = document.getElementById(`date${i}`)
        var date = data1.daily[i].dt
        var reformatDate = moment(date, "X" ).format("l")
        dateDiv.textContent = reformatDate
        var wIcona = document.getElementById(`icon${i}`)
        var iconA = data1.daily[i].weather[0].icon
        wIcona.src = "http://openweathermap.org/img/wn/" + iconA + "@2x.png"
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
            // event listener for initial city search user submition
BtnSubmit.addEventListener("click", function(event){
    event.preventDefault()
    apiCity(citySearch.value)
    if (citySearch.value == 0 ) {
        alert("must enter a vaild city!");
        return null;
      }
    if (searchCities.includes(citySearch.value)) {
        return
    }else {        //sets search cities to local storage
        searchCities.push(citySearch.value)
        var cityHistory = document.getElementById("searchHistory")
        var btn = document.createElement("button")
        btn.innerText = citySearch.value
        btn.value = citySearch.value
        cityHistory.appendChild(btn)
        localStorage.setItem("cities", JSON.stringify(searchCities))
    }

})
    //fuction to dynamically create buttons for saved city history 
for (let j = 0; j < searchCities.length; j++) {
var cityHistory = document.getElementById("searchHistory")
var btn = document.createElement("button")
btn.innerText = searchCities[j]
btn.value = searchCities[j]
cityHistory.appendChild(btn)
btn.classList.add("btn", "btn-secondary", "btn-lg", "btn-block")    
}
// event listener for saved city search history buttons
cityHistory.addEventListener("click", function(event){
    event.preventDefault();
    apiCity(event.target.value)
})
