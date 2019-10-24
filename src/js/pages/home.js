import PlaceService from "../services/place-service.js";
import DashboardComponent from "../components/dashboard-component.js";
import SearchComponent from "../components/search-component.js";
import UserService from "../services/user-service.js";

const root = document.querySelector("#form")
let dashboardRoot = document.querySelector(".page-content");

let userService = new UserService();
let dashboard = new DashboardComponent(dashboardRoot);
let placeService = new PlaceService();
let searchComponent = new SearchComponent(placeService, root);

searchComponent.update((data) => {
	userService.addCity(data);
	dashboard.addCard(data)
});

userService.forEachCity((data) => {
	dashboard.addCard(data)
});




