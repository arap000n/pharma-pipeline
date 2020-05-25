const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('top.ejs');
});
