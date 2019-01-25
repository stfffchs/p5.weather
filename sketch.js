// ------------------------------------------------------ Variablen
let city = "";
let temp;
var input;
let button;
let key = '3762f14b22f9477084191958191101';
let condition = "";
let wind_kph;

var Olaf_default;
var Olaf_sonnig;
var Olaf_wind;
var Olaf_rain;


var Temp_0;
var Temp_1;
var Temp_2;
var Temp_3;


// ------------------------------------------------------ Preload Images

function preload() {
    Olaf_default = loadImage('images/Olaf_default.png');
    Olaf_sonnig = loadImage('images/Olaf_sonnig.png');
    Olaf_rain = loadImage('images/Olaf_rain.png');
    Olaf_wind = loadImage('images/Olaf_wind.png');
    Olaf_partlycloudy = loadImage('images/Olaf_partlycloudy.png');


    Temp_3 = loadImage('images/Temp_3.png');
    Temp_2 = loadImage('images/Temp_2.png');
    Temp_1 = loadImage('images/Temp_1.png');
    Temp_0 = loadImage('images/Temp_0.png');


}

// ------------------------------------------------------ Setup


function setup() {
    createCanvas(375, 809);
    background(0, 255, 0, 50);


    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=Zürich&days=1';

    input = createInput();
    input.position(47, 560);
    input.id('inputId');

    let inputField = document.getElementById("inputId");

    button = createButton('OK');
    button.position(47, 620);
    button.mousePressed(reloadJson);

    loadJSON(url, gotWeather);


// ------------------------------------------------------ Function Click on Enter


    inputField.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            reloadJson();
        }
    });


    /*// ------------------------------------------------------ Responsive

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }*/

// ------------------------------------------------------ Draw
}

function draw() {

    var x = (30);
    var y = (30);

    image(Olaf_default, x, y, 300, 647);

// ------------------------------------------------------ Draw Current Temperature


    if (temp >= 20) {
        image(Temp_3, x, y, 300, 647);

    }

    if (temp >= 11 && temp <= 19) {
        image(Temp_2, x, y, 300, 647)
    }

    if (temp >= -3 && temp <= 10) {
        image(Temp_1, x, y, 300, 647);

    }


    if (temp <= -4) {
        image(Temp_0, x, y, 300, 647);

    }

    showTempC();


    // ------------------------------------------------------ Draw Current Condition

    //console.log(condition);
    if (condition == "Partly cloudy") {
        image(Olaf_partlycloudy, x, y, 300, 647);
        //console.log("bild");
    }

    if (condition == "Sunny") {
        image(Olaf_sonnig, x, y, 300, 647);
        //console.log("bild");
    }
    if (condition == "Moderate or heavy rain shower") {
        image(Olaf_rain, x, y, 300, 647);
        //console.log("bild");
    }

    if (condition == "Rain") {
        image(Olaf_rain, x, y, 300, 647);
        //console.log("bild");
    }

    // ------------------------------------------------------ Draw Current Wind

    if (wind_kph >= 20) {
        image(Olaf_wind, x, y, 300, 647);
        console.log("wind");
    }


}


function showTempC() {

    textSize(30);
    text(temp + " °C", 140, 60);

}

// ------------------------------------------------------ Reload JSON

function reloadJson() {
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=' + ort + '&days=1';

    loadJSON(url, gotWeather);
}

// ------------------------------------------------------ gotWeather


function gotWeather(weather) {
    //console.log(weather);
    city = weather.location.name;
    condition = weather.current.condition.text;
    temp = weather.current.temp_c;
    weatherdays = weather.forecast.forecastday;
    rain = weather.forecast.forecastday;
    wind_kph = weather.current.wind_kph;

}


