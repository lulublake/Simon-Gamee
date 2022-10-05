var userClickedPattern = [];

var gamePattern =[];

var buttonColours = ["red", "blue", "green", "yellow"];

var startGame = false;
var level = 0;

$(document).keydown(function () {
    if(!startGame){
        $("h1").text("Level " + level);
        nextSequence();
        startGame = true;
    }
    
});

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#"+ currentColour).addClass("pressed");

    setTimeout( function () {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }else {
        var wrong = new Audio ("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout (function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").html("Game Over! <br> Press Any Key To Restart!");
        startOver();
    }  
}

function startOver(){
    level = 0;
    gamePattern.length = 0;
    startGame = false; 
}