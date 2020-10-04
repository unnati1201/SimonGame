var buttonColours = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern =[];
var level=0;
var start = false;

$(document).keypress(function(){
  if(!start){
    nextSequence();
    start = true;
  }
});

function nextSequence(){
  level++;
  $("h1").html("Level "+level);

  var n = Math.floor(Math.random()*4)
  var randomChosenColour = buttonColours[n];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$("button").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    while(gamePattern.length === userClickedPattern.length){
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    $("h1").html("Fail");
    $("body").addClass("fail");
    setTimeout(function(){
      $("body").removeClass("fail");
    },100);
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("h1").html("Game Over, Press any key to Restart");
    startOver();
  }
}
function startOver(){
  start = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
