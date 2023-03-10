const fs = require('fs'); 
const express = require('express');
const cors = require('cors');
const path = require('path');

const databasePath = path.join(__dirname, 'database.json');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  fs.readFile(databasePath, (err, data) => {
    if (err) throw err;
    const { results: questions } = JSON.parse(data);
    return res.status(200).send(createArrWithTenQuestions(questions));
  });
});

app.listen(3001, () => console.log('online'));

function createArrWithTenQuestions(questions) {
  const arr = new Array();
  const numbers = new Array();
  for (const i in new Array(1,2,3,4,5,6,7,8,9,10)) {
    const randomNum = Math.floor(Math.random() * 108);

    if (!numbers.some((n) => n === randomNum)) arr.push(questions[randomNum]);
    else createArrWithTenQuestions(questions);
    numbers.push(randomNum);
  }

  return arr;
}

module.exports = app;