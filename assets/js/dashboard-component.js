function DashboardComponent(root) {
	this.root = root
	this.addCard = this.addCard.bind(this)
	this.getCard = this.getCard.bind(this)
}


DashboardComponent.prototype = {
	addCard: function (cityId) {
		let weatherComponent = new WeatherComponent(cityId, weatherService)
		weatherComponent.update();
	},
	getCard: function (content) {
		console.log(content)
		this.root.appendChild(content)
	}
}
