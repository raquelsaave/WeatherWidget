import UserService from "../services/user-service.js"

describe("UserService", () => {
	let userService;
	beforeAll(() => {
		userService = new UserService();
	});

	it("should be and instance of a class", () => {
		expect(userService).toBeDefined();
	});

	it("document.cookie should have added the cityId", () => {
		userService.addCity(4005539);
		userService.addCity(4013720);
		expect(document.cookie).toContain(4013720)
		console.log(document.cookie)
	});

	it("document.cookie should have the expected format", () => {
		expect(document.cookie).toBe("weather=4005539,4013720")
	});

	it("Cookies should be returned", () => {
		userService.getCities((data) => {return data})
		 expect(document.cookie).toBe("weather=4005539,4013720")
	});

});
