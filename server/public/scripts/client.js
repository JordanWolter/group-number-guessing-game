//const { data } = require("jquery");

$(document).ready(handleReady);

let guesses  = [];
let i = 0;
let history = [];

function handleReady() {
  console.log("jquery is loaded!")

  $('#playerGuesses').on('submit', playerGuesses);
  $('#rounds').on('click', resetButton);
}

function playerGuesses(evt){
  evt.preventDefault();

  console.log('in playerGuesses')
  
  let newGuess = {
    playerOne: $('#playerOneInput').val(),
    playerTwo: $('#playerTwoInput').val()
  };

  $.ajax({
    url:'/game',
    method: 'POST',
    data: newGuess
  })
  .then(response => {
    console.log('POST/game response', response);

    loadGuess();
    
  })
  .catch((err) => {

    console.log('POST/game error',err);

  });

  $('#playerOneInput').val('');
  $('#playerTwoInput').val('');
  
}

function loadGuess(){
  console.log('in loadGuess');

  $.ajax({
    url: '/game',
    method: 'GET',
  })
  .then((response) => {
    console.log('GET /game', response);
    guesses = response;
    history.push(guesses);
    render();
    winButton();
  })
  .catch((err) => {
    console.log('GET /game error', err);
  })

}

function render(){
  console.log('in render ', guesses);

  console.log('this is the history', history);

  $('#rounds').empty()
  $('#rounds').append(`<h2>Total Rounds: ${guesses.guess.length}</h2>`);

  $('#guessList').empty();
  let i = 0;
  for(let index of history){
    console.log(guesses);
    console.log(index.guess[0].playerOne);
    $('#guessList').append(`
    <li><h3>Player One's Guess: ${index.guess[i].playerOne}</h3></li>
    <p>Player One's guess is: ${index.resultOne}</p>
    <li><h3>Player Two's Guess: ${index.guess[i].playerTwo}</h3></li>
    <p>Player Two's guess is: ${index.resultTwo}</p>
    `)
    i++
  }
  

}

function winButton(){
  if(guesses.resultOne === 'win' || guesses.resultTwo === 'win'){
    $('#rounds').append(`
    <button id='resetButton'>Reset</button>
    `)
  }
}

function resetButton(){
  $('#guessList').empty();
  $('#rounds').empty();
  history = [];
  guesses = [];
  console.log('should be empty', history);

}




