// ---------------------------------------------------------------- var and let
let city = "";
let temp;
var input;
let button;
let access_key = 'f5292699190e2f09abed2a814846ceb3';
let condition = "";
let wind_speed;
let daynite;
let isLoading = false;

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
    // load the typed city when the user presses Enter
    input.elt.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            reloadJson();
        }
    });

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

    // 1) sky background
    if (daynite === 1) {
        image(Day, x, y, 300, 647);
    } else if (daynite === 0) {
        image(Nite, x, y, 300, 647);
    }

    // 2) Olaf himself, always visible
    image(Olaf_default, x, y, 300, 647);

    // 3) clothes on top of Olaf, based on temperature
    let clothing = currentClothing();
    if (clothing) {
        image(clothing, x, y, 300, 647);
    }

    // 4) weather accessory on top of everything (umbrella, sunglasses, scarf, snow...)
    let accessory = currentAccessory();
    if (accessory) {
        image(accessory, x, y, 300, 647);
    }

    strokeWeight(3);
    stroke(255);
    fill(0);
    textSize(24);
    textStyle(BOLD);
    if (city) {
        text(city, 45, 65);
    }
    if (temp !== undefined) {
        text(temp + ' °C', 45, 95);
    }
    noStroke();
}

// pick Olaf's outfit based on the current temperature
function currentClothing() {
    if (temp === undefined) {
        return null;
    }
    if (temp < 0) {
        return Temp_0;
    }
    if (temp < 10) {
        return Temp_0b;
    }
    if (temp < 18) {
        return Temp_1;
    }
    if (temp < 25) {
        return Temp_2;
    }
    return Temp_3;
}

// pick the weather accessory that matches the current condition
function currentAccessory() {
    if (!condition) {
        return null;
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
    return null;
}

// ---------------------------------------------------------------- function reloadJson
function reloadJson() {
    if (isLoading) {
        return;
    }
    let ort = input.value();
    if (!ort) {
        return;
    }
    city = 'Lade ' + ort + ' ...';
    setLoading(true);
    fetchWeather(ort);
}

// show/hide visual feedback on the button while a request is in flight
function setLoading(loading) {
    isLoading = loading;
    if (loading) {
        button.html('Lädt ...');
        button.attribute('disabled', '');
        button.style('background-color', '#7a7a7a');
        button.style('cursor', 'wait');
    } else {
        button.html('Ask Olaf!');
        button.removeAttribute('disabled');
        button.style('background-color', 'darkgreen');
        button.style('cursor', 'pointer');
    }
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
        city = 'Ort nicht gefunden';
        temp = undefined;
        condition = "";
        setLoading(false);
        return;
    }

    city = weather.location.name;
    temp = weather.current.temperature;
    condition = weather.current.weather_descriptions[0];
    wind_speed = weather.current.wind_speed;
    daynite = weather.current.is_day === 'yes' ? 1 : 0;
    setLoading(false);
}

function gotWeatherError(err) {
    console.error('could not load weather', err);
    city = 'Fehler beim Laden';
    setLoading(false);
}
