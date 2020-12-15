/* THIS IS THE OLD CODE THAT I USE TO CREATE THIS GAME
   This code only can be executed and played on Javascript Console.
   I highly suggest you to use the rev1 one. */



// Defining player buttons
const playerRock = document.querySelector("#playerSel-rock");
const playerPaper = document.querySelector('#playerSel-paper') ;
const playerScissors = document.querySelector('#playerSel-scissors');

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

function playRound(playerSelection, computerSelection) {
    // Convert playerSelection into lowercase
    playerSelection = playerSelection.toLowerCase();

    switch(true) {
        // IF playerSelection and computerSelection have same value, then it's a tie
        case playerSelection === computerSelection: return "tie";

        // IF rock vs paper, THEN paper wins
        case (playerSelection == "paper") && (computerSelection == "rock"): return "player";
        case (playerSelection == "rock") && (computerSelection == "paper"): return "computer";

        // ELIF rock vs scissors, THEN rock wins
        case (playerSelection == "rock") && (computerSelection == "scissors"): return "player";
        case (playerSelection == "scissors") && (computerSelection == "rock"): return "computer";

        // ELIF paper vs scissors, THEN scissors wins
        case (playerSelection == "scissors") && (computerSelection == "paper"): return "player";
        case (playerSelection == "paper") && (computerSelection ==  "scissors"): return "computer";
        
        // ELSE, i dont know
        default: return "unknown";
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

// Create a function for player selection button
function playerSel(sel, callback) {
    //IF button with "rock" value selected, then return "rock"
    if (sel == undefined) {
        setTimeout(callback, 5000);
        playerSel();
    }
    else {
        playRound(sel, computerPlay());
    }

}

// Create a function of the game itself
function game(rounds) {
    // Get Value from gameRounds text box
    rounds = document.getElementById('gameRounds').value;
    // Hide startpage div
    document.getElementsByClassName('startpage')[0].style.visibility = "hidden";
    // Create 2 variables to store score for each player
    let playerScore = 0;
    let computerScore = 0;
    
    // Create for loop including the playRound function
    for (i = 1; i <= rounds; i++) {
        // Print the round
        console.log("Round ", i);
        // Run playRound function
        let winner = playerSel();
        // Prompt player for a input
        console.log("Player played: ", playerSelection);
        // Generate computer choice
        let computerSelection = computerPlay();
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
