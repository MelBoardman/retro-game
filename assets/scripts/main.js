//===========RETRO GAME JS SCRIPT====================//
// Game panel is always OFF when page is initially loaded.
let on = false;
// Strict is always OFF when page is initially loaded.
let strict = false;
// The computer always plays first 
let compTurn = true;
// The score always starts as 0 (maybe add compSequence.length)
let score = 0;
// The last score is always displayed when the page is initally loaded (More work needed here?)
let highLast = "last";
let highScore = 0;
let lastScore = 0;

// The Game is not started when the page loads
let start = false;

//computer always goes first
let playerTurn = false;

let playerCorrect = false;

//Array to hold random sequence
let sequence = [];
//Array to hold computer sequence (1 added from random sequence each turn)
let compSequence = [];
//Array to hold player sequence ()
let playerSequence = [];

let j =0;
let k=0;
let compPlayInterval;
let round = 0;
let loopCount = 0;

// scoreDisplay is the central display in the display window
const scoreDisplay = document.querySelector("#score-display");
// strictDisplay is top left in the display window
const strictDisplay = document.querySelector("#strict-display");
// High / Last is displayed in the top right of the display window
const highLastDisplay = document.querySelector("#high-last-display");
// location of the On/Off button
const onOffButton = document.querySelector("#on-off");
// location of the Strict button
const strictButton = document.querySelector("#strict");
// location of the HighLast button
const highLastButton = document.querySelector("#high-last");
// location of Start/Reset Button
const startResetButton = document.querySelector("#start-reset");
// location of Blue Button
const blueButton = document.querySelector("#blue");
// location of Yellow Button
const yellowButton = document.querySelector("#yellow");
// location of the red button
const redButton = document.querySelector("#red");
// location of the green button
const greenButton = document.querySelector("#green");



// On/Off button status - sets variable and changes text in the display window
onOffButton.addEventListener('click', (event) => {
    if (on === false) {
        console.log("DEBUG: ON"); //debug
        on = true;
        scoreDisplay.innerHTML = "PRESS START";
        // Add further functions later
    } else {
        console.log("DEBUG: OFF"); //debug
        on = false;
        scoreDisplay.innerHTML = "OFF";
        // Add further functions later
    }
});

// Strict ON or OFF - sets variable and changes text in display window
strictButton.addEventListener('click', (event) => {
    if (on === true && start === false) {
        if (strict === false) {
            strict = true;
            strictDisplay.innerHTML = "STRICT: ON";
        } else {
            strict = false;
            strictDisplay.innerHTML = "STRICT: OFF";
        }
    }

});

//High / last button  - toggles between the High Score and the last Score on the Display
highLastButton.addEventListener('click', (event) => {
    if (on === true) {
        if (highLast === "last") {
            highLast = "high";
            highLastDisplay.innerHTML = "HIGH: " + highScore;
        } else {
            highLast = "last";
            highLastDisplay.innerHTML = "LAST: " + lastScore;
        }
    }
});

//start/reset Button functionality
startResetButton.addEventListener('click', (event) => {
    if (on === true) {
        if (start === false) {
            console.log("DEBUG: start game"); //debug
            start = true;
            startResetButton.innerHTML = "RESET";
            scoreDisplay.innerHTML = "SCORE: " + score;
            playGame();
        } else {
            console.log("DEBUG: reset game"); //debug
            start = false;
            startResetButton.innerHTML = "START";
            scoreDisplay.innerHTML = "PRESS START";
            resetGame();
        }
    }
});




//-----FUNCTIONS-----------//
function playGame() {
    score = 0;
    playerTurn = false;
    playerSequence = []; //to hold the players input - cleared each turn
    compSequence = []; //to hold the computer input - incremented each turn
    sequence = []; // randomly generated
    j =0;
    console.log("DEBUG 1: playGame Function"); //debug
    // Populate random sequence with numbers between 1 and 4.
    // loop currently set to 8 but can use skill level when this has been implemented
    for (i = 0; i < 8; i++) {
        //math.random returns number between 0 and 1. 
        //I have multiplied this by 4 and then use math.floor to round it down to the nearest whole number.
        //I have then added 1. This ensures that the number is always between 1 and 4
        sequence.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log("DEBUG: play game function: sequence = " + sequence); //for debug
    //computers turn first
    round = 1; // round 1 play first part of sequence 
    compPlayInterval = setInterval(compPlay,100); //play sequence for the player to copy and then set playerTurn = true
};

//Computers turn
function compPlay() {
    setTimeout(() => {             
        coloursNotActive();
    }, 500);
    loopCount = loopCount+1
    console.log("DEBUG: compPlay Function called" +loopCount); //debug
    if (j===round){
        j=0;
        playerTurn= true;
        console.log("DEBUG: round = " +round);
        console.log("DEBUG: end compPlay - players turn");
        clearInterval(compPlayInterval);
    }else if (sequence[j] === 1){
        blueActive();
        setTimeout(() => {             
            coloursNotActive();
        }, 500);
    }else if (sequence[j] === 2){
        yellowActive();
        setTimeout(() => {             
            coloursNotActive();
        }, 500);
    }else if (sequence[j] === 3){
        redActive();
        setTimeout(() => {             
            coloursNotActive();
        }, 500);
    }else if (sequence[j] === 4){
        greenActive();
        setTimeout(() => {             
            coloursNotActive();
        }, 500);
    }
    j++;
};

//Blue button functionality - only listening during players turn
blueButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        console.log("DEBUG: player turn Blue pressed"); //debug
        blueActive();
        playerSequence.push([1]);
        setTimeout(() => { 
            coloursNotActive();
        }, 500);
        check();
    }
});
//Yellow button functionality - only listening during players turn
yellowButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        console.log("DEBUG: player turn Yellow pressed"); //debug
        yellowActive();
        playerSequence.push([2]);
        setTimeout(() => { 
            coloursNotActive();
        }, 500);
        check();
    }
});
//Red button functionality - only listening during players turn
redButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        console.log("DEBUG: player turn Red pressed"); //debug
        redActive();
        setTimeout
        playerSequence.push([3]);
        setTimeout(() => { 
            coloursNotActive();
        }, 500);
        check();
    }
});
//Green button functionality - only listening during players turn
greenButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        console.log("DEBUG: player turn Green pressed"); //debug
        greenActive();
        playerSequence.push([4]);
        setTimeout(() => { 
            coloursNotActive();
        }, 500);
        check();
    }
});



//Check Function is called from the coloured button eventlisteners
//this checks the players input against the computer sequence.
function check() {
    console.log("check function");
    console.log("DEBUG: playerSequence = " + playerSequence);
    for (i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] != sequence[i]) {
            console.log("DEBUG: Check function: player sequence not equal to sequence");
            playerCorrect = false;
        } else {
            playerCorrect = true;
        }
          console.log("DEBUG: Check function: playerCorrect = " + playerCorrect);
    }
    

    if (playerCorrect === true && sequence.length === playerSequence.length) {
        score = score+1;
        console.log("player wins!");
        winning();
    } else if (playerCorrect === true && playerSequence.length === round) {
        console.log("player correct comp to play!");
        playerTurn = false; //correct sequence comp turn
        score = score + 1;
        scoreDisplay.innerHTML = "SCORE: " + score;
        playerSequence = [];//empty players sequence
        round = round +1;
        j=0;//added here as appeared to be starting from 1 in compPlay
        setTimeout(() => { 
            coloursNotActive();
        }, 500);
        compPlayInterval = setInterval(compPlay,1000);
    } else if (playerCorrect ===  true){
        playerTurn = true; //continue listening for the rest of the sequence
    } else if (strict === false) {
        console.log("strict active player gets second chance");
        playerSequence = [];//empty players sequence
        strict = true;// life used up
        playerTurn = false;
        setTimeout(() => { 
            coloursNotActive();
        }, 500);
        compPlayInterval = setInterval(compPlay,1000);compPlay();
    } else {
        console.log("game over");
        gameOver();
    }
}
//=========COLOUR ACTIVATION FUNCTIONS==============//

//highlight quadrant and play note .. Called during the computers turn and the players turn
function blueActive() {
    console.log("blueActive function");
    //Change backgroundcolor
    blueButton.style.backgroundColor = "#0040ff";
    //*****add audio****
}

function yellowActive() {
    console.log("yellowActive function");
    //Change backgroundcolor
    yellowButton.style.backgroundColor = "#ffff00";
    //*****add audio****
}

function redActive() {
    console.log("redActive function");
    //Change backgroundcolor
    redButton.style.backgroundColor = "#ff1a1a";
    //*****add audio****
}

function greenActive() {
    console.log("greenActive function");
    //change background color
    greenButton.style.backgroundColor = "#009900";
    //*****add audio****
}

//return colors to deactivated state
function coloursNotActive() {
        console.log("DEBUG: Deactivate colours");
        blueButton.style.backgroundColor = "#0040ff88";
        yellowButton.style.backgroundColor = "#ffff0088";
        redButton.style.backgroundColor = "#ff1a1a88";
        greenButton.style.backgroundColor = "#00990088";
}