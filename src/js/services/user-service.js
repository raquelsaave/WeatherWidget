class UserService {
	constructor() {
	}

	getCities(callback) {
		// let cookiesArray = getCookieArray();
		// console.log(cookiesArray);
		// if (cookiesArray.length > 1) {
		// 	cookiesArray.forEach((cookie) => {
		// 		callback(cookie)
		// 	});
		// }


		let cookies = document.cookie;
		let splitcookies = cookies.split("=");
		splitcookies.shift();
		console.log(splitcookies)
		let cookiesArray = splitcookies[0].split(",");
		if (cookiesArray.length > 1) {
			cookiesArray.forEach((cookie) => {
				callback(cookie)
			});
		}

	}

	addCity(cityId) {
		let cookies = document.cookie;
		console.log(cookies)
		let splitcookies = cookies.split("=");
		splitcookies.shift();
		var arrayCookies = splitcookies[0].split(",");
		if (arrayCookies.includes(cityId)) {
			document.cookie = `weather=${splitcookies}`
		} else {
			splitcookies.push(cityId)
			document.cookie = `weather=${splitcookies}`
		}
		// let cookiesArray = getCookieArray();
		// if (!cookiesArray.includes(cityId)) {
		// 	document.cookie = `${cityId}=${cityId}`
		// }
	}

}

// function getCookieArray() {
// 	let cookies = document.cookie;
// 	let cookiesArrayRep = cookies.split(";").join().split("=").join().replace(/\s+/g, "").split(",");
// 	return [...new Set(cookiesArrayRep)];
// }

// function getCookieArray() {
// 	let cookies = document.cookie;
// 	console.log(cookies)
// 	let splitcookies = cookies.split("=");
// 	splitcookies.shift();
// 	var arrayCookies = splitcookies[0].split(",");
// 	return arrayCookies;
// }

export default UserService;