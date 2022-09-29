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

  $('#guessList').empty();
  for(let guess of guesses){
    $('#guessList').append(`
    <li><h3>${guess.playerOne}</h3></li>
    <li><h3>${guess.playerTwo}</h3></li>
    `)
  }

}





