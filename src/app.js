require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.set('port', process.env.PORT);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;
