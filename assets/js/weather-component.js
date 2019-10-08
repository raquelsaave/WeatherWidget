
function WeatherComponent(cityId, weatherService) {
	this.cityId = cityId
	this.weatherService = weatherService
	this.weatherData = {
		today: 0,
		forecast: 0
	}
	this.update = this.update.bind(this)
	this.render = this.render.bind(this)
}


WeatherComponent.prototype = {
	update: function () {
		// this.weatherService.getWeather(4005539)
		// 	.then((data) => {
		// 		this.weatherData.today = {
		// 			name: data.name,
		// 			sys: data.sys,
		// 			main: data.main,
		// 			wind: data.wind,
		// 			weather: data.weather[0]
		// 		}
		// 		return this.weatherData.today
		// 	})
		// 	.then((data) => {
		// 		this.weatherService.getForecast(4005539, 8)
		// 			.then((data) => {
		// 				this.weatherData.forecast = data.list
		// 				console.log(this.weatherData)
		// 				this.render(this.weatherData)
		// 			})
		// 	})
		// 	.catch((error) => {
		// 		console.log(">> CATCH: We got an error!");
		// 		console.log(error);
		// 	})
		// 	.finally(() => {
		// 		console.log(">> FINALLY: Promises always execute this code!");
		// 	});

		let promises = [
			this.weatherService.getWeather(this.cityId),
			this.weatherService.getForecast(this.cityId, 8)
		]
		Promise.all(promises)
			.then((response) => {
				this.weatherData.today = {
					name: response[0].name,
					sys: response[0].sys,
					main: response[0].main,
					wind: response[0].wind,
					weather: response[0].weather[0]
				}
				this.weatherData.forecast = response[1].list
				this.render(this.weatherData);
			})
			.catch((err) => {
				console.log(err)
			})


		// this.weatherService.getId(this.city, function (data) {
		// 	this.id = data.id;
		// 	this.weatherService.getWeather(this.id, function (today) {
		// 		weatherService.getForecast(today.id, 8, function (forecast) {
		// 			this.weatherData = {
		// 				today: today,
		// 				forecast: forecast
		// 			}
		// 			this.render(this.weatherData);
		// 		}.bind(this));
		// 	}.bind(this));
		// }.bind(this));
	},
	render: function (weatherData) {
		// T O D A Y
		var today = weatherData.today
		document.querySelector(".city-and-country-name").innerHTML = `${today.name}, ${today.sys.country}`;
		// Forecast of the day
		document.querySelector(".day-forecast").innerHTML = today.weather.main;
		// Main Icon
		document.querySelector(".weather-img").innerHTML = `<img class="weather-img" src="https://openweathermap.org/img/w/${today.weather.icon}.png">`;
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
		var forecast = weatherData.forecast;
		for (let i = 0; i < 8; i++) {
			renderBundle(i, forecast[i].weather[0].icon, forecast[i].main.temp_max, forecast[i].main.temp_min)
		}

	}
}



function renderBundle(num, icon, max, min) {
	// Icon 
	document.querySelector(`.weather-img-${num + 1}`).innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png">`;
	// Max
	document.querySelector(`.day-${num + 1}-max`).innerHTML = `${Math.round(max - 273.15)}°`
	// Min
	document.querySelector(`.day-${num + 1}-min`).innerHTML = `  ${Math.round(min - 273.15)}°`
}

function renderWeekdays(num, weekday, d) {
	// Get weekdays 
	document.getElementById(`day${num}`).innerHTML = weekday[d.getDay() + num - 1];
}

