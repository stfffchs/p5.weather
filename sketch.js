// ------------------------------------------------------ Variablen
let city = "";
let temp;
var input;
let button;
let key = '3762f14b22f9477084191958191101';
//Neue API f5292699190e2f09abed2a814846ceb3
let condition = "";
let wind_kph;
let daynite;

var Olaf_default;
var Olaf_sonnig;
var Olaf_wind;
var Olaf_rain;


var Temp_0;
var Temp_0b;

var Temp_1;
var Temp_2;
var Temp_3;

var myFont;

let Day;
let Nite;


// ------------------------------------------------------ Preload Images

function preload() {
    Olaf_default = loadImage('images/Olaf_default.png');
    Olaf_sonnig = loadImage('images/Olaf_sonnig.png');
    Olaf_rain = loadImage('images/Olaf_rain.png');
    Olaf_wind = loadImage('images/Olaf_wind.png');
    Olaf_partlycloudy = loadImage('images/Olaf_partlycloudy.png');
    Olaf_snow = loadImage('images/Olaf_snow.png');


    Temp_3 = loadImage('images/Temp_3.png');
    Temp_2 = loadImage('images/Temp_2.png');
    Temp_1 = loadImage('images/Temp_1.png');
    Temp_0b = loadImage('images/Temp_0b.png');
    Temp_0 = loadImage('images/Temp_0.png');


    Day = loadImage('images/Day.png');
    Nite = loadImage('images/Night.png');

    myFont = loadFont('images/Saira-Light.otf');


}

// ------------------------------------------------------ Setup


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255, 0, 50);


    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=Zürich&days=1';
    //Neue API    let url = 'http://api.weatherstack.com/current?access_key=f5292699190e2f09abed2a814846ceb&query=NewYork';


    input = createInput();
    input.position(47, 560);
    input.id('inputId');

    let inputField = document.getElementById("inputId");

    button = createButton('Ask Olaf!');
    button.position(47, 620);
    button.mousePressed(reloadJson);

    loadJSON(url, gotWeather);


    // ------------------------------------------------------ Function Click on Enter


    inputField.addEventListener("keyup", function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            reloadJson();
        }
    });

    frameRate(30);

}

// ------------------------------------------------------ Draw


function draw() {
    clear();
    // text("Wie gsehts hüt so us?", 360, 60);
    background(0, 255, 0, 50);

    var x = (30);
    var y = (30);



    if (daynite == 1) {
        image(Day, x, y, 300, 647);

    }

    if (daynite == 0) {
        image(Nite, x, y, 300, 647);

    }

    image(Olaf_default, x, y, 300, 647);


    // ------------------------------------------------------ Draw Current Temperature


    showTempC();
    //askOlaf();

    if (temp >= 20) {
        image(Temp_3, x, y, 300, 647);

    }

    if (temp >= 14 && temp <= 19) {
        image(Temp_2, x, y, 300, 647)
    }

    if (temp >= 6 && temp <= 13) {
        image(Temp_1, x, y, 300, 647);

    }

    if (temp >= -3 && temp <= 5) {
        image(Temp_0b, x, y, 300, 647);

    }

    if (temp <= -4) {
        image(Temp_0, x, y, 300, 647);

    }





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

    if (condition == "Patchy heavy snow") {
        image(Olaf_rain, x, y, 300, 647);
        //console.log("bild");
    }

    if (condition == "Light snow") {
        image(Olaf_snow, x, y, 300, 647);
        //console.log("bild");
    }

    if (condition == "Patchy light snow") {
        image(Olaf_snow, x, y, 300, 647);
        //console.log("bild");
    }

    // ------------------------------------------------------ Draw Current Wind

    if (wind_kph >= 20) {
        image(Olaf_wind, x, y, 300, 647);
        console.log("wind");
    }

    textFont(myFont);


}


function showTempC() {

    textSize(30);
    text(temp + " °C", 150, 80);

}
/*
function askOlaf() {

    textSize(30);
    text("Ask Olaf!", 40, 80);

}*/



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
    localtime = weather.location.localtime;
    condition = weather.current.condition.text;
    temp = weather.current.temp_c;
    daynite = weather.current.is_day;
    weatherdays = weather.forecast.forecastday;
    rain = weather.forecast.forecastday;
    wind_kph = weather.current.wind_kph;

}