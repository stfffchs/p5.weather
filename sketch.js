// ------------------------------------------------------ Variablen
let city;
let temp;
let input, button;
let key = '3762f14b22f9477084191958191101';
let condition;

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


    Temp_3 = loadImage('images/Temp_3.png');
    Temp_2 = loadImage('images/Temp_2.png');
    Temp_1 = loadImage('images/Temp_1.png');
    Temp_0 = loadImage('images/Temp_0.png');


}

// ------------------------------------------------------ Setup


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255, 0, 50);


    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=Zürich&days=1';

    input = createInput();
    input.position((width/2)-175, 560);

    button = createButton('OK');
    button.position((width/2)-175, 630);
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

    image(Olaf_default, x, y, 300, 647);

// ------------------------------------------------------ Draw Current Temperature


    if (temp >= 20) {
        image(Temp_3, x, y, 300, 647);

    }

    if (temp >= 15 && temp <= 19) {
        image(Temp_2, x, y, 300, 647)
    }

    if (temp >= 5 && temp <= 14) {
        image(Temp_1, x, y, 300, 647);

    }


    if (temp <= 4) {
        image(Temp_0, x, y, 300, 647);

    }

    // ------------------------------------------------------ Draw Current Condition   >>>>>>>>>>>>>>>> FEHLER !!!!!!

/*    if (condition === "Sunny") {
        image(Olaf_sonnig, x, y, 375, 809);

    }


    text(city, width/2,700);*/



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
    condition = weather.current.condition.text;
    temp = weather.current.temp_c;


}


