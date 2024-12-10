//Initialized variables
let score = 0;
let is_game_running = false; 

//Declared variables
let end;
let start;
let left_side;
let boundaries;
let status_display; 

document.addEventListener("DOMContentLoaded", loadPage);

function displayMessage(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
}

function gameOver(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;
        displayMessage("Game Over!");
        is_game_running = false;
    }
}

function startGame(){
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
    start.addEventListener("mouseleave", function (event) {
        left_side = start.getBoundingClientRect()
        if(event.clientX > left_side.right) {
            is_game_running = true;
            end.style.visibility = "visible";
            displayMessage("");
        } else if (event.clientX < left_side.left) {
            displayMessage("You have to exit the Start box from the right side to start the game.");
            end.style.visibility = "hidden";
            is_game_running = false;
        }
            
    });
}

function endGame(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayMessage("You Won!");
        is_game_running = false;
    }
}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display =  document.getElementById("status");

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
}


