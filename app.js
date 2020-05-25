const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static('https://github.com/arap000n/pharma-pipeline.git/public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('https://github.com/arap000n/pharma-pipeline.git/public/top.ejs');
});

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))
