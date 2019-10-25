import WeatherService from "../services/weather-service.js"
import WeatherComponent from "../components/weather-component.js"

const WEATHER_API_KEY = "8d0b7892bc5c02420f1c46dcdb9c2e4d";

function DashboardComponent(root) {
	this.root = root
	this.addCard = this.addCard.bind(this)
	this.weatherService = new WeatherService(WEATHER_API_KEY);
	this.addCard.bind(this);
	this.deleteCard.bind(this)
}


DashboardComponent.prototype = {
	addCard: function (cityId) {
		let weatherComponent = new WeatherComponent(cityId, this.weatherService)
		weatherComponent.update((data) => {
			// console.log(data)
			this.root.appendChild(data)
		}, (data) => {
			this.deleteCard(data)
		});
		console.log(cityId)
	},
	deleteCard: function (button) {
		button.addEventListener("click", (event) => {
			let card = event.target.closest("div");
			console.log("click, deleted!")
			this.root.removeChild(card);
		})
	}
}

export default DashboardComponent; 