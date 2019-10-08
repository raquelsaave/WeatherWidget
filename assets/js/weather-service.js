function WeatherService(API_ID) {
	this.API = API_ID;
	this.getForecast = this.getForecast.bind(this);
	this.getWeather = this.getWeather.bind(this);
}

WeatherService.prototype = {
	getWeather: function (city_ID) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open("GET", `https://api.openweathermap.org/data/2.5/weather?id=${city_ID}&APPID=${this.API}`, true);
			request.onload = function () {
				resolve(JSON.parse(this.response))
			};
			request.onerror = function() {
				reject(">> There was an error while loading the API...")
			}
			request.send(null);
		})
	},
	getForecast: function (city_ID, numDays) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open("GET", `https://api.openweathermap.org/data/2.5/forecast?id=${city_ID}&cnt=${numDays}&APPID=${this.API}`, true);  // `false` makes the request synchronous
			request.onload = function () {
				resolve(JSON.parse(this.response));
			};
			request.onerror = function() {
				reject(">> There was an error while loading the API...")
			}
			request.send(null);
		})
	}
}
