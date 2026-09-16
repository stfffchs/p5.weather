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
var Olaf_partlycloudy;
var Olaf_snow;

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
    Olaf_sonnig = loadImage('images/Olaf_sonnig.png');
    Olaf_wind = loadImage('images/Olaf_wind.png');
    Olaf_rain = loadImage('images/Olaf_rain.png');
    Olaf_partlycloudy = loadImage('images/Olaf_partlycloudy.png');
    Olaf_snow = loadImage('images/Olaf_snow.png');

    Temp_0 = loadImage('images/Temp_0.png');
    Temp_0b = loadImage('images/Temp_0b.png');
    Temp_1 = loadImage('images/Temp_1.png');
    Temp_2 = loadImage('images/Temp_2.png');
    Temp_3 = loadImage('images/Temp_3.png');

    Day = loadImage('images/Day.png');
    Nite = loadImage('images/Night.png');

    console.log('load olaf');
}


// ---------------------------------------------------------------- function setup

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255, 0, 50);

    input = createInput();
    input.position(47, 560);
    input.id('inputId');

    button = createButton('Ask Olaf!');
    button.position(47, 620);
    button.mousePressed(reloadJson);

    fetchWeather('Zurich');
}

// ------------------------------------------------------ Draw


function draw() {
    clear();
    background(0, 255, 0, 50);

    var x = (30);
    var y = (30);

    if (daynite === 1) {
        image(Day, x, y, 300, 647);
    } else if (daynite === 0) {
        image(Nite, x, y, 300, 647);
    }

    image(currentOlaf(), x, y, 300, 647);

    noStroke();
    fill(255);
    textSize(20);
    if (city) {
        text(city, 40, 500);
    }
    if (temp !== undefined) {
        text(temp + ' °C', 40, 530);
    }
}

// pick the Olaf image that matches the current weather condition
function currentOlaf() {
    if (!condition) {
        return Olaf_default;
    }
    let c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('shower') || c.includes('drizzle') || c.includes('thunder')) {
        return Olaf_rain;
    }
    if (c.includes('snow') || c.includes('sleet') || c.includes('ice')) {
        return Olaf_snow;
    }
    if (wind_speed > 25) {
        return Olaf_wind;
    }
    if (c.includes('sun') || c.includes('clear')) {
        return Olaf_sonnig;
    }
    if (c.includes('cloud') || c.includes('overcast')) {
        return Olaf_partlycloudy;
    }
    return Olaf_default;
}

// ---------------------------------------------------------------- function reloadJson
function reloadJson() {
    let ort = input.value();
    if (!ort) {
        return;
    }
    fetchWeather(ort);
}

// ---------------------------------------------------------------- helper to build the request url and fire it off
function fetchWeather(query) {
    let url = 'https://api.weatherstack.com/current?access_key=' + access_key + '&query=' + encodeURIComponent(query);
    loadJSON(url, gotWeather, gotWeatherError);
}

// ---------------------------------------------------------------- function gotWeather
function gotWeather(weather) {
    console.log('gotweather', weather);

    if (!weather || weather.success === false || !weather.location || !weather.current) {
        console.error('weatherstack error', weather && weather.error);
        return;
    }

    city = weather.location.name;
    temp = weather.current.temperature;
    condition = weather.current.weather_descriptions[0];
    wind_speed = weather.current.wind_speed;
    daynite = weather.current.is_day === 'yes' ? 1 : 0;
}

function gotWeatherError(err) {
    console.error('could not load weather', err);
}
