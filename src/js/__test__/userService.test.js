import UserService from "../services/user-service.js"

function deleteAllCookies() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

describe("UserService", () => {
	let userService;
	beforeAll(() => {
		userService = new UserService();
	});

	beforeEach(() => {
		deleteAllCookies();
	});

	it("should be and instance of a class", () => {
		expect(userService).toBeDefined();
	});

	it("document.cookie should have added the cityId", () => {
		userService.addCity(4005539);
		userService.addCity(4013720);
		userService.addCity(4013720);
		expect(document.cookie).toContain(4013720)
		console.log(document.cookie)
	});

	it("document.cookie should have the expected format", () => {
		userService.addCity(4005539);
		userService.addCity(4013720);
		expect(document.cookie).toBe("weather=4005539,4013720")
	});

	it("Cookies should be returned", (done) => {
		userService.addCity(4005539);
		userService.forEachCity((data) => {
			expect(data).toBe("4005539");
			done();
		});
		// expect(document.cookie).toBe("weather=4005539,4013720")
	});

});
