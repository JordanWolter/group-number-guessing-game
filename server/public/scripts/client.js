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
    //data: randomNum
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

  console.log('this is getting confusing', history);

  $('#rounds').empty()
  $('#rounds').append(`<h2>Total Rounds: ${guesses.guess.length}</h2>`);
  

  $('#guessList').empty();
  for(let guess of guesses.guess){
    console.log(guesses);
    $('#guessList').append(`
    <li><h3>Player One's Guess: ${guess.playerOne}</h3></li>
    <p id='playerOne'></p>
    <li><h3>Player Two's Guess: ${guess.playerTwo}</h3></li>
    <p id='playerTwo'></p>
    
    `)
  }
  for(let index of history){
    $('#playerOne').append(`
    Player One's guess is: ${index.guess[i]resultOne}
    
    `)
    $('#playerTwo').append(`
    Player Two's guess is: ${index.resultTwo}
    `)
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
  console.log('should be empty', history);
}




