function main() {
    source_finder(0);
}

function source_finder(num){

    var xml_d = new XML_Data("xml/My_database.xml");
    var xmlDoc = xml_d.loadXML();
    var x = xmlDoc.getElementsByTagName("image");

    var ImagesList = [];
    var ImagesListAux = [];

    var aux = 0; //para dividir o array em 2 por falta de memoria
    for(var y = 0; y<2; y++){ //corre as 2 metades do array
        ImagesList = [];

        for (var j = 0; j < 7 ; j++){ //corre metade das categorias

            for(var i = 0; i < 100; i++){ //corre 100 imagens por categoria

                var imgpath = x[i+100*j + aux].getElementsByTagName("path")[0].childNodes[0].nodeValue;
                var imgtitle = x[i+100*j + aux].getElementsByTagName("title")[0].childNodes[0];
                var imgclasse = x[i+100*j + aux].getAttribute("class");

                ImagesList.push(new InfoImages(imgpath, imgtitle, imgclasse));
                if(num == 1){
                    ImagesListAux.push(new InfoImages(imgpath, imgtitle, imgclasse));
                }
            }
        }

        if (num == 0)loadImage(ImagesList);

        aux = 700;
    }
    if(num == 1) return ImagesListAux;
}



function InfoImages(path, title, Class){
    this.img = new Image();
    this.path = path;
    this.title = title;
    this.count_Pixels = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.class = Class;
}



function loadImage(infoImages) {
    var numImages = infoImages.length;
    var numLoaded = 0;

    function ImageLoaded(){

        numLoaded++;
        if (numLoaded == numImages) {
            // quando todas as imagens tiverem sido corridas no img.onload, desenha e conta o numero de pixels de cada imagem
            var canvas = document.querySelector("canvas");
            var ctx = canvas.getContext("2d");
            for (var i = 0; i < numImages; i++) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(infoImages[i].img, 0, 0);
                var imgData = ctx.getImageData(0,0, infoImages[i].img.width, infoImages[i].img.height);
                var hist12cores = new Hist12cores(imgData);
                hist12cores.count_Pixels();
                //hist12cores.build_Color_Rect(canvas);
                infoImages[i].count_Pixels = hist12cores.get_num_pixel_Color();
            }

            var ArrayFullSorted = ArraySorter(infoImages);

            var cores = ["Vermelho", "Laranja", "Amarelo", "Verde", "Verde Azulado", "Azul", "Roxo", "Rosa", "Branco", "Cinzento", "Preto", "Castanho"];
            var nameList = ["beach", "birthday", "face", "indoor", "artificial", "manmade", "urban", "marriage", "nature", "no_people", "outdoor", "party", "people", "snow"];
            var xmlRowString = "";


            //Aqui criamos a string para o local storage
            for (var i = 0; i < nameList.length; i++){
                if(ArrayFullSorted[i].length != 0){ //porque está a ser feito por partes existem arrays vazios que ja foram ou vao ser postos no localStorage

                    xmlRowString = "<" + nameList[i] + ">";
                    for(var m = 0; m < cores.length; m++){
                        xmlRowString += '<images class="' + cores[m] + '">';

                        for(var n = 0; n < 100; n++){
                            xmlRowString += "<path>" + ArrayFullSorted[i][m][n].path + "</path>";
                        }
                        xmlRowString += "</images>";
                    }
                    xmlRowString += "</" + nameList[i] + ">";
                    window.localStorage.setItem(nameList[i], xmlRowString);
                }
            }
        }
    }

    for(var j = 0; j < numImages; j++) { // ler todas as imagens antes de processar
        infoImages[j].img.onload = function () {
            ImageLoaded();
        };
        infoImages[j].img.src = infoImages[j].path;
    }
}


function ArraySorter(ArrayFilled) {

    var nameList = ["beach", "birthday", "face", "indoor", "manmade/artificial", "manmade/manmade", "manmade/urban", "marriage", "nature", "no_people", "outdoor", "party", "people", "snow"];
    var FullArraySorted = [];
    var ArrayAux = [];
    var CtgArray = [];

    var counter = 0;

    for(var i = 0; i < nameList.length;i++) { //corre cada categoria e grava num Array de Arrays
        CtgArray = [];
        if (counter < 7 && ArrayFilled[counter*100].class == nameList[i]) {
            counter++;
            ArrayAux = [];


            for (var j = 0; j < ArrayFilled.length; j++) { //procura nas imagens quais são de uma determinada categoria
                if (ArrayFilled[j].class == nameList[i]) {
                    ArrayAux.push(ArrayFilled[j]);
                }
            }

            for (var k = 0; k < 12; k++) { // corre as 12cores, faz sort das imagens e junta a um array 12 arrays de imagens (1 por cor)
                var copyArrayAux = ArrayAux.slice(0);
                colorSorter(copyArrayAux, k);
                CtgArray.push(copyArrayAux);
            }
        }
        FullArraySorted.push(CtgArray); //junta ao array final o array desta categoria
    }
    return FullArraySorted; //retorna um array final com todas as categorias e 12 arrays dentro de cada uma (um para cada cor) e as imagens dentro destes sorted
}


function colorSorter(ArrayFilled, color){ //organiza o array de objetos pela cor fornecida
    ArrayFilled.sort(function(a, b){
        return (b.count_Pixels[color] - a.count_Pixels[color]);
    });
}
