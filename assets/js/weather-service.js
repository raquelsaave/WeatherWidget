function WeatherService(API_ID) {
	this.API = API_ID;
	this.request = new XMLHttpRequest();
	this.getForecast = this.getForecast.bind(this);
	this.getWeather = this.getWeather.bind(this);
}

WeatherService.prototype = {
	getWeather: function (city, callback) {
		this.request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.API}`, true);  // `false` makes the request synchronous
		this.request.onload = function () {
			callback(JSON.parse(this.response))
		};
		this.request.send(null);
	},
	getForecast: function (city_ID, numDays, callback) {
		this.request.open("GET", `https://api.openweathermap.org/data/2.5/forecast?id=${city_ID}&cnt=${numDays}&APPID=${this.API}`, true);  // `false` makes the request synchronous
		this.request.onload = function () {
			callback(JSON.parse(this.response))
		};
		this.request.send(null);
	}
}