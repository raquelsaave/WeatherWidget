function PlaceService() {
	this.request = new XMLHttpRequest();
	this.getPlaces = this.getPlaces.bind(this);
}

PlaceService.prototype = {
	getPlaces: function (input) {
		return new Promise((resolve, reject) => {
			this.request.open("GET", `api/search?sample=${input}`, true);  // `false` makes the request synchronous
			this.request.onload = function () {
				resolve(JSON.parse(this.response))
			};
			this.request.onerror = function () {
				reject(">> There was an error while loading the API...")
			}
			this.request.send(null);
		})
	}
	// getPlaces: function (input,callback) {
	// 	this.request.open("GET", `api/search?sample=${input}`, true);  // `false` makes the request synchronous
	// 	this.request.onload = function () {
	// 		callback(JSON.parse(this.response))
	// 	};
	// 	this.request.send(null);
	// }
}

