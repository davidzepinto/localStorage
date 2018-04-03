function XML_Data_Init(Class, color) {
    console.log("click");
    var key = window.localStorage.getItem(Class);

    if (window.DOMParser){
        var parser=new DOMParser();
        var xmlDoc=parser.parseFromString(key,"text/xml");
    }
    var x = xmlDoc.getElementsByClassName(color);
    console.log("data");
    loadImage_Init(x);
}



function showImg(imgPath, x, y){
    var canvas = document.querySelector("canvas");
    var ctx = this.canvas.getContext("2d");
    var img = new Image();

    var type = results_type();
    if(type == 0){
        img.onload = function () {
            ctx.drawImage(img, 10 +160*x, 10 + 160*y, 150, 150);
        };
        img.src = imgPath;
    }else{
        img.onload = function () {
            ctx.drawImage(img, x, y, 50, 50);
        };
        img.src = imgPath;
    }
}


function loadImage_Init(Images) {
    var numImages = 25;

    var x = 0;
    var y = 0;
    var angle = 0;

    var type = results_type();

    console.log(type);

    if (type == 1){
        x = canvas.width/2 -25;
        y = 10;
        angle = - Math.PI/2;
    }


    for (var i = 0; i < numImages; i++) {
        if(i%5 == 0 && i!= 0 && type == 0){
            x = 0;
            y++;
        }else if(type == 1 && i != 0){
            x = x + Math.sin(angle) * 70;
            y = y + Math.cos(angle) * 70;
            angle += Math.PI/(25/2);
        }

        var path = Images[0].childNodes[i].textContent;
        console.log("path = " + path);
        showImg(path, x, y);
        x++;
    }
    pageScroll();
}



function click_color(color){
    var audio = new Audio('sound/click.wav');
    audio.play();
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ctx.clearRect(0,0, 800, 800);

    var Class = getSearchInput();

    XML_Data_Init(Class, color);

    var delay=300; //0.2 seconds
    setTimeout(function(){
      var audio = new Audio('sound/results.wav');
      audio.play();
    }, delay);
}


function getSearchInput(){

    var input = document.forms["inputs"]["search"].value;
    return input;

}

function Search_no_Color(){

    var audio = new Audio('sound/click.wav');
    audio.play();

    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ctx.clearRect(0,0, canvas.width, canvas.height);

    var array = source_finder(1);
    var Class = getSearchInput();

    var Aux = [];
    for(var k = 0; k<14; k++){
        if(Class == array[k*100].class) Aux = array.slice(k*100,(k+1)*100);
    }

    var numImages = 25;

    var x = 0;
    var y = 0;
    var angle = 0;

    var type = results_type();

    console.log(type);

    if (type == 1){
        x = canvas.width/2 -25;
        y = 10;
        angle = - Math.PI/2;
    }


    for (var i = 0; i < numImages; i++) {
        if(i%5 == 0 && i!= 0 && type == 0){
            x = 0;
            y++;
        }else if(type == 1 && i != 0){
            x = x + Math.sin(angle) * 70;
            y = y + Math.cos(angle) * 70;
            angle += Math.PI/(25/2);
        }

        var path = Aux[i].path;
        console.log("path = " + path);
        showImg(path, x, y);
        x++;
    }

    var delay=300; //0.3 seconds

    setTimeout(function(){
      var audio = new Audio('sound/results.wav');
      audio.play();
    }, delay);
    pageScroll();
}


function results_type(){
    if (document.getElementById('grid').checked) {
        return 0;
    }

    else if (document.getElementById('circular').checked) {
        return 1;
    }
    return 0;
}


function pageScroll() {
        window.scrollBy(0,1);
        scrolldelay = setTimeout(pageScroll,10);
}