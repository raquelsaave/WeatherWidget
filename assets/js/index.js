const WEATHER_API_KEY = "8d0b7892bc5c02420f1c46dcdb9c2e4d";
const root = document.querySelector("#form")
// var x = document.getElementById("form").action;
// // console.log(x)
let weatherService = new WeatherService(WEATHER_API_KEY);
let weatherComponent = new WeatherComponent("Guadalajara,MX", weatherService)

weatherComponent.update();
// let placeService = new PlaceService(document.querySelector(".inputPlace").value);
let placeService = new PlaceService();

let searchComponent =  new SearchComponent(placeService,root);
searchComponent.update();