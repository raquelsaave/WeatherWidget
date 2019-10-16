const WEATHER_API_KEY = "8d0b7892bc5c02420f1c46dcdb9c2e4d";

function DashboardComponent(root) {
	this.root = root
	this.addCard = this.addCard.bind(this)
	this.weatherService = new WeatherService(WEATHER_API_KEY);
}


DashboardComponent.prototype = {
	addCard: function (cityId) {
		let weatherComponent = new WeatherComponent(cityId, this.weatherService)
		weatherComponent.update((data)=> {
			this.root.appendChild(data)
		});
	}
}
