$(document).ready(function(){
  var  PlaneY =650, speedY = 0, speedX = 0, minPlaneY = ($("#airport").height()-100) , maxPlaneX = ($("#airport").width()-($("#plane").width())+20);
  // var img = "plane-right.png";
  var rightPress = false, leftPress = false;
  var ring_count = 0, rings = 0;
  let start, end, time, keypress;
  // var margin;

  var margin = parseFloat($("#airport").css("margin-left"));
  console.log(margin, "aaaa");
  
  window.onresize = function(){ location.reload(); }

  // setInterval(function() {
  //   var margin = parseFloat($("#airport").css("margin"))
  //   console.log(margin, "aaaa");

  // }, 300)

  
  // var mapwidth = $("#airport").width();
  var plane_length = $("#plane").width(), plane_height = $("#plane").height();
  var PlaneX = 300 + margin;
  var map = [
    ".$..#.#..........$.#",
    "............$.....#.",
    "...$....$.........#.",
    "..#..........$......",
    "......$........#..$.",
    "..$...#..#...#......",
    "................$...",
    "#..................#",
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
    var el = $("<div class='enemy-area'><img class='enemy' src='enemy.png'></div>");
    $("#airport").append(el); 
    console.log(margin);
    el.css({top: y*100 , left: margin + x*50})
  }

  function drawRing(x,y){
    var el = $("<img class='ring' src='ring.gif'>");
    $("#airport").append(el);
    el.css({top: y*100, left: margin + x*50})
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

    PlaneX = Math.max(margin, PlaneX);

    PlaneX = Math.min(maxPlaneX + margin, PlaneX);

    if (PlaneY >= minPlaneY){
         speedY += 1.5;
    }else if(PlaneY <= 0){
      speedY = -3;
    }
    if (PlaneX <= margin){
      speedX = 3;
      changeImage1();
    }else if(PlaneX >= maxPlaneX + margin){
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
          if(ring_count == rings){
            speedX = 0;
            speedY = 0;
            gamewin();
          }
        }
    })

    $('.enemy-area').each(function() {
      var x = $(this).offset().left;
      var y = $(this).offset().top;
  
      if(PlaneX > x - plane_length
        && PlaneX  < x + 60
        && PlaneY > y - plane_height
        && PlaneY < y + 43){
          speedX = 0;
          speedY= 0;
          var fail = $("<img class = 'fail' src ='explosion.gif'>");
          if($(".fail").length == 0){
            console.log()
            $(this).append(fail);
          }
          gamelose();
        }
    })
    
  }, 30);

function gamewin(){
  console.log("game complete")
  var el = $("<p>You have completed the game</p>");
  var win = $("<img class='game-win' src='win.gif'>");
    $("body").append(el);
    $(".airport").append(win);
}

function gamelose(){

}

// function startTime(){
//   start = new Date();
// }

// function endTime(){
//   end = new Date();
//   time = end - start;
//   return time;
// }


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