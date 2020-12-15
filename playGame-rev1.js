// Defining rounds var
let currentRounds = 0;
let maxRounds = 0;

// Defining scores
let playerScore = 0;
let computerScore = 0;

// Defining div for disabling input
const btnStart = document.getElementById('gameStart');
const inptRounds = document.getElementById('gameRounds');

// Defining player and computer score <span> element
const pViewScore = document.getElementById('player-score');
const cViewScore = document.getElementById('comp-score');

// Defining title-statustxt
const titleStatus = document.getElementById('title-statustxt');

// Defining player buttons
const playerRock = document.getElementById('playerSel-rock');
const playerPaper = document.getElementById('playerSel-paper') ;
const playerScissors = document.getElementById('playerSel-scissors');

// Defining computer buttons
const compRock = document.getElementById('compSel-rock');
const compPaper = document.getElementById('compSel-paper') ;
const compScissors = document.getElementById('compSel-scissors');

// Check if user click the button, then execute the mentioned function
playerRock.addEventListener("click", () => playRound('rock') );
playerPaper.addEventListener("click", () => playRound('paper'));
playerScissors.addEventListener("click", () => playRound('scissors'));    

// Execute disableButtons() and change titlestatus when page loaded
document.querySelector("body").onload = () => disableButtons(); titleStatus.innerHTML = `Hiroto's Rock Paper Scissors`;

// Disable the buttons
function disableButtons() {
    btnStart.disabled = false;
    inptRounds.disabled = false;
    
    playerRock.disabled = true;
    playerPaper.disabled = true;
    playerScissors.disabled = true
}

// Start game function, all desribed below
function startGame() {
    // Change rounds value
    currentRounds = 0;
    maxRounds = document.getElementById('gameRounds').value;

    // Disabling unused buttons
    btnStart.disabled = true;
    inptRounds.disabled = true;
    
    // Enabling the main buttons
    playerRock.disabled = false;
    playerPaper.disabled = false;
    playerScissors.disabled = false;

    // Change title status into current round number
    titleStatus.innerHTML = `Round ${currentRounds + 1}`;

    // Delete all message in textbox and console
    clearMsg();
    console.clear();

}

// Create a function called computerPlay to make a bot (literally)
function computerPlay() {
    // Create a switch condition with random number generator on it's expression
    switch (Math.floor(Math.random() * 3) + 1) {
    // IF play = 1 then return "Rock"
    case 1: {
        colorBtn("rock")
        return "rock"; 
    }
    // ELIF play = 2 then return "Paper"
    case 2: {
        colorBtn("paper")
        return "paper"; 
    }
    // ELIF play = 3 then return "Scissors"
    case 3: {
        colorBtn("scissors")
        return "scissors"; 
    }
    }
}

// Change color of the computerbtn
function colorBtn(choice) {
    // Declare the default color for the button
    let defaultColor =  "rgba(19, 1, 1, 0.3)";
    compRock.style.background = defaultColor;
    compPaper.style.background = defaultColor;
    compScissors.style.background = defaultColor;

    /// Use switch condition for changing the color of the buttons
    switch(choice) {
        case "rock": compRock.style.background = "RGB(255,206,206)"; break;
        case "paper": compPaper.style.background = "RGB(255,206,206)"; break;
        case "scissors": compScissors.style.background = "RGB(255,206,206)"; break;
        default: break;
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
    titleStatus.innerHTML = `Round ${currentRounds + 1}`;

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
    
    // Check if the game finished or not
    checkFinished(winner);
}

// Update message in textbox so we can play in browser directly instead in javascript console
function updateMsg(msg, param1){

    // Update score on pViewScore and cViewScore
    pViewScore.innerHTML = playerScore;
    cViewScore.innerHTML = computerScore;

    // Create new para element
    let para = document.createElement("p");

    // Change font weight if param1 value exist
    if (param1) {
        para.style.fontWeight = param1;
    }
    // Write the text itself
    let node = document.createTextNode(msg);
    para.appendChild(node);
    // Add it to gameMsg div
    let element = document.getElementById("gameMsg");
    element.appendChild(para);
    // Scroll Down
    updateScroll();
}

// Clear message in textbox if executed (thank you stackoverflow)
function clearMsg() {
    const myNode = document.getElementById("gameMsg");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
}

// For auto scrolling to bottom of the div (thank you stackoverflow)
function updateScroll(){
    let element = document.getElementById("gameMsg");
    element.scrollTop = element.scrollHeight;
}

// Simple function to ask if the game was finished
function checkFinished(callback) {
    if (currentRounds == maxRounds) {
        callback();
    }
}

// Announce the winner
function winner() {
    // Report the score in console
    console.log("Player scored ", playerScore, " point(s)");
    console.log("Computer score ", computerScore, " point(s)");

    // Report the score in div
    updateMsg(`Player scored ${playerScore} point(s)`);
    updateMsg(`Computer scored ${computerScore} point(s)`);

    // Determine the winner
    switch (calculateScore(playerScore, computerScore)) {
        // if player wins
        case "player": {
            console.log("Player Wins!");
            updateMsg(`Player wins the game!`, "bold")
            titleStatus.innerHTML = `Player Wins!`;
            break; 
        }
        // if computer wins
        case "computer": {
            console.log("Computer Wins!");
            updateMsg(`Computer wins the game!`, "bold")
            titleStatus.innerHTML = `Computer Wins!`;
            break; 
        }
        // if ties
        case "tie": {
            console.log("It's a Tie!");
            updateMsg(`It's a Tie!`, "bold")
            titleStatus.innerHTML = `It's a Tie!`;
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
