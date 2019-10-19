import WeatherService from "../services/weather-service.js"

describe("WeatherService", () => {
	let weatherService;
	beforeAll(() => {
		weatherService = new WeatherService("8d0b7892bc5c02420f1c46dcdb9c2e4d");
	});

	it("should be and instance of a class", () => {
		expect(weatherService).toBeDefined();
	});

	it("should return the weather of Guadalajara", () => {
		return weatherService.getWeather(4005539)
			.then((data) => {
				expect(data.name).toBe("Guadalajara")
			});
	});
	
	it("should return an array of forecast for 8 days", () => {
		return weatherService.getForecast(4005539,8)
			.then((data) => {
				expect(data.list.length).toEqual(8)
			});
	});

	it("should return a bad HTTP request (code 400)", () => {
		return weatherService.getWeather(null)
			.then((data) => {
				expect(data.cod).toBe("400")
			});
	});

	it("should return OK (code 200)", () => {
		return weatherService.getWeather(4005539)
			.then((data) => {
				expect(data.cod).toBe(200)
			});
	});
});
