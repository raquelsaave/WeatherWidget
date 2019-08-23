var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Guadalajara,MX&APPID=8d0b7892bc5c02420f1c46dcdb9c2e4d', true);  // `false` makes the request synchronous

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        console.log(data)
        // City and country
        document.querySelector('.city-and-country-name').innerHTML = `${data.name}, ${data.sys.country}`;
        // Forecast of the day
        document.querySelector('.day-forecast').innerHTML = data.weather[0].main;
        // Main Icon
        document.querySelector('.weather-img').innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
        // Current temperature
        document.querySelector('.degrees').innerHTML = data.main.temp - 273.15;
        // Day humidity
        document.querySelector('.day-forecast-humidity').innerHTML = `Humidity: ${data.main.humidity} 
        %`
        // Wind speed
        document.querySelector('.day-forecast-wind').innerHTML = `Wind: ${data.wind.speed}`;

        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        weekday[7] = "Sun";
        weekday[8] = "Mon";
        weekday[9] = "Tue";
        weekday[10] = "Wed";
        weekday[11] = "Thu";
        weekday[12] = "Fri";

        var n = weekday[d.getDay()];
        document.getElementById("day1").innerHTML = n;
        var n1 = weekday[d.getDay()+1];
        document.getElementById("day2").innerHTML = n1;
        var n2 = weekday[d.getDay()+2];
        document.getElementById("day3").innerHTML = n2;
        var n3 = weekday[d.getDay()+3];
        document.getElementById("day4").innerHTML = n3;
        var n4 = weekday[d.getDay()+4];
        document.getElementById("day5").innerHTML = n4;
        var n5 = weekday[d.getDay()+5];
        document.getElementById("day6").innerHTML = n5;
        var n6 = weekday[d.getDay()+6];
        document.getElementById("day7").innerHTML = n6;
        var n7 = weekday[d.getDay()+7];
        document.getElementById("day8").innerHTML = n7;

    } else {
        console.log('error')
    }
}
// Send request
request.send()


function daysOftheWeek() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    document.getElementById("demo").innerHTML = n;
}