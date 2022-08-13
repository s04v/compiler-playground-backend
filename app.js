const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execSync } = require("child_process");
const fs = require('fs');

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.text());

app.post('/build', async (req, res) => {
  const fileName = 'main.cpp';
  const code = req.body;
 
  console.log(code);
  const ret = fs.writeFileSync(fileName, code);
  try {
    execSync(`compiler/compiler ${fileName}`);
  } catch(e) {
    res.status(400).send({msg: e.stdout.toString()});
  }

  const cat = execSync(`cat output.asm`);
  const run = execSync('./a.out');
  console.log(cat.stdout);
  console.log(run.stdout);
  res.status(200).send("OK");
});

// exec("cat main.cpp", (error, stdout, stderr) => {
//   console.log(error);
//   console.log(stderr);
//   console.log(stdout);
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
