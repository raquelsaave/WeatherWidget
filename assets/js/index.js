const root = document.querySelector("#form")
let dashboardRoot = document.querySelector(".page-content");

let dashboard = new DashboardComponent(dashboardRoot);

let placeService = new PlaceService();

let searchComponent = new SearchComponent(placeService, root);
searchComponent.update((data) => {
	dashboard.addCard(data)
});





