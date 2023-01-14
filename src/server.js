const express = require('express');

const path =  require("path");

const app = express();

app.use(express.static('./dist/world-pedia'));

app.get('/*', (req, res) => 
  res.sendFile('index.html', {root: 'dist/world-pedia/'})
);

app.listen(process.env.PORT || 8080);