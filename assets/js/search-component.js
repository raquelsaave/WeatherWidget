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
		//remover los buscados anteriormente
		var currentDiv = this.root.querySelector(".results")
		removeChild(currentDiv);

		for (let i = 0; i < dataPlaces.length; i++) {
			//agregar nuevos li´s
			var newDiv = document.createElement("li");
			newDiv.setAttribute("class", "results-items")
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

				removeChild(currentDiv);
				this.root.querySelector(".inputPlace").value = ""
				// currentDiv.setAttribute("class", "results")
			})
			currentDiv.appendChild(newDiv);
		}
	}
}

function removeChild(parentNode) {
	while (parentNode.firstChild) {
		parentNode.removeChild(parentNode.firstChild);
	}
}
