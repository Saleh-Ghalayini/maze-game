//Initialized variables
let score = 0;
let coins_collected = 0;
let is_game_running = false; 

//Declared variables
let end;
let start;
let reset;
let timer;
let coins;
let left_side;
let boundaries;
let status_display;
let countdownInterval; 

document.addEventListener("DOMContentLoaded", loadPage);

function displayMessage(message){
    if(message != "")
        status_display.innerHTML = message ;
}

function gameOver(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0)
            score = score - 1;
        displayMessage("Game Over!" + "<br/>" + "Your Score is: " + score + ", and " + coins_collected + " coins collected.");
        clearInterval(countdownInterval);
        is_game_running = false;
    }
}

function countDown(duration) {
    clearInterval(countdownInterval);
    timer.innerHTML = "Time left: " + duration + "s";
    timer.style.color = "black";

    countdownInterval = setInterval(() => {
      duration--;
      timer.innerHTML = "Time left: " + duration + "s";
      if (duration <= 0) {
        clearInterval(countdownInterval);
        timer.innerHTML = "Times up!";
        timer.style.color = "rgb(243, 159, 159)";
        gameOver();
      }
    }, 1000);
  }

function startGame(){
    if (!is_game_running) {
        for (let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "#eeeeee";
        end.style.visibility = "visible";
        displayMessage("Game started!");
        is_game_running = true;
        countDown(10);
    }
}

function endGame(){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        displayMessage("You Won!" + "<br/>" + "Your Score is: " + score + ", and " + coins_collected + " coins collected.");
        clearInterval(countdownInterval);
        is_game_running = false;
    }
}

function collectCoin(event) {
    if (is_game_running) {
        coins_collected++;
        event.target.style.display = "none"; // Hide the clicked coin
        //document.getElementById("coin-counter").innerText = coins_collected;
    }
}

function resetGame() {

    displayMessage(coins_collected + " coins collected and your score is: " + score);

    setTimeout(() => {

        score = 0;
        coins_collected = 0;

        clearInterval(countdownInterval);
        timer.innerHTML = "Time left: 10s";
        is_game_running = false;

        for (let i = 0; i < boundaries.length; i++) 
            boundaries[i].style.backgroundColor = "";

        end.style.visibility = "hidden";

        for (let i = 0; i < coins.length; i++)
            coins[i].style.display = "flex";

        displayMessage("Game reset. Ready to start again!");
    }, 2000);

}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    reset = document.getElementById("reset");
    timer = document.getElementById("timer");
    coins = document.getElementsByClassName("coins");
    status_display =  document.getElementById("status");
    boundaries = document.getElementsByClassName("boundary");

    end.addEventListener("mouseover", endGame);
    reset.addEventListener("click", resetGame);

    start.addEventListener("mouseleave", function (event) {
        left_side = start.getBoundingClientRect();
        if (event.clientX > left_side.right) {
            startGame();
        } else if (event.clientX < left_side.left) {
            displayMessage("You have to exit the Start box from the right side to start the game.");
            end.style.visibility = "hidden";
            is_game_running = false;
        }
    });
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }

    for (let i = 0; i < coins.length; i++) {
        coins[i].addEventListener("click", collectCoin);
    }

}
