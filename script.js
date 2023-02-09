const OPTIONS_ARR = ["rock", "paper", "scissors"];

let round = 1;
let gameInProgress = true;
let computerWins = 0;
let playerWins = 0;

// Get computer selection
const computerPlay = () => OPTIONS_ARR[Math.floor(Math.random() * 3)];
// Get player selection
const userPlay = () => prompt(messenger('prompt', {round}), "");

// Start the game
(function () {
    if(confirm(messenger('alertStart'))) {
        console.log(messenger('rules'))
        game()
    }
    else {
        alert('Just come back anytime')
    }
})()

// Run the game
function game() {
    if (round <= 5 && gameInProgress) {
        playRound()
    } else if (gameInProgress) {
        determineGameWinner()
    }
}

// Play one round
function playRound() {
    const playerSelection = userPlay()
    const computerSelection = computerPlay()

    if (!playerInputListener(playerSelection)) {
        game()
        return;
    }
    console.log(`ROUND ${round}`)
    round++;

    determineRoundWinner(playerSelection, computerSelection)
    game()
}

// Determine the winner of one round
function determineRoundWinner(playerSelection, computerSelection) {
    const OPTIONS_OBJ = {
        "rock": 0,
        "paper": 0.5,
        "scissors": 1
    }

    const compare = OPTIONS_OBJ[playerSelection] - OPTIONS_OBJ[computerSelection];

    if (compare == 0) {
        console.log(messenger('draw', { playerSelection, computerSelection }))
    }
    else if ((compare < 0 && compare != -1) || compare == 1) {
        console.log(messenger('lose', { playerSelection, computerSelection }))
        computerWins++;
    } else {
        console.log(messenger('win', { playerSelection, computerSelection }))
        playerWins++;
    }
}

// Determine the winner of whole game
function determineGameWinner() {
    if (playerWins > computerWins) {
        console.log(messenger('gameWin'))
    }
    else if (playerWins < computerWins) {
        console.log(messenger('gameLose'))
    }
    else {
        console.log(messenger('gameDraw'))
    }
}

// Player input listener
function playerInputListener(playerSelection) {
    if (playerSelection == null) {
        if (escapeTheGame()) gameInProgress = false;
        return false;
    }
    playerSelection = playerSelection.trim();
    if (playerSelection == "") {
        console.log(messenger('notValid'))
        return false;
    }
    playerSelection = playerSelection.toLowerCase();
    if (!OPTIONS_ARR.includes(playerSelection)) {
        console.log(messenger('undefined'))
        return false;
    }
    else return true;
}

// Escape the game alert
function escapeTheGame() {
    if (confirm(messenger('escAlert'))) {
        console.log(messenger('escInfo'))
        return true;
    }
    else return false;
}

// All game output messages
function messenger(action, args) {
    switch (action) {
        case 'alertStart':
            return 'This is console "Rock, Paper or Scissors" game.\nTo start press "OK" and open devtools console.'

        case 'prompt':
            return `ROUND ${args.round}.\nPlease select Rock, Paper or Scissors.`;

        case 'draw':
            return `Draw! Player and Computer selected(${args.playerSelection})`;

        case 'lose':
            return `Lose! Computer(${args.computerSelection}) beats Player(${args.playerSelection})`;

        case 'win':
            return `Win! Player(${args.playerSelection}) beats Computer(${args.computerSelection})`;

        case 'escAlert':
            return 'Do you want to escape the game?';

        case 'escInfo':
            return `You escaped the game after round ${round}. To restart the game please refresh the page.`

        case 'undefined':
            return 'You entered an undefined option :( Try again. Available options: Rock or Paper or Scissors';
        
        case 'notValid':
            return 'You didn\'t type anything Please enter smth';

        case 'gameWin':
            return `Game result is a Win! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`;

        case 'gameLose':
            return `Game result is a Lose! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`;

        case 'gameDraw':
            return `Game result is a Draw! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`;


        case 'rules':
            let message = "Game information:\n";
            message += '* The game "Rock, Paper, Scissors" has 5 rounds. You play against the computer.\n'
            message += '* The progress of the game is available in the console.\n'
            message += '* To play you need to select one of the following options each round: rock, paper or scissors.\n'
            message += '* Type your selection in the input box and press "OK" button.\n'
            message += '* The computer will select random option by itself.\n'
            message += '* After 5 rpounds you will see the result of the whole game in the console.\n'
            message += "* The game is breathtaking and it's FREE! Enjoy!\n"
            message += "~"
            return message;
    }
}