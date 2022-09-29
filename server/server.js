const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let guessList = [];

function getRandomNum(min, max){
  let randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
}


let game = {
  guess: guessList,
  random: getRandomNum(1, 25)
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



