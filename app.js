const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execSync } = require("child_process");
const fs = require('fs');

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.text());

app.post('/build', async (req, res) => {
  const fileName = 'main.cpp';
  const code = req.body;
 
  const ret = fs.writeFileSync(fileName, code);
  try {
    execSync(`compiler/compiler ${fileName}`);
  } catch(e) {
    res.status(400).send({output: e.stdout.toString()});
    return;
  }

  const cat = execSync(`cat output.asm`);
  const run = execSync('./a.out');
  res.status(200).send({output: run.toString(), asm: cat.toString()});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
