//Variablen
let sunrise;
let sunset;
let city;
let currtemp;
let cloud;
let time;
let input, button;
let key = '3762f14b22f9477084191958191101';

var Olaf_default;
var Olaf_sonnig;
var Olaf partlycloudy;


// ------------------------------------------------------ Preload Images

function preload() {
    Olaf_default = loadImage('images/Olaf_default.png');
    Olaf_sonnig = loadImage('images/Olaf_sonnig.png');
    Olaf_partlycloudy = loadImage('images/Olaf_partlycloudy.png');


}

// ------------------------------------------------------ Setup


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255, 0, 50);


    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=Zürich&days=1';

    input = createInput();
    input.position(15, 620);

    button = createButton('OK');
    button.position(input.x + input.width + 10, 620);
    button.mousePressed(reloadJson);

    loadJSON(url, gotWeather);
}

// ------------------------------------------------------ Responsive

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// ------------------------------------------------------ Draw


function draw() {

    var x = (windowWidth - Olaf_default.width) / 2;
    var y = (windowHeight - Olaf_default.height) / 2;

    image(Olaf_default, x, y, 100, 396);

// ------------------------------------------------------ Draw Single Assets

    if (condition == sonnig) {
        image(Olaf_sonnig, x, y, 100, 396);
    }

    if (condition == partlycloudy) {
        image(Olaf_partlycloudy, x, y, 100, 396);
    }



/*
    text("Ort: " + city, 100, 70);
    text("Aktuelle Temperatur: " + currtemp, 100, 100);
    text("Sonnenaufgang ist um " + sunrise, 100, 130);
    text("Sonnenuntergang ist um " + sunset, 100, 160);
*/


}

// ------------------------------------------------------ Reload JSON

function reloadJson() {
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=' + ort + '&days=1';

    loadJSON(url, gotWeather);
}

// ------------------------------------------------------ gotWeather


function gotWeather(weather) {
    city = weather.location.name;
    time = weather.location.localtime;
    condition = weather.current.condition;

    currtemp = weather.current.temp_c;
    cloud = weather.current.cloud;
    sunrise = weather.forecast.forecastday[0].astro.sunrise;
    sunset = weather.forecast.forecastday[0].astro.sunset;

    console.log(time);

}


