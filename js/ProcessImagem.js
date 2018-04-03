//Cores:
var vermelho = "#CC0000";
var laranja = "#FB940B";
var amarelo = "#FFFF00";
var verde = "#00CC00";
var verde_azulado = "#03C0C6";
var azul = "#0000FF";
var roxo = "#762CA7";
var rosa = "#FF98BF";
var branco = "#FFFFFF";
var cinzento = "#999999";
var preto = "#000000";
var castanho = "#885418";

var cores = [vermelho,laranja,amarelo,verde,verde_azulado,azul,roxo,rosa,branco,cinzento,preto,castanho];

function Hist12cores(imgdata){
    var num_pixel_Color = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var imgData = imgdata;
    var margem = 50;

    this.count_Pixels = function () {

        for (var i=0;i<imgData.data.length;i+=4) {

            if(imgData.data[i+0] <= 204+margem  && imgData.data[i+0] >= 204-margem  && imgData.data[i+1] <= 0+margem && imgData.data[i+2] <= 0+margem) num_pixel_Color[0] = num_pixel_Color[0]+1;
            // vermelho (valores --> RGB 204 0 0).

            if(imgData.data[i+0] <= 251+margem && imgData.data[i+0] >= 251-margem && imgData.data[i+1] <= 148+margem && imgData.data[i+1] >= 148-margem && imgData.data[i+2] <= 11+margem && imgData.data[i+2] >= 11-margem) num_pixel_Color[1] = num_pixel_Color[1]+1;
            // laranja (valores --> RGB 251 148 11).

            if(imgData.data[i+0] >= 255-margem && imgData.data[i+1] >= 255-margem && imgData.data[i+2] <= 0+margem) num_pixel_Color[2] = num_pixel_Color[2]+1;
            // amarelo (valores --> RGB 255 255 0).

            if(imgData.data[i+0] <= 0+margem && imgData.data[i+1] <= 255 && imgData.data[i+1] >= 204-margem && imgData.data[i+2] <= 0+margem) num_pixel_Color[3] = num_pixel_Color[3]+1;
            // verde (valores --> RGB 0 204 0).

            if(imgData.data[i+0] <= 3+margem && imgData.data[i+1] <= 192+margem && imgData.data[i+1] >= 192-margem && imgData.data[i+2] >= 198-margem && imgData.data[i+2] <= 255) num_pixel_Color[4] = num_pixel_Color[4]+1;
            // verde-azulado (valores --> RGB 3 192 198).

            if(imgData.data[i+0] <= 0+margem && imgData.data[i+1] <= 0+margem && imgData.data[i+2] >= 255-margem) num_pixel_Color[5] = num_pixel_Color[5]+1;
            // azul (valores --> RGB 0 0 255).

            if(imgData.data[i+0] <= 118+margem && imgData.data[i+0] >= 118-margem && imgData.data[i+1] <= 44+margem && imgData.data[i+1] >= 0 && imgData.data[i+2] <= 167+margem && imgData.data[i+2] >= 167-margem) num_pixel_Color[6] = num_pixel_Color[6]+1;
            // roxo (valores --> RGB 118 44 167).

            if(imgData.data[i+0] >= 255-margem && imgData.data[i+1] <= 152+margem && imgData.data[i+1] >= 152-margem && imgData.data[i+2] <= 255 && imgData.data[i+2] >= 191-margem) num_pixel_Color[7] = num_pixel_Color[7]+1;
            // rosa (valores --> RGB 255 152 191).

            if(imgData.data[i+0] >= 255-margem && imgData.data[i+1] >= 255-margem && imgData.data[i+2] >= 255-margem) num_pixel_Color[8] = num_pixel_Color[8]+1;
            // branco (valores --> RGB 255 255 255).

            if(imgData.data[i+0] <= 153+margem && imgData.data[i+0] >= 153-margem && imgData.data[i+1] <= 153+margem && imgData.data[i+1] >= 153-margem && imgData.data[i+2] <= 153+margem && imgData.data[i+2] >= 153-margem) num_pixel_Color[9] = num_pixel_Color[9]+1;
            // cinzento (valores --> RGB 153 153 153).

            if(imgData.data[i+0] <= 0+margem && imgData.data[i+1] <= 0+margem && imgData.data[i+2] <= 0+margem) num_pixel_Color[10] = num_pixel_Color[10]+1;
            // preto (valores --> RGB 0 0 0).

            if(imgData.data[i+0] <= 136+margem && imgData.data[i+0] >= 136-margem && imgData.data[i+1] <= 84+margem && imgData.data[i+1] >= 0 && imgData.data[i+2] <= 24+margem && imgData.data[i+2] >= 0) num_pixel_Color[11] = num_pixel_Color[11]+1;
            // castanho (valores --> RGB 136 84 24).
        }


    };


    this.get_num_pixel_Color = function () {
        return num_pixel_Color;
    };

    this.build_Color_Rect = function (canvas) {
        var x = 20;
        var y = 200;
        var w = 80;
        var h = 80;

        var x_num = 30;
        var y_num = 250;

        var cor_texto = preto;

        for(var i = 0; i<12; i++){
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = cores[i];
            ctx.fillRect(x, y, w, h);

            if (cores[i] == preto) cor_texto = branco;
            ctx.font = "30px Arial";
            ctx.fillStyle = cor_texto;
            ctx.fillText(num_pixel_Color[i],x_num,y_num);

            cor_texto = preto;
            x = x + 80;
            x_num = x_num + 80;
        }
    };
}