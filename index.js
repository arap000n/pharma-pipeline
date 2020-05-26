const express = require('express')
const path = require('path')
const mysql = require('mysql');
const PORT = process.env.PORT || 5000

const connection = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b9b886717a0254",
  password: "84f508e2",
  database: "heroku_0edb62883326224"
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    connection.query(
      'SELECT * FROM pipeline',
      (error, results) => {
        res.render('pages/index',{pipelines: results});
      })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
