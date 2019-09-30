const WEATHER_API_KEY = "8d0b7892bc5c02420f1c46dcdb9c2e4d";
let weatherService = new WeatherService(WEATHER_API_KEY);

let weatherComponent = new WeatherComponent("Guadalajara,MX",weatherService)

weatherService.getWeather("Guadalajara,MX", function (today) {
	weatherService.getForecast(today.id, 8, function (forecast) {
		weatherComponent.weatherData = {
			today: today,
			forecast: forecast
		}
		weatherComponent.render();
	});
});