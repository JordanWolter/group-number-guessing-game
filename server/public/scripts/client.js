$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

  $('#btn').on('submit', playerGuesses);
}

function playerGuesses(evt){
  evt.preventDefault();
}