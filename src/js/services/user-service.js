class UserService {
	constructor() {
	}
	getCities(callback) {
		console.log(document.cookie)
		let cookies = document.cookie;
		var array=cookies.split(";")
		array.forEach((data)=>{
			callback(data)
		});
	}
	addCity(cityId) {
		document.cookie = `${cityId}=${cityId}`
		console.log(document.cookie)
	}
}

export default UserService;