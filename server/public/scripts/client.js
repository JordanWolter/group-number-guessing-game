//const { data } = require("jquery");

$(document).ready(handleReady);

let guesses  = [];
function handleReady() {
  console.log("jquery is loaded!")

  $('#playerGuesses').on('submit', playerGuesses);
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

  })
}

function loadGuess(){
  console.log('in loadGuess');

  $.ajax({
    url: '/game',
    method: 'GET',
    //data: randomNum
  })
  .then((response) => {
    console.log('GET /game', response);
    guesses = response;
    render();
  })
  .catch((err) => {
    console.log('GET /game error', err);
  })

}

function render(){
  console.log('in render ', guesses);
  $('#rounds').empty()
  $('#rounds').append(`<h2>Total Rounds: ${guesses.guess.length}</h2>`)

  $('#guessList').empty();
  for(let guess of guesses.guess){
    $('#guessList').append(`
    <li><h3>Player One's Guess: ${guess.playerOne}</h3></li>
    <li><h3>Player Two's Guess: ${guess.playerTwo}</h3></li>
    
    `)
  }

}





