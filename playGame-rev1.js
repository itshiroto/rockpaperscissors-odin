// Defining rounds var
let currentRounds = 0;
let maxRounds = 0;

// Defining scores
let playerScore = 0;
let computerScore = 0;

// Defining div for disabling input
const btnStart = document.getElementById('gameStart');
const inptRounds = document.getElementById('gameRounds');


// Defining player buttons
const playerRock = document.getElementById('playerSel-rock');
const playerPaper = document.getElementById('playerSel-paper') ;
const playerScissors = document.getElementById('playerSel-scissors');

// Check if user click the button, then execute the mentioned function
playerRock.addEventListener("click", () => playRound('rock') );
playerPaper.addEventListener("click", () => playRound('paper'));
playerScissors.addEventListener("click", () => playRound('scissors'));    

document.querySelector("body").onload = () => disableButtons();

function disableButtons() {
    btnStart.disabled = false;
    inptRounds.disabled = false;
    
    playerRock.disabled = true;
    playerPaper.disabled = true;
    playerScissors.disabled = true
}

function startGame() {
    maxRounds = document.getElementById('gameRounds').value;
    btnStart.disabled = true;
    inptRounds.disabled = true;
    
    playerRock.disabled = false;
    playerPaper.disabled = false;
    playerScissors.disabled = false;

    clearMsg();
    console.clear();

}
// Create a function called computerPlay to make a bot (literally)
function computerPlay() {
    // Create a switch condition with random number generator on it's expression
    switch (Math.floor(Math.random() * 3) + 1) {
    // IF play = 1 then return "Rock"
    case 1: return "rock";
    // ELIF play = 2 then return "Paper"
    case 2: return "paper";
    // ELIF play = 3 then return "Scissors"
    case 3: return "scissors";
    }
}

/* Create a function called playRound 
   the function should take a parameters called playerSelection 
   and should return the results */

function playRound(playerSelection) {
    // Add round
    currentRounds++;
    console.log("Round ", currentRounds);
    updateMsg(`Round ${currentRounds}`);

    // Play the bot
    let computerSelection = computerPlay();

    // Report played hands
    console.log("Player played: ", playerSelection);
    console.log("Computer played: ", computerSelection);

    // Write into gameMsg
    updateMsg(`Player played: ${playerSelection}`);
    updateMsg(`Computer played: ${computerSelection}`);

    switch(true) {
        // IF playerSelection and computerSelection have same value, then it's a tie
        case playerSelection === computerSelection: {
            console.log("Tie");
            updateMsg("Tie", "bold");
            break;
        }
        // player wins condition
        case ((playerSelection == "paper") && (computerSelection == "rock")) || ((playerSelection == "rock") && (computerSelection == "scissors")) || ((playerSelection == "scissors") && (computerSelection == "paper")): {
            console.log("Player Wins!");
            updateMsg("Player Wins!", "bold")
            playerScore++;
            break;
        }
        // computer wins condition
        case ((playerSelection == "rock") && (computerSelection == "paper")) || ((playerSelection == "scissors") && (computerSelection == "rock")) || ((playerSelection == "paper") && (computerSelection ==  "scissors")): {
            console.log("Computer Wins");
            updateMsg("Computer Wins!", "bold")
            computerScore++;
            break;
        }
        // ELSE, i dont know
        default: console.log("unknown");
    }

    // Line break
    console.log("---")
    updateMsg("---")
    checkFinished();
}

// Update message in Textbox so we can play in HTML instead of console.log
function updateMsg(msg, param1){
    let para = document.createElement("p");
    if (param1) {
        para.style.fontWeight = param1;
    }
    let node = document.createTextNode(msg);
    para.appendChild(node);

    let element = document.getElementById("gameMsg");
    element.appendChild(para);
    updateScroll();
}

function clearMsg() {
    const myNode = document.getElementById("gameMsg");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
}

// For auto scrolling to bottom of the div
function updateScroll(){
    let element = document.getElementById("gameMsg");
    element.scrollTop = element.scrollHeight;
}

function checkFinished() {
    if (currentRounds == maxRounds) {
        winner();
    }
}

// Announce the winner
function winner() {
    console.log("winner() function is executed!")

    // Report the score in console
    console.log("Player scored ", playerScore, " point(s)");
    console.log("Computer score ", computerScore, " point(s)");

    // Report the score in div
    updateMsg(`Player scored ${playerScore} point(s)`);
    updateMsg(`Computer scored ${computerScore} point(s)`);

    // Determine the winner
    switch (calculateScore(playerScore, computerScore)) {
        case "player": {
            console.log("Player Wins!");
            updateMsg(`Player Wins!`, "bold")
            break; 
        }
        case "computer": {
            console.log("Computer Wins!");
            updateMsg(`Computer Wins!`, "bold")
            break; 
        }
        case "tie": {
            console.log("It's a Tie!");
            updateMsg(`It's a Tie!`, "bold")
            break; 
        }
        default: console.log("Something wrong"); break;
    }

    // Disable game buttons
    disableButtons()
}

// Create function to calculate score based on player and computer scores
function calculateScore(playerScore, computerScore) {
    //IF player scores higher than computer, THEN player wins
    if (playerScore > computerScore) {
        return "player";
    
    //ELSE IF computer scores higher than player, THEN compuyter wins
    } else if (playerScore < computerScore) {
        return "computer";
    
    // ELSE IF both scores tie, THEN it's a tie
    } else if (playerScore === computerScore) {
        return "tie";
    // ELSE if something happened out of condition, THEN return unknown
    } else {
        return "unknown";
    }
}
