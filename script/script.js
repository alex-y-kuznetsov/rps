
// Vars
const startGameBtn = document.querySelector('#startGameBtn');
const setGameNameBtn = document.querySelector('#setGameNameBtn');
const slides = document.querySelectorAll('.slide');
const gameNameField = document.querySelector('#gameNameField');
const gameNameOutput = document.querySelectorAll('.gameNameOutput');
const playerSelectionForms = document.querySelectorAll('.selection-form');
const resultMessage = document.querySelector('#resultMessage');

let currentSlide = 1;
let gameName = '';
let selection = {
    player1: '',
    player2: ''
};
let winnerMessage = '';

//Functions
function showCurrentSlide() {
    currentSlide++;
    slides.forEach(slide => {
        slide.id === `slide${currentSlide}` ? 
        slide.classList.remove('visually-hidden') : 
        slide.classList.add('visually-hidden');

    });
    if (currentSlide === 5) {
        getWinner();
    }
};

function setGameName(evt) {
    evt.preventDefault();
    if (gameNameField.value) {
        gameName = gameNameField.value;
        showCurrentSlide();
        gameNameOutput.forEach(output => output.textContent = gameName);
    } else {
        alert('Enter game name');
    }
};

function getWinner() {
    const beats = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    }
    if (selection.player1 === selection.player2) {
        winnerMessage = 'draw (players made the same selection)'
    } else if (beats[selection.player1] === selection.player2) { 
        winnerMessage = `player 1 wins (${selection.player1} beats ${selection.player2})` 
    } else { 
        winnerMessage = `player 2 wins (${selection.player2} beats ${selection.player1})`
    };
    resultMessage.textContent = winnerMessage;
};

function makePlayerSelection(player) {
    const playerSelectionFormValue = {
        player1: document.querySelector('input[name="selectionPlayer1"]:checked'),
        player2: document.querySelector('input[name="selectionPlayer2"]:checked')
    }
    selection[player] = playerSelectionFormValue[player]?.value;
    showCurrentSlide();
}

//Listeners
startGameBtn.addEventListener('click', showCurrentSlide);
setGameNameBtn.addEventListener('click', setGameName);
playerSelectionForms.forEach(form => {
    form.addEventListener('input', function () {
        makePlayerSelection(form.id);
    })
})