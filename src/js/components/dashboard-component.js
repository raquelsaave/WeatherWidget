import WeatherService from "../services/weather-service.js"
import WeatherComponent from "../components/weather-component.js"
import UserService from "../services/user-service.js";


const WEATHER_API_KEY = "8d0b7892bc5c02420f1c46dcdb9c2e4d";

function DashboardComponent(root) {
	this.root = root
	this.addCard = this.addCard.bind(this)
	this.weatherService = new WeatherService(WEATHER_API_KEY);
	this.addCard.bind(this);
	this.deleteCard.bind(this);
	this.userService = new UserService();
}


DashboardComponent.prototype = {
	addCard: function (cityId) {
		let weatherComponent = new WeatherComponent(cityId, this.weatherService)
		weatherComponent.update((data) => {
			this.root.appendChild(data)
		}, (data) => {
			this.deleteCard(data)
			this.userService.removeCity(cityId)
		});
		console.log(cityId)
	},
	deleteCard: function (card) {
		this.root.removeChild(card);
	}
}

export default DashboardComponent; 