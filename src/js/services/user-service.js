class UserService {
	constructor() {
	}

	getCities(callback) {
		let splitcookies = getCookies();

		if (splitcookies.length != 0) {
			let cookiesArray = splitcookies[0].split(",");
			if (cookiesArray.length > 1) {
				cookiesArray.forEach((cookie) => {
					callback(cookie)
				});
			}
		}

	}

	addCity(cityId) {
		let splitcookies = getCookies();
		var arrayCookies = splitcookies;
		if (splitcookies.length != 0) {
			var arrayCookies = splitcookies[0].split(",");
		}

		if (arrayCookies.includes(cityId)) {
			document.cookie = `weather=${splitcookies}`
		} else {
			splitcookies.push(cityId)
			document.cookie = `weather=${splitcookies}`
		}

	}

}

function getCookies() {
	let cookies = document.cookie;
	let splitcookies = cookies.split("=");
	splitcookies.shift();
	return splitcookies
}

export default UserService;