var PlaneX =100, PlaneY =100, speedY = 0, speedX = 0;
var img = "plane-right.png";
var direction = 'right';
var rightPress = false, leftPress = false;

setInterval(function(){

  $("#plane").css({top: PlaneY, left: PlaneX});

  PlaneY -= speedY;

  PlaneX += speedX;

  //$("#plane").css("transform", "scaleX(" + (direction == 'right' ? 1 : -1) + ")");


  if(leftPress == true){
    changeImage();
  }

  if(rightPress == true){
    changeImage1();
  }

  function changeImage(){
    if(document.getElementById("plane").src = "plane-right.png"){
      document.getElementById("plane").src = "plane-left.png";
    }else {
      document.getElementById("plane").src = "plane-right.png";
    }
  }

  function changeImage1(){
    if(document.getElementById("plane").src = "plane-left.png"){
      document.getElementById("plane").src = "plane-right.png";
    }else {
      document.getElementById("plane").src = "plane-left.png";
    }
  }

  speedY -= 1;

  if (PlaneY >750){
      PlaneY = 750;
      speedY = 0;
  }else if(PlaneY <0){
    PlaneY = 0;
    speedY = 0;
  }

  if (PlaneX < 0){
    PlaneX = 0;
    speedX = 0;
  }
  
  if (speedX != 0 && rightPress == false && leftPress == false){
    if(speedX < 0){
      speedX +=1;
      console.log("stoping")
    };
    if(speedX > 0){
      speedX -=1;
      console.log("stoping")
    };
  };

  speedX = 0;



}, 30);

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

var keys = [];

function keysPressed(e)
{

  keys[e.keyCode] = true;

  if(keys[38]){
    speedY += 10;
  }
  if(keys[39])
  {
    rightPress = true;

    speedX += 10;
    
  }
  if (keys[37])
  {
    leftPress = true;
    speedX =-10;
  }

  e.preventDefault();
}

function keysReleased(e)
{

  if(keys[39]){
    rightPress = false;
  }
  if(keys[37]){
    leftPress = false;
  }

  keys[e.keyCode] = false;

  

}
