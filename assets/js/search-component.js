function SearchComponent(placeService, root) {
	this.placeService = placeService;
	this.root = root;
	this.dataPlaces = "0";
	this.renderPlaces = this.renderPlaces.bind(this);
}

SearchComponent.prototype = {
	update: function () {
		this.root.querySelector(".inputPlace").addEventListener("keypress", () => {
			if (this.root.querySelector(".inputPlace").value.length >= 3) {
				placeService.getPlaces(this.root.querySelector(".inputPlace").value)
					.then((data) => {
						this.dataPlaces = data;
						this.renderPlaces(this.dataPlaces);
					});
			}
		});
	},
	renderPlaces: function (dataPlaces) {
		console.log(dataPlaces)
		renderList(dataPlaces);
	}
}

function renderList(dataPlaces) {
	//remover los buscados anteriormente
	var currentDiv = document.querySelector(".list-of-places")
	while (currentDiv.firstChild) {
		currentDiv.removeChild(currentDiv.firstChild);
	}

	for (let i = 0; i < dataPlaces.length; i++) {
		//agregar nuevos li´s
		var newDiv = document.createElement("li");
		newDiv.setAttribute("class", "search-block")
		newDiv.setAttribute("id", dataPlaces[i].id)
		var newContent = document.createTextNode(`${dataPlaces[i].name} , ${dataPlaces[i].country}`);
		newDiv.appendChild(newContent); //añade texto al div creado. 

		//obtener IDs
		newDiv.addEventListener("click", (event) => {
			let item = event.target.closest("li")
			let cityId = item.getAttribute("id")
			console.log(cityId)

			let weatherComponent = new WeatherComponent(cityId, weatherService)
			weatherComponent.update();
		})
		currentDiv.appendChild(newDiv);
	}
}