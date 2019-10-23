import UserService from "../services/user-service.js"

describe("UserService", () => {
	let userService;
	beforeAll(() => {
		userService = new UserService();
	});

	it("should be and instance of a class", () => {
		expect(userService).toBeDefined();
	});

	// it("should return add the cityId", () => {
	// 	console.log(userService.addCity(4005539))
	// });

});
