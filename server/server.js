const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let guessList = [];
let randomNum = 0;


function getRandomNum(min, max){
  randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
}

//let playerOneResult = playerOneTest(guessList, randomNum);
//let playerTwoResult = playerTwoTest(newGuessFrom, randomNum);

let game = {
  guess: guessList,
  random: getRandomNum(1, 25),
  //playerOneGuess: playerOneResult,
  //playerTwoGuess: playerTwoResult
}
//    \              /  ______________    _____________
//     \            /         |          |
//      \    /\    /          |          |_______
//       \  /  \  /           |          |
//        \/    \/            |          |



function playerOneTest(test, random){
  console.log('test', test, 'random', random)
  if(test > random){
   
    console.log('player one guess is higher');

  }else if(test < random){
    console.log('player one guess is lower');

  } else if(test === random){
    console.log('player one wins');

  }

}

function playerTwoTest(test, random){
  console.log('test', test, 'random', random)
  if(test > random){
    console.log('player two guess is higher');
    $('#guessList').append(`
    <li><h3>player two guess is higher</h3></li>
    
    `)

  }else if(test < random){
    console.log('player two guess is lower');
    $('#guessList').append(`
    <li><h3>player two guess is lower</h3></li>
    `)
  }else if(test === random){
    console.log('player two wins');
    $('#guessList').append(`
    <li><h3>player two wins</h3></li>
    
    `)
  }
}






// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});

app.get('/game', (req, res) => {
  console.log('we want the numbers');
  


  res.send(game); //, getRandomNum(1, 25)
});

app.post('/game', (req, res) => {
  console.log('in game POST', req.body);

  let newGuessFrom = req.body;

  guessList.push(newGuessFrom);
  // getRandomNum;

  res.sendStatus(201);

});
arrayLoop(guessList);

function arrayLoop(array){
  for(let index of array){
    console.log(array.playerOne[index]);
    console.log(array.playerTwo[index]);
   
  }
  
}

