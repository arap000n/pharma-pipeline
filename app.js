const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('/public/top.ejs');
});

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))
