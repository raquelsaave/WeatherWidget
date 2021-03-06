function SearchComponent(placeService, root) {
	this.placeService = placeService;
	this.root = root;
	this.dataPlaces = "0";
	this.renderPlaces = this.renderPlaces.bind(this);
}

SearchComponent.prototype = {
	update: function (callback) {
		this.root.querySelector(".inputPlace").addEventListener("keypress", () => {
			if (this.root.querySelector(".inputPlace").value.length >= 3) {
				this.placeService.getMockPlaces(this.root.querySelector(".inputPlace").value)
					.then((data) => {
						this.dataPlaces = data;
						this.renderPlaces(this.dataPlaces,function(data) {
							// console.log(data)
							callback(data)
						});
					});
			}
		});
	},
	renderPlaces: function (dataPlaces,callback) {
		// console.log(dataPlaces)
		//remover los buscados anteriormente
		var currentDiv = this.root.querySelector(".results-list")
		currentDiv.classList.toggle("results", currentDiv.getAttribute("class").includes("results"))
		removeChild(currentDiv);

		for (let i = 0; i < dataPlaces.length; i++) {
			// Crear li's
			var newDiv = createLi(dataPlaces[i])

			//obtener IDs
			newDiv.addEventListener("click", (event) => {
				let item = event.target.closest("li")
				let cityId = item.getAttribute("id")
				callback(cityId)
				removeChild(currentDiv);
				this.root.querySelector(".inputPlace").value = ""
				currentDiv.classList.remove("results")
				// console.log("click" + currentDiv.getAttribute("class"))
			})
			currentDiv.appendChild(newDiv);
		}
	},
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

export default SearchComponent;