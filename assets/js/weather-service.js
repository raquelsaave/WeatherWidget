function WeatherService(API_ID) {
	this.API = API_ID;
	this.getForecast = this.getForecast.bind(this);
	this.getWeather = this.getWeather.bind(this);
}

WeatherService.prototype = {
	getWeather: function (cityId) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open("GET", `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${this.API}`, true);
			request.onload = function () {
				resolve(JSON.parse(this.response))
			};
			request.onerror = function() {
				reject(">> There was an error while loading the API...")
			}
			request.send(null);
			// reqListener(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${this.API}`,resolve,reject)
		})
	},
	getForecast: function (cityId, numDays) {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			request.open("GET", `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&cnt=${numDays}&APPID=${this.API}`, true);  // `false` makes the request synchronous
			request.onload = function () {
				resolve(JSON.parse(this.response));
			};
			request.onerror = function() {
				reject(">> There was an error while loading the API...")
			}
			request.send(null);
			// reqListener(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&cnt=${numDays}&APPID=${this.API}`,resolve,reject)
		})
	}
}

// function reqListener(source,resolve,reject) {
// 	let request = new XMLHttpRequest();
// 	request.open("GET", source, true);
// 	request.onload = function () {
// 		resolve(JSON.parse(this.response));
// 	};
// 	request.onerror = function() {
// 		reject(">> There was an error while loading the API...")
// 	}
// 	request.send(null);
// }
