//Maka ireo element selon ny id an'le izy
function _$(elts){return document.getElementById(elts)}
//Manamboatra an'ilay pion
function _setPion(x,y,a,couleur){
  var canvas = _$("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = couleur;
  ctx.lineWidth = a;
  ctx.beginPath();
  ctx.arc(x,y,15,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

//Miteste ireo solution
function _solutionFanorona(positionPion){
  var vrai = 0;
  for (let i=0;i<3;i++){
    if (i==0){
        for (let j=0;j<3;j++){
            if (j == 0){
                if ((positionPion[j][j] == 1) && (positionPion[1][j] == 1) && positionPion[2][j] == 1){
                    vrai = 1;
                    break;
                }else if ((positionPion[j][j] == 1) && (positionPion[j][1] == 1) && positionPion[j][2] == 1){
                    vrai = 1;
                    break;
                }else if ((positionPion[j][j] == 1) && (positionPion[1][1] == 1) && positionPion[2][2] == 1){
                    vrai = 1;
                    break;
                }
            }else if (j == 1){
                if ((positionPion[0][j] == 1) && (positionPion[1][j] == 1) && positionPion[2][j] == 1){
                    vrai = 1;
                    break;
                }
            }else if ( j == 2){
                if ((positionPion[0][j] == 1) && (positionPion[1][j] == 1) && positionPion[2][j] == 1){
                    vrai = 1;
                    break;
                }else if ((positionPion[0][j] == 1) && (positionPion[1][1] == 1) && positionPion[j][0] == 1){
                    vrai = 1;
                    break;
                }
            }
        }
    }else{
        if ((positionPion[i][0] == 1) && (positionPion[i][1] == 1) && positionPion[i][2] == 1){
            vrai = 1;
            break;
        }
    } 
  }
  return vrai;
}

//Miteste ny position
function _positonClic(x,y,i,j,pos){
  if ((x<pos[i][j].x + 20)&&
      (x>pos[i][j].x - 20)&&
      (y<pos[i][j].y + 20)&&
      (y>pos[i][j].y - 20)){//Miteste hoe eo aminah toerana azo ametrahana marina ve no ametrahan'ilay olona ny pion any
      return true;
  }else{
      return false;
  }
}

function _trace(x,y,w,h,posA,posB){//Fonction manao traçagen'ilay plateau
  var canvas = _$("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(x,y,w,h);
  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.lineTo(500,100);
  ctx.lineTo(500,500);
  ctx.lineTo(100,500);
  ctx.lineTo(100,97.8);
  ctx.moveTo(100,100);
  ctx.lineTo(500,500);
  ctx.moveTo(500,100);
  ctx.lineTo(100,500);
  ctx.moveTo(300,100);
  ctx.lineTo(300,500);
  ctx.moveTo(100,300);
  ctx.lineTo(500,300);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
  for (let i=0; i<3; i++){//Mitady ny toerana ametrahan'ilay olona ny pion-any
    for (let j=0; j<3; j++){
      if (posA[i][j] == 1){
        _setPion(posXY[i][j].x,posXY[i][j].y,0.1,"red");
      }
      if (posB[i][j] == 1){
        _setPion(posXY[i][j].x,posXY[i][j].y,0.1,"blue");
      }
    }
  }
}

//Mi-enregistre ireo position an'ireo pion rehetra
//Ho an'ny A
let posA = [];
    posA[0] = [0,0,0];
    posA[1] = [0,0,0];
    posA[2] = [0,0,0];
//Ho an'ny B
let posB = [];
    posB[0] = [0,0,0];
    posB[1] = [0,0,0];
    posB[2] = [0,0,0];

//Manao ny table de jeu
_trace(0,0,0,0,posA,posB);

//Mijery hoe clic voalohany sa clic faharoa no misy zao
let clic = 1;

//Variable mienregistre position
let k = 0;
let l = 0;

//Variable fandresena
//Mijery oe iza amin'i manga sy mena no mpandresy
let mandresyA = 0;
let mandresyB = 0;

/*Initialisena le variable pos izay variable mitazona
  ny position anle clicn'le souris teo amle canvas*/

let pos = {a:0,b:0};//Clic voalohany(Fiantombohana)
let pos_ar = {a:0,b:0};//Clic faharoa(Fihafarana)

//Manisa hoe an'iza na an'iza ny tour
let tour = 1;//0 rehefa manga ary 1 rehefa mena

//Mijery ny position disponible azo ametrahana na azo amindrana rehetra
let dispo = [];
    dispo[0] = [1,1,1];
    dispo[1] = [1,1,1];
    dispo[2] = [1,1,1];

//Coordonnée possible an'ireo pion tsirairay avy miaraka amin'ny index an'izy ireo
let posXY = [];
    posXY[0] = [{x:100,y:100,c:0},{x:300,y:100,c:1},{x:500,y:100,c:2}];
    posXY[1] = [{x:100,y:300,c:3},{x:300,y:300,c:4},{x:500,y:300,c:5}];
    posXY[2] = [{x:100,y:500,c:6},{x:300,y:500,c:7},{x:500,y:500,c:8}];
//Variable mitazona an'le hoe aiza avy no misy chemin possible
let chemin = [];
    chemin[0] = [0,1,0,1,1,0,0,0,0];
    chemin[1] = [1,0,1,0,1,0,0,0,0];
    chemin[2] = [0,1,0,0,1,1,0,0,0];
    chemin[3] = [1,0,0,0,1,0,1,0,0];
    chemin[4] = [1,1,1,1,0,1,1,1,1];
    chemin[5] = [0,0,1,0,1,0,0,0,1];
    chemin[6] = [0,0,0,1,1,0,0,1,0];
    chemin[7] = [0,0,0,0,1,0,1,0,1];
    chemin[8] = [0,0,0,0,1,1,0,1,0];
let isa = 0;

//Mi-fermé an'ilay popUp
function popUpCroix(){
  return img_close.style.visibility = "visible";
}

//popUp Mandresy mena
function popUpMena(){
  popUpCroix();
  return soratra_mena.style.visibility = "visible";
}

//popUp MAndresy manga
function popUpManga(){
  popUpCroix();
  return soratra_manga.style.visibility = "visible";
}

//Instruction rehefa tsindrina ny croix kely etsy ambony
function popUpClose(){
  img_close.style.visibility = "hidden";
  soratra_manga.style.visibility = "hidden";
  soratra_mena.style.visibility = "hidden";
}

//Gestion famindrana ireo pion
function _mamindra(e,a){
  if (clic == 1){
    pos.a = e.offsetX;
    pos.b = e.offsetY;
    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            if (_positonClic(pos.a,pos.b,i,j,posXY)){
              if (a == 0){
                if (posA[i][j] == 1){
                  clic = 0;
                  k = i;
                  l = j;
                }else if(posB[i][j] == 1){
                  alert('Tsy anjaranao zao ry manga');
                }else{
                  alert('Tsy misy ninoninona eo');
                }
              }else{
                if (posB[i][j] == 1){
                  clic = 0;
                  k = i;
                  l = j;
                }else if(posA[i][j] == 1){
                  alert('Tsy anjaranao zao ry mena');
                }else{
                  alert('Tsy misy ninoninona eo');
                }
              }
            }
        }
    }
  }else if (clic == 0){
    pos_ar.a = e.offsetX;
    pos_ar.b = e.offsetY;
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        if (_positonClic(pos_ar.a,pos_ar.b,i,j,posXY)){ 
          if (dispo[i][j] == 1){
            clic = 1;
            if (chemin[posXY[i][j].c][posXY[k][l].c] == 1){
              //alert('Mety ametrahana eo');
              dispo[i][j] = 0;
              dispo[k][l] = 1;
              if (a == 0){//Mena no mamindra
                posA[i][j] = 1;
                posA[k][l] = 0;
              }else if (a == 1){//Manga no mamindra
                posB[i][j] = 1;
                posB[k][l] = 0;
              }  
              _trace(0,0,600,600,posA,posB);
              tour = a;
            }else{
              alert('Tsy misy lalana eo');
            }
          }else{
            clic = 1;
            alert('Tsy mety ametrahana eo');
          }
        }
      }
    }
  }
}
//Teste solution
function _testSolution(){
  if (_solutionFanorona(posA) == 1){
    popUpMena();
    mandresyA = 1;
  }else if (_solutionFanorona(posB) == 1){
    popUpManga();
    mandresyB = 1;
  }
}
var canvas = _$("myCanvas");
canvas.addEventListener('click',(e)=>{
  //Mametraka ny pion-any tsirairay avy ny mpilalao roa tonta
  if (isa<=5){//Manisa hoe tafapetraka avokoa ve ny pion rehetra
    pos.a = e.offsetX;
    pos.b = e.offsetY;
    for (let i=0; i<3; i++){//Mitady ny toerana ametrahan'ilay olona ny pion-any
      for (let j=0; j<3; j++){
        if (_positonClic(pos.a,pos.b,i,j,posXY)){//Miteste hoe eo aminah toerana azo ametrahana marina ve no clicken'le olona
          if (dispo[i][j] == 1){//Miteste hoe vide ve ilay toerana ametrahana an'ilay izy
            if (tour == 1){
              posA[i][j] = 1;
              tour--;
            }else{
              posB[i][j] = 1;
              tour++;
            }
            console.log('position'+posA[i][j]);
            _trace(0,0,600,600,posA,posB);
            dispo[i][j] = 0;
            isa++;
          }else{//Raha tsy disponible intsony ilay izy
            alert('Tsy afaka ametrahana intsony eo');
          }
        }
      }
    }
    if (isa == 6){//Rehefa tafapetraka avokoa ny pion rehetra dia tsy maintsy fantarina hoe sao dia efa misy mpandresy sa tsia
      _testSolution();
      isa = 7;
    }
  }else if ((isa == 7)&&(mandresyA == 0)&&(mandresyB == 0)){//Raha ohatra oe tsy mbola misy mpandresy mihintsy
    if (tour == 1){
      _mamindra(e,0);
    }else if (tour == 0){
      _mamindra(e,1);
    }
    _testSolution();//Isaky ny avy manisaka dia mijery hoe misy mpandresy ve sa tsia
  }
})