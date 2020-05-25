const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('https://pharma-pipeline.herokuapp.com/', (req, res) => {
  res.render('top.ejs');
});

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))
