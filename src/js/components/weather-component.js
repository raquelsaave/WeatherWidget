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
	update: function (callback,callback2) {
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
				this.render(this.weatherData,callback,callback2);
			})
			.catch((err) => 	{
				console.log(err)
			})

	},
	render: function (weatherData,callbackRender,callbackDelete) {
		var today = weatherData.today
		var forecast = weatherData.forecast;

		// Get date
		var d = new Date();
		var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
		var n = weekday[d.getDay()];

		// Get day
		var hour = d.getHours();
		var minutes = d.getMinutes();
		var id = this.cityId;


		// console.log(forecast)
		reqListener("../../../src/templates/card.html", function callback(resp) {
			// console.log(today)
			let newCard = Mustache.render(resp, {
				id: id,
				city: `${today.name}, ${today.sys.country}`,
				day: `${n},   ${hour}:${minutes}`,
				dayForecast: today.weather.main,
				img: `https://openweathermap.org/img/w/${today.weather.icon}.png`,
				grados: Math.round(today.main.temp - 273.15),
				humedad: `Humidity: ${today.main.humidity}%`,
				viento: `Wind: ${today.wind.speed}  km/h`,
				forecast : renderBundle(forecast)
			});
			let template = document.createElement("template");

			
			template.innerHTML = newCard;
			let button = template.content.getElementById(id)
			console.log(button)
			button.addEventListener("click", (event) => {
				let card = event.target.closest("div");
				console.log(card)
				console.log("click, deleted!" + id)
				callbackDelete(card)
			})
			callbackRender(template.content)
		});
	}
}



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

export default WeatherComponent;