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
  const { stdout } = execSync(`bin/compiler ${filename}`);
    
  console.log(stdout);
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
