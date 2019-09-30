function WeatherComponent(city, weatherService) {
	this.city = city
	this.weatherService = weatherService
	this.weatherData = {
		today: 0,
		forecast: 0 
	}
	this.render = this.render.bind(this)
}

WeatherComponent.prototype = {
	render: function () {

		// T O D A Y
		var today = this.weatherData.today
		document.querySelector(".city-and-country-name").innerHTML = `${today.name}, ${today.sys.country}`;
		// Forecast of the day
		document.querySelector(".day-forecast").innerHTML = today.weather[0].main;
		// Main Icon
		document.querySelector(".weather-img").innerHTML = `<img src="https://openweathermap.org/img/w/${today.weather[0].icon}.png">`;
		// Current temperature
		document.querySelector(".degrees").innerHTML = Math.round(today.main.temp - 273.15);
		// Day humidity
		document.querySelector(".day-forecast-humidity").innerHTML = `Humidity: ${today.main.humidity}%`

		// Wind speed
		document.querySelector(".day-forecast-wind").innerHTML = `Wind: ${today.wind.speed}`;

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

		// F O R E C A S T
		var forecast = this.weatherData.forecast;
		for (let i = 0; i < 8; i++) {
			renderBundle(i, forecast.list[i].weather[0].icon, forecast.list[i].main.temp_max, forecast.list[i].main.temp_min)
		}

	}
}

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