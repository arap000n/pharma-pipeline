const app = require('express')
const path = require('path')
const mysql = require('mysql');
const PORT = process.env.PORT || 5000


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const connection = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b9b886717a0254",
  password: "84f508e2",
  database: "heroku_0edb62883326224"
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM drug',
    (error, results) => {
      res.render('pages/index',{drugs: results});
    })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
