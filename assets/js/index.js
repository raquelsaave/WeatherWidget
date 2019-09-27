function WeatherService(API_ID) {
	this.API = API_ID;
	this.getForecast = this.getForecast.bind(this);
	this.getWeather = this.getWeather.bind(this);
}


WeatherService.prototype.getWeather = function (city, callback) {
	var request = new XMLHttpRequest();
	request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.API}`, true);  // `false` makes the request synchronous
	request.onload = function () {
		callback(JSON.parse(this.response))
	};
	request.send(null);
}

WeatherService.prototype.getForecast = function (city_ID, numDays, callback) {
	var request = new XMLHttpRequest();
	request.open("GET", `https://api.openweathermap.org/data/2.5/forecast?id=${city_ID}&cnt=${numDays}&APPID=${this.API}`, true);  // `false` makes the request synchronous
	request.onload = function () {
		callback(JSON.parse(this.response))
	};
	request.send(null);
}


let weatherService = new WeatherService("8d0b7892bc5c02420f1c46dcdb9c2e4d");
weatherService.getWeather("Guadalajara,MX", function (data) {
	console.log(data)
	document.querySelector(".city-and-country-name").innerHTML = `${data.name}, ${data.sys.country}`;
	// Forecast of the day
	document.querySelector(".day-forecast").innerHTML = data.weather[0].main;
	// Main Icon
	document.querySelector(".weather-img").innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
	// Current temperature
	document.querySelector(".degrees").innerHTML = Math.round(data.main.temp - 273.15);
	// Day humidity
	document.querySelector(".day-forecast-humidity").innerHTML = `Humidity: ${data.main.humidity}%`

	// Wind speed
	document.querySelector(".day-forecast-wind").innerHTML = `Wind: ${data.wind.speed}`;

	var d = new Date();
	var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
	var n = weekday[d.getDay()];

	// Get day
	var hour = d.getHours();
	var minutes = d.getMinutes();
	document.querySelector(".week-day-hour").innerHTML = `${n},   ${hour}:${minutes}`
	document.getElementById("day1").innerHTML = n;
	for (let i = 2; i < 9; i++) {
		renderWeekdays(i, weekday, d)
	}

	weatherService.getForecast(data.id, 8, function (forecast) {
		console.log(forecast);
		for (let i = 0; i < 8; i++) {
			renderBundle(i, forecast.list[i].weather[0].icon, forecast.list[i].main.temp_max, forecast.list[i].main.temp_min)
		}
	});
});

function renderBundle(num, icon, max, min) {
	// Icon 
	document.querySelector(`.weather-img-${num + 1}`).innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png">`;
	// Max
	document.querySelector(`.day-${num + 1}-max`).innerHTML = `${Math.round(max - 273.15)}°C `
	// Min
	document.querySelector(`.day-${num + 1}-min`).innerHTML = `  ${Math.round(min - 273.15)}°C`
}

function renderWeekdays(num, weekday, d) {
	// Get weekdays 
	document.getElementById(`day${num}`).innerHTML = weekday[d.getDay() + num - 1];
}