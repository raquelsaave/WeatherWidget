import PlaceService from "../services/place-service.js"
// const PlaceService = require("../services/place-service.js").PlaceService;

describe("PlaceService", () => {
	let placeService;
	beforeAll(() => {
		placeService = new PlaceService();
	});

	it("should be and instance of a class", () => {
		expect(placeService).toBeDefined();
	});

	it("should return places matching guada", () => {
		return placeService.getPlaces("Guada")
			.then(places => {
				places.forEach(place => {
					expect(place.name.toLowerCase()).toMatch(/guada/);
				});
			});
	});

	it("should return 10 places", () => {
		return placeService.getPlaces("Guada").then(places => {
			expect(places.length).toEqual(10);
		});
	});
});
