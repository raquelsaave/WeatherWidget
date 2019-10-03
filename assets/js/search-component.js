function SearchComponent(placeService, root) {
	this.placeService = placeService;
	this.root = root;
	this.dataPlaces = "0";
	this.renderPlaces = this.renderPlaces.bind(this);
}

SearchComponent.prototype = {
	update : function () {
		console.log(this.root.querySelector(".inputPlace"))
		console.log(this.placeService)
		this.root.querySelector(".inputPlace").onblur = function () {
			console.log(this.root)
			placeService.getPlaces(this.root.querySelector(".inputPlace").value,function (data) {
				console.log(data);
				this.dataPlaces = data;
				this.renderPlaces(this.dataPlaces)
			}.bind(this))
		}.bind(this);
	},
	renderPlaces: function (dataPlaces) {
		console.log(dataPlaces)
		renderList(dataPlaces);
	}
}

function renderList(dataPlaces) {
	for (let i = 0; i < dataPlaces.length; i++) {
		var newDiv = document.createElement("div");
		var newContent = document.createTextNode(dataPlaces[i].name);
		newDiv.appendChild(newContent); //añade texto al div creado. 
		var currentDiv = document.getElementById("content");
		document.body.appendChild(newDiv, currentDiv);
	}
}