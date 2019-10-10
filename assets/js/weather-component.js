
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
		let promises = [
			this.weatherService.getWeather(this.cityId),
			this.weatherService.getForecast(this.cityId, 8)
		]
		Promise.all(promises)
			.then((response) => {
				console.log(response)
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

	},
	render: function (weatherData) {
		var today = weatherData.today
		var forecast = weatherData.forecast;

		// Get date
		var d = new Date();
		var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
		var n = weekday[d.getDay()];

		// Get day
		var hour = d.getHours();
		var minutes = d.getMinutes();

		console.log(forecast)
		reqListener("./assets/templates/card.html", function callback(resp) {
			console.log(today)
			let newCard = Mustache.render(resp, {
				city: `${today.name}, ${today.sys.country}`,
				day: `${n},   ${hour}:${minutes}`,
				dayForecast: today.weather.main,
				img: `https://openweathermap.org/img/w/${today.weather.icon}.png`,
				grados: Math.round(today.main.temp - 273.15),
				humedad: `Humidity: ${today.main.humidity}%`,
				viento: `Wind: ${today.wind.speed}  km/h`,
				forecast : renderBundle(forecast)
				// forecast: [
				// 	{
				// 		dayBundle: weekday[d.getDay() + 1],
				// 		icon: `https://openweathermap.org/img/w/${forecast[0].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[0].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[0].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 2],
				// 		icon: `https://openweathermap.org/img/w/${forecast[1].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[1].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[1].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 3],
				// 		icon: `https://openweathermap.org/img/w/${forecast[2].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[2].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[2].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 4],
				// 		icon: `https://openweathermap.org/img/w/${forecast[3].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[3].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[3].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 5],
				// 		icon: `https://openweathermap.org/img/w/${forecast[4].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[4].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[4].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 6],
				// 		icon: `https://openweathermap.org/img/w/${forecast[5].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[5].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[5].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 7],
				// 		icon: `https://openweathermap.org/img/w/${forecast[6].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[6].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[6].main.temp_min - 273.15)}°`
				// 	},
				// 	{
				// 		dayBundle: weekday[d.getDay() + 8],
				// 		icon: `https://openweathermap.org/img/w/${forecast[7].weather[0].icon}.png`,
				// 		max: `${Math.round(forecast[7].main.temp_max - 273.15)}°`,
				// 		min: `${Math.round(forecast[7].main.temp_min - 273.15)}°`
				// 	}
				// ]
			});

			//Removemos el card anterior
			document.querySelector(".page-content").removeChild(document.querySelector(".card"));

			let template = document.createElement("template");
			template.innerHTML = newCard;
			document.querySelector(".page-content").appendChild(template.content)
			console.log(newCard)
		});


		// 	// T O D A Y
		// 	var today = weatherData.today
		// 	document.querySelector(".city-and-country-name").innerHTML = `${today.name}, ${today.sys.country}`;
		// 	// Forecast of the day
		// 	document.querySelector(".day-forecast").innerHTML = today.weather.main;
		// 	// Main Icon
		// 	document.querySelector(".weather-img").innerHTML = `<img class="weather-img" src="https://openweathermap.org/img/w/${today.weather.icon}.png">`;
		// 	// Current temperature
		// 	document.querySelector(".degrees").innerHTML = Math.round(today.main.temp - 273.15);
		// 	// Day humidity
		// 	document.querySelector(".day-forecast-humidity").innerHTML = `Humidity: ${today.main.humidity}%`

		// 	// Wind speed
		// 	document.querySelector(".day-forecast-wind").innerHTML = `Wind: ${today.wind.speed}`;

		// 	var d = new Date();
		// 	var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
		// 	var n = weekday[d.getDay()];

		// 	// Get day
		// 	var hour = d.getHours();
		// 	var minutes = d.getMinutes();
		// 	document.querySelector(".week-day-hour").innerHTML = `${n},   ${hour}:${minutes}`
		// 	document.getElementById("day1").innerHTML = n;
		// 	for (let i = 2; i < 9; i++) {
		// 		renderWeekdays(i, weekday, d)
		// 	}

		// 	// F O R E C A S T
		// 	var forecast = weatherData.forecast;
		// 	for (let i = 0; i < 8; i++) {
		// 		renderBundle(i, forecast[i].weather[0].icon, forecast[i].main.temp_max, forecast[i].main.temp_min)
		// 	}

	}
}



// function renderBundle(num, icon, max, min) {
// 	// Icon 
// 	document.querySelector(`.weather-img-${num + 1}`).innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png">`;
// 	// Max
// 	document.querySelector(`.day-${num + 1}-max`).innerHTML = `${Math.round(max - 273.15)}°`
// 	// Min
// 	document.querySelector(`.day-${num + 1}-min`).innerHTML = `  ${Math.round(min - 273.15)}°`
// }

// function renderWeekdays(num, weekday, d) {
// 	// Get weekdays 
// 	document.getElementById(`day${num}`).innerHTML = weekday[d.getDay() + num - 1];
// }


function reqListener(source, callback) {
	let request = new XMLHttpRequest();
	request.open("GET", source, true);
	request.onload = function () {
		callback(this.response)
	}
	request.send(null)
}

function renderBundle(forecast) {
	// Get date
	var d = new Date();
	var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"]
	var arrayOfDays = []
	var object = {}
	for (let i = 0; i < weekday.length/2; i++) {
		object = {
			dayBundle: weekday[d.getDay() + i + 1],
			icon: `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`,
			max: `${Math.round(forecast[i].main.temp_max - 273.15)}°`,
			min: `${Math.round(forecast[i].main.temp_min - 273.15)}°`
		}
		arrayOfDays.push(object)
	}
	return arrayOfDays
}