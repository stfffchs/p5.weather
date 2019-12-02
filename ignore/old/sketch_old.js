//Variable definieren und Default Werte setzen
//Mit echten Werten gefüllt werden diese in der Funktion gotWeather
let weatherdays = []; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key = '3762f14b22f9477084191958191101'; // signup https://www.apixu.com/signup.aspx
let input, button;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);


    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=Zürich&days=7';

    input = createInput();
    input.position(20, 65);

    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(reloadJSON);

    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf

}


function draw() {
    background(255);

    drawmaxTemp();
    drawtimedate();
    drawminTemp();
    drawRain();


}

function gotWeather(weather) {
    weatherdays = weather.forecast.forecastday;


}

function reloadJSON() {
    let ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=' + ort + '&days=7';
    loadJSON(url, gotWeather);

}

function drawmaxTemp() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht
    noFill();

    ellipse(width / 2, height / 2, 600, 600);

    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte

    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

    fill(0);

    for (let s = 0; s < days; s++) {
        text(weatherdays[s].day.maxtemp_c, 320, 0);//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück

}


function drawminTemp() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht

    ellipse(width / 2, height / 2, 600, 600);

    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte

    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

    fill(0);

    for (let s = 0; s < days; s++) {
        text(weatherdays[s].day.mintemp_c, 280, 0);//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück

}

function drawtimedate() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht

    ellipse(width / 2, height / 2, 600, 600);

    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte

    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

    fill(0);


    for (let s = 0; s < days; s++) {
        text(weatherdays[s].day.mintemp_c, 280, 0);//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück

}

function drawRain() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht

    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte

    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

    fill(0, 0, 255, 100);

    for (let s = 0; s < days; s++) {
        let rain = weatherdays[s].day.totalprecip_mm;
        //console.log(rain);
        ellipse(300, 0, rain * 10, rain * 10);
        rotate(angle);
    }

}




