//Variable definieren und Default Werte setzen
//Mit echten Werten gefüllt werden diese in der Funktion gotWeather
let weatherdays = []; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key = '3762f14b22f9477084191958191101'; // signup https://www.apixu.com/signup.aspx
let input, button;
let Olaf_default;
let Olaf_sonnig;


// ------------------------------------------------------ Preload Images

function preload() {
    Olaf_default = loadImage('images/Olaf_default.png');
    Olaf_sonnig = loadImage('images/Olaf_sonnig.png');


}

// ------------------------------------------------------ Setup

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255, 0, 50);


    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=Zürich&days=7';

    input = createInput();
    input.position((windowWidth / 2) - 130, 3 * (windowHeight / 4));

    button = createButton('submit');
    button.position(input.x + input.width, 3 * (windowHeight / 4));
    button.mousePressed(reloadJSON);

    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf

}

// ------------------------------------------------------ Responsive

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// ------------------------------------------------------ gotWeather

function gotWeather(weather) {
    weatherdays = weather.forecast.forecastday;


}

// ------------------------------------------------------ Reload JSON

function reloadJSON() {
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=' + ort + '&days=7';
    loadJSON(url, gotWeather);

}

// ------------------------------------------------------ Draw

function draw() {


    var x = (windowWidth - Olaf_default.width) / 2;
    var y = (windowHeight - Olaf_default.height) / 2;

    image(Olaf_default, x, y, 100, 396);

    conditionSonnig;


}

function displayDefaultImage() {

}

function conditionSonnig() {


    if (current.condition == 'sonnig') {
        Olaf_sonnig(weatherdays[s].current.condition, 320, 0);

        image(Olaf_sonnig, x, y, 100, 396);


    }
    pop();

}








