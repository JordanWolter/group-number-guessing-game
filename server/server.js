const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let guessList = [];
let randomNum = 0;
let i = 0;
let n = 0;


function getRandomNum(min, max){
  randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
}


let game = {
  guess: guessList,
  random: getRandomNum(1, 25),
  resultOne: '',
  resultTwo: ''
}
//    \              /  ______________    _____________
//     \            /         |          |
//      \    /\    /          |          |_______
//       \  /  \  /           |          |
//        \/    \/            |          |



function playerOneTest(test, random){
  console.log('test', test)

  let playerOneNum = Number(test.guess[n].playerOne)

  console.log('should be an num', playerOneNum)
  if(playerOneNum > test.random){
    console.log("player one guess is higher");

    game.resultOne = 'higher';

    console.log('should be higher', game.resultOne);

  }else if(playerOneNum < test.random){
    console.log('player one guess is lower');

    game.resultOne = 'lower';

    console.log('should be lower', game.resultOne);

  } else if(playerOneNum === test.random){
    console.log('player one wins');

    game.resultOne = 'win';

    console.log('should be win', game.resultOne);

  }
  n++
}

function playerTwoTest(test){
  console.log('test', test,)

  let playerTwoNum = parseInt(test.guess[i].playerTwo)

  console.log('should be an int', playerTwoNum)
  
  if(playerTwoNum > test.random){
    console.log('player two guess is higher');

    game.resultTwo = 'higher';

    console.log('should be higher', game.resultTwo);

  }else if(playerTwoNum < test.random){
    console.log('player two guess is lower');

    game.resultTwo = 'lower';

    console.log('should be lower', game.resultTwo);

  }else if(playerTwoNum === test.random){
    console.log('player two wins');

    game.resultTwo = 'win';

    console.log('should be win', game.resultTwo);

  }
  i++;
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
  playerOneTest(game);
  playerTwoTest(game);
  


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

