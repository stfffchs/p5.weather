//VariabledefinierenundDefaultWertesetzen
//MitechtenWertengefülltwerdendieseinderFunktiongotWeather
letweatherdays=[];//indiesesArrayfüllenwirdieWettervorschauderkommendenTage
letkey='3762f14b22f9477084191958191101';//signuphttps://www.apixu.com/signup.aspx
letinput,button;
varimg;
varx;
vary;

functioncalcPosition(){

    x=(windowWidth-img.width)/2;
    y=(windowHeight-img.height)/2;

}

functionpreload(){
    img=loadImage('images/Olaf_default.png');
    calcPosition();

}


functionsetup(){
    createCanvas(windowWidth,windowHeight);
//background(255,0,0,100);
    background(255,204,0);
    calcPosition();
}

functionwindowResized(){
    resizeCanvas(windowWidth,windowHeight);
    calcPosition();
}

/*functionsetup(){
createCanvas(375,812,width/2,height/2);
angleMode(DEGREES);
textAlign(CENTER,CENTER);


leturl='https://api.apixu.com/v1/forecast.json?key='+key+'&q=Zürich&days=7';

input=createInput();
input.position(20,65);

button=createButton('submit');
button.position(input.x+input.width,65);
button.mousePressed(reloadJSON);

loadJSON(url,gotWeather);//nachdemdasjsonFilegeladenist,rufenwirdieFunktiongotWeatherauf

image(img,0,0,width,height);
}*/


functiondraw(){




    console.log("windowWidth",windowWidth)
    console.log("windowHeight",windowHeight)
    console.log("width",width)
    console.log("height",height)


    image(img,x,y);




}

functiongotWeather(weather){
    weatherdays=weather.forecast.forecastday;


}

functionreloadJSON(){
    letort=input.value();
    leturl='https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=7';
    loadJSON(url,gotWeather);

}
