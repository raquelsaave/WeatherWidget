const PlaceService = require('../place-service.js');

describe('PlaceService', () => { 
	beforeAll(() => {
		placeService = new PlaceService();
	});

	it('should instance class', () => {
		expect(placeService).toBeDefined();
	});

	it('should return 10 items', () => {
		return placeService.getPlaces("Guada").then(data => {
			expect(data.length).toEqual(10);
		});
	});

	it('should return items that match query', () => {
		return placeService.getPlaces("Guada")
			.then(data => {
				data.forEach(item => {
					expect(item.name.toLowerCase()).toMatch(/guada/);
				});
		});
	});
});
