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
		var currentDiv = this.root.querySelector(".results-list")
		currentDiv.classList.toggle("results")
		console.log(currentDiv.getAttribute("class"))
		removeChild(currentDiv);
		
		for (let i = 0; i < dataPlaces.length; i++) {
			// Crear li's
			var newDiv = createLi(dataPlaces[i])

			//obtener IDs
			newDiv.addEventListener("click", (event) => {
				let item = event.target.closest("li")
				let cityId = item.getAttribute("id")
				console.log(cityId)

				let weatherComponent = new WeatherComponent(cityId, weatherService)
				weatherComponent.update();

				removeChild(currentDiv);
				this.root.querySelector(".inputPlace").value = ""
			})
			currentDiv.appendChild(newDiv);
		}
	}
}

function createLi(dataPlaces) {
	var newDiv = document.createElement("li");
	newDiv.setAttribute("class", "results-items")
	
	newDiv.setAttribute("id", dataPlaces.id)
	var newContent = document.createTextNode(`${dataPlaces.name} , ${dataPlaces.country}`);
	newDiv.appendChild(newContent); //añade texto al div creado. 
	return newDiv
}

function removeChild(parentNode) {
	while (parentNode.firstChild) {
		parentNode.removeChild(parentNode.firstChild);
	}
}
