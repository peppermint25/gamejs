$(document).ready(function(){
  var PlaneX =300, PlaneY =650, speedY = 0, speedX = 0, minPlaneY = ($("#airport").height()-100) , maxPlaneX = ($("#airport").width()-($("#plane").width())+20);
  var img = "plane-right.png";
  var rightPress = false, leftPress = false;
  var ring_count = 0, rings = 0;
  var plane_length = $("#plane").width(), plane_height = $("#plane").height();

  var map = [
    ".$..#.#..........$..",
    "............$.....#.",
    "...$....$.........#.",
    "..#..........$......",
    "......$........#..$.",
    "..$...#..#...#......",
    "................$...",
    "...................#",
  ];

  $(function () {
    for (y = 0; y<map.length; y++) {
      for (x = 0; x<map[y].length; x++) {
        var char = map[y][x];
        if (char == "#")
          drawBlock(x,y);
        if (char == "$"){
          drawRing(x,y);
          rings++;
        }
      }
    }


  });

  function drawBlock(x,y){
    var el = $("<img class='enemy' src='enemy.png'>");
    $("body").append(el);
    el.css({top: y*100, left:x*50})
  }

  function drawRing(x,y){
    var el = $("<img class='ring' src='ring.gif'>");
    $("body").append(el);
    el.css({top: y*100, left:x*50})
  }

  setInterval(function(){
    $("#plane").css({top: PlaneY, left: PlaneX});

    PlaneY -= speedY;

    PlaneX += speedX;

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
      
    PlaneY = Math.max(0, PlaneY);

    PlaneY = Math.min(minPlaneY, PlaneY);

    PlaneX = Math.max(0, PlaneX);

    PlaneX = Math.min(maxPlaneX, PlaneX);

    if (PlaneY >= minPlaneY){
         speedY += 1.5;
    }else if(PlaneY <= 0){
      speedY = -3;
    }
    if (PlaneX <= 0){
      speedX = 3;
      changeImage1();
    }else if(PlaneX >= maxPlaneX){
      speedX = -3;
      changeImage();
    }
      
    if(speedX < 0 & PlaneY == minPlaneY){
      speedX +=0.75;
    };
    if(speedX > 0 & PlaneY == minPlaneY){
      speedX -=0.75;
    };

    speedX = Math.min(speedX, 30);

    speedX = Math.max(speedX, -30);

    $('.ring').each(function() {
      var x = $(this).offset().left;
      var y = $(this).offset().top;

      if(PlaneX > x - plane_length
        && PlaneX  < x + 60
        && PlaneY > y - plane_height
        && PlaneY < y + 60){
          $(this).remove();
          ring_count++;
          $("#ringcount").text(ring_count);
          console.log(ring_count);
          if(ring_count == rings){
            gamecomplete();
          }
        }
    })
    

  }, 30);

  window.addEventListener("keydown", keysPressed, false);
  window.addEventListener("keyup", keysReleased, false);

function gamecomplete(){
  var el = $("<div class='modal fade' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog'</div>");
    $("body").append(el);
}


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
      speedX += 6;
    }
    if (keys[37])
    {
      leftPress = true;
      speedX -= 6;
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
});