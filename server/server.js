const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let guessList = [];

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

  res.send(guessList);
});

app.post('/game', (req, res) => {
  console.log('in game POST', req.body);

  let newGuessFrom = req.body;

  guessList.push(newGuessFrom);

  res.sendStatus(201);

})