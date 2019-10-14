function DashboardComponent(root) {
	this.root = root
	this.addCard = this.addCard.bind(this)
}


DashboardComponent.prototype = {
	addCard: function (cityId) {
		let weatherComponent = new WeatherComponent(cityId, weatherService)
		weatherComponent.update();
	}
}

