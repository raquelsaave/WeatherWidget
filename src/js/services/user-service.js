class UserService {
	constructor() {
	}

	getCities() {

	}

	forEachCity(callback) {
		let splitcookies = getCookies();
		if (splitcookies.length != 0) {
			let cookiesArray = splitcookies[0].split(",");
			if (cookiesArray.length > 0) {
				cookiesArray.forEach((cookie) => {
					callback(cookie)
				});
			}
		}

	}

	addCity(cityId) {
		let splitcookies = getCookies();
		let arrayCookies = splitcookies;
		if (splitcookies.length != 0) {
			arrayCookies = splitcookies[0].split(",");
		}
		if (arrayCookies.includes(`${cityId}`)) {
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