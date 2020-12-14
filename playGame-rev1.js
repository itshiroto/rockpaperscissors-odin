
// Defining rounds var
let currentRounds = 0;
let maxRounds = 5;

// Defining scores
let playerScore = 0;
let computerScore = 0;

// Defining player buttons
const playerRock = document.getElementById('playerSel-rock');
const playerPaper = document.getElementById('playerSel-paper') ;
const playerScissors = document.getElementById('playerSel-scissors');

// Check if user click the button, then execute the mentioned function
playerRock.addEventListener("click", () => playRound('rock') );
playerPaper.addEventListener("click", () => playRound('paper'));
playerScissors.addEventListener("click", () => playRound('scissors'));    


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

/* Create a function called playRound the function should take two parameters
   playerSelection and computerSelection
   and should return the results */

function playRound(playerSelection) {
    // Add round
    currentRounds++;
    console.log("Round ", currentRounds);

    // Declare a roundWinner var
    let roundWinner = "";

    // Play the bot
    let computerSelection = computerPlay();

    // Report played hands
    console.log("Player played: ", playerSelection);
    console.log("Computer played: ", computerSelection);

    switch(true) {
        // IF playerSelection and computerSelection have same value, then it's a tie
        case playerSelection === computerSelection: {
            console.log("Tie");
            break;
        }
        // player wins condition
        case ((playerSelection == "paper") && (computerSelection == "rock")) || ((playerSelection == "rock") && (computerSelection == "scissors")) || ((playerSelection == "scissors") && (computerSelection == "paper")): {
            roundWinner = "player";
            console.log("Player Wins");
            playerScore++;
            break;
        }
        // computer wins condition
        case ((playerSelection == "rock") && (computerSelection == "paper")) || ((playerSelection == "scissors") && (computerSelection == "rock")) || ((playerSelection == "paper") && (computerSelection ==  "scissors")): {
            roundWinner = "computer";
            console.log("Computer Wins");
            computerScore++;
            break;
        }
        // ELSE, i dont know
        default: console.log("unknown");
    }

    // Line break
    console.log("---")
    checkFinished();
}

function checkFinished() {
    if (currentRounds == maxRounds) {
        winner();
    }
}

function winner() {
    console.log("winner() function is executed!")
    // Report the score
    console.log("Player scored ", playerScore, " point(s)");
    console.log("Computer score ", computerScore, " point(s)");

    // Determine the winner
    switch (calculateScore(playerScore, computerScore)) {
        case "player": console.log("Player Wins!"); break;
        case "computer": console.log("Computer Wins!"); break;
        case "tie": console.log("It's a Tie!"); break;
        default: console.log("Something wrong"); break;
    }
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

// Create a function of the game itself
function game(rounds) {
    // Hide startpage div
    document.getElementsByClassName('startpage')[0].style.visibility = "hidden";
    // Create 2 variables to store score for each player

    
    // Create for loop including the playRound function
    for (i = 1; i <= rounds; i++) {
        // Print the round
        
        // Run playRound function
        // Prompt player for a input
        console.log("Player played: ", playerSelection);
        console.log("Computer played: ", computerSelection);
        
        
        // Add score using IF statement
        if (winner === "player") {
            console.log("Player Wins");
            playerScore++;
        } else if (winner === "computer") {
            console.log("Computer Wins");
            computerScore++;
        } else if (winner === "tie") {
            console.log("Tie");
        } else {
            console.log("Unknown value detected");
            i--;
        }
        // Add line break
        console.log("---")
    }

    /*
    MOVE THIS CODE TO winner() FUNCTION

    // Report the score
    console.log("Player scored ", playerScore, " point(s)");
    console.log("Computer score ", computerScore, " point(s)");

    // Determine the winner
    switch (calculateScore(playerScore, computerScore)) {
        case "player": console.log("Player Wins!"); break;
        case "computer": console.log("Computer Wins!"); break;
        case "tie": console.log("It's a Tie!"); break;
        default: console.log("Something wrong"); break;
    }
    */

}
