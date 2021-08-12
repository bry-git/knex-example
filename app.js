// app.js
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'admin',
      password : 'password',
      database : 'postgres'
    }
})

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/movies', (req, res) => {
  knex
    .select('*')
    .from('movies')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/movies', (req, res) => {
    knex('movies')
         .insert(req.body)
         .then(() => res.send(200))
         .catch(err =>
            res.status(500))       
})



app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});