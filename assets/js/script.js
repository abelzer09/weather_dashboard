var APIKey = "65593a96c96d3428f2a08b76a4e29e4d";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)