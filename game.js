//button colors
var buttonColors = ["red","blue","green","yellow"];

//empty array for pushing random button colors
var gamePattern = []; 

//the user clicked button pattern
var userClickedPattern = [];

//initial game level
var level = 0;

//status of game
var started = false;

//calling nextSequence function to start game on keypress

$(document).on("touchstart keypress", function() {
    if (!started) {
            startGame();
    }  
  } );

  function startGame(){
    $("#level-title").text("Level " + level);
        nextSequence(); 
        started = true;  
  }
// Event handler for button clicks
$(".btn").click(function() {
    
    // Retrieve the id of the clicked button
    var userChosenColor = $(this).attr("id"); //gives the colour of button pressed
    
    // Add the clicked color to the userClickedPattern array
    userClickedPattern.push(userChosenColor);

    //calling all the functions
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

//checking the answer using function & if-else
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){

        console.log("success");
        if ( userClickedPattern.length === gamePattern.length){
    
            setTimeout( function(){
            nextSequence();
            }, 1000);
        } 
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game over, Press Any Key To Restart");

        setTimeout( function(){
        $("body").removeClass("game-over");
        }, 200);
        startOver();
    }  
    }

//the main function
function nextSequence(){

    //resetting user clicked pattern
    userClickedPattern = [];

    //increasing the level
    level++;
    $("#level-title").text("Level " + level);  

    //choosing random button
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    //pushing it to the empty array gamePattern
    gamePattern.push(randomChosenColor);

    //animating the button using jQuery
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

//the sound function
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//the pressing animation function
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout (function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

//resetting the level & restarting
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


$("#start-btn").click(function() {
    if (!started) {
        startGame();
    }
});

// Add event listener to reset button
$("#reset-btn").click(function() {
    if (started) {
        startOver();
        $("#level-title").text("Game is Reset, Press Any Key To Start");
    }
});