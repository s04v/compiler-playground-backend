const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { exec } = require("child_process");

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(bodyParser.text());

app.post('/build', (req, res) => {
  console.log(req.body);

});

app.post('/run', (req, res) => {

});


exec("cat main.cpp", (error, stdout, stderr) => {
  console.log(error);
  console.log(stderr);
  console.log(stdout);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
