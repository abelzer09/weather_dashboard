var APIKey = "65593a96c96d3428f2a08b76a4e29e4d";
var cityEl = document.getElementById("city");
var currentEl = document.getElementById("Current")
var dateEl = document.getElementById("date")
var iconEl = document.getElementById("icon")
var data1El = document.getElementById('data1')
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "minneapolis" + "&appid=" + APIKey



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
    console.log(data1);
    for (let i = 0; i < data1.length; i++) {
        var date = data1[i].current.dt
        console.log(date)
        var reformatDate = moment(date, "X" ).format("l")
        dateEl.textContent = reformatDate
        // dateEl.append(reformatDate)
        
    }
}).catch(function (error) {
	console.warn(error);
});