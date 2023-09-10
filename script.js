console.log("Welcome to Rock Paper Scissors");
const choices = ["rock", "paper", "scissors"];
const maxRoundsToWin = 5;
let playerScore = 0;
let computerScore = 0;
let ties = 0;
let round = 0;
let maxWins = 0;

startGame();

function startGame() {
    document.querySelectorAll('.player-choicebtn').forEach((btn) => {
        btn.addEventListener('click', () => {
            playRound(btn.id);
        })
    });
}

function playRound(player) {

    if (playerScore >= maxRoundsToWin || computerScore >= maxRoundsToWin) {
        displayResults();
        return;
    }

    document.querySelector('#round').textContent = `Round:${++round}`;
    console.log(round);
    let computer = getComputerChoice();
    updateDOM(player, computer);

    let winner = decideWinner(player, computer);
    updateScore(winner);
}

function updateScore(winner) {
    if (winner === 'player') {
        ++playerScore;
        document.querySelector('.game-info p').textContent = 'You Win!';
    }
    else if (winner === 'computer') {
        ++computerScore;
        document.querySelector('.game-info p').textContent = 'You Lose!';
    }
    else {
        ties++;
        document.querySelector('.game-info p').textContent = 'Draw!';
    }

    maxWins = Math.max(playerScore, computerScore, maxRoundsToWin);

    const points = document.querySelector('#points');
    points.textContent = `${playerScore}:${computerScore}`;
}


function updateDOM(player, computer) {
    let playerChose = document.querySelector('#player-chose');
    let computerChose = document.querySelector('#computer-chose');

    playerChose.src = `img/${player}.png`;
    computerChose.src = `img/${computer}.png`;
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function decideWinner(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        return "tie";
    }
    else if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        return "player"
    }
    else {
        return "computer";
    }
}

function displayResults() {
    let winner = (playerScore > computerScore) ? 'Player' : 'Computer';
    let message = "";
    if (winner === 'Player') message = 'mission passed!';
    else message = 'mission failed!';
    modalHeader.innerHTML = `<h6>${message}</h6>`;
    totalRound.textContent = `Rounds Played: ${round}`;
    finalWinner.textContent = `Winner: ${winner}`;
    finalTies.textContent = `Ties: ${ties}`;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'block';

    window.addEventListener('click', (e) => {
        if (e.target == modalContainer) {
            modalContainer.style.display = 'none';

        }
    });
}

function restart() {
    playerScore = 0;
    computerScore = 0;
    ties = 0;
    round = 0;
    maxWins = 0;
    document.querySelector('#round').textContent = `Round: 0`;
    document.querySelector('.game-info p').textContent = 'Welcome to Rock Paper Scissors!';
    document.querySelector('#points').textContent = '0:0';
    document.querySelector('#player-chose').src = 'img/fist.png';
    document.querySelector('#computer-chose').src = 'img/fist.png';
    document.getElementById('modal-container').style.display = 'none';
}