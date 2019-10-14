function DashboardComponent(root) {
	this.root = root
	this.addCard = this.addCard.bind(this)
	this.getCard = this.getCard.bind(this)
}


DashboardComponent.prototype = {
	addCard: function (cityId) {
		let weatherComponent = new WeatherComponent(cityId, weatherService)
		weatherComponent.update();
		console.log(content)
		this.getCard(content);
	},
	getCard: function (content) {
		console.log(content)
		this.root.appendChild(content)
	}
}

// function callback(content) {
// 	this.root.querySelector(".page-content").appendChild(content)
// }