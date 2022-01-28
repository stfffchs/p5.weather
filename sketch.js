// ---------------------------------------------------------------- var and let
let city = "";
let temp;
var input;
let button;
let access_key = 'f5292699190e2f09abed2a814846ceb3';
let condition = "";
let wind_speed;
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

// var myFont;

let Day;
let Nite;



// ---------------------------------------------------------------- preload images
function preload() {
    Olaf_default = loadImage('images/Olaf_default.png');
    console.log('load olaf');


}


// ---------------------------------------------------------------- function setup

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255, 0, 50);

    let url = 'https://api.weatherstack.com/current?access_key=f5292699190e2f09abed2a814846ceb3&query=Zurich';
    console.log('url ok');

    input = createInput();
    input.position(47, 560);
    input.id('inputId');
    console.log('create input');

    let inputField = document.getElementById("inputId");
    console.log('input field');

    button = createButton('Ask Olaf!');
    button.position(47, 620);
    button.mousePressed(reloadJson);
    console.log('button');

    loadJSON(url, gotWeather);
    console.log('url, gotweather');


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
        console.log('isday');

    }

    if (daynite == 0) {
        image(Nite, x, y, 300, 647);

    }

    image(Olaf_default, x, y, 300, 647);



}
// ---------------------------------------------------------------- function setup
function reloadJson() {
    let ort = input.value();
    let url = 'https://api.weatherstack.com/current?access_key=f5292699190e2f09abed2a814846ceb3&query=Zurich';

    loadJSON(url, gotWeather);
}

// ---------------------------------------------------------------- function setup
function gotWeather(weather) {
    console.log('gotweather');

    city = location.name;
    console.log('city');
    temp = current.temperature;
    console.log('temperature');





}