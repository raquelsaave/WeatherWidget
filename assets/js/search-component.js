function SearchComponent(placeService, root) {
	this.placeService = placeService;
	this.root = root;
	this.dataPlaces = "0";
	this.renderPlaces = this.renderPlaces.bind(this);
}

SearchComponent.prototype = {
	update: function () {
		// this.root.querySelector(".inputPlace").addEventListener("keypress",function () {
		// 	placeService.getPlaces(this.root.querySelector(".inputPlace").value,function (data) {
		// 		this.dataPlaces = data;
		// 		this.renderPlaces(this.dataPlaces)
		// 	}.bind(this))
		// }.bind(this))
		this.root.querySelector(".inputPlace").addEventListener("keypress", () => {
			placeService.getPlaces(this.root.querySelector(".inputPlace").value)
				.then((data) => {
					this.dataPlaces = data;
					this.renderPlaces(this.dataPlaces);
				});
		});

		// this.root.querySelector(".inputPlace").onblur = function () {
		// 	console.log(this.root)
		// 	placeService.getPlaces(this.root.querySelector(".inputPlace").value,function (data) {
		// 		console.log(data);
		// 		this.dataPlaces = data;
		// 		this.renderPlaces(this.dataPlaces)
		// 	}.bind(this))
		// }.bind(this);
	},
	renderPlaces: function (dataPlaces) {
		console.log(dataPlaces)
		renderList(dataPlaces);
	}
}

function renderList(dataPlaces) {

	for (let i = 0; i < dataPlaces.length; i++) {
		var newDiv = document.createElement("div");
		newDiv.setAttribute("class", "search-block")
		var newContent = document.createTextNode(`${dataPlaces[i].name} , ${dataPlaces[i].country}`);
		newDiv.appendChild(newContent); //añade texto al div creado. 
		var currentDiv = document.getElementById("content");
		document.body.appendChild(newDiv, currentDiv);
	}
}