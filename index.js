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
      'SELECT  company.company_name, drug.dev_code, drug.generic_name, drug.drug_name, pipeline.indication, drug.mechanism, pipeline.phase FROM pipeline LEFT JOIN company ON company.company_id=pipeline.company_id LEFT JOIN drug ON drug.drug_id=pipeline.drug_id',
      (error, results) => {
        res.render('pages/index',{pipelines: results});
      })
  })
  .get('/search', (req, res) => {
    connection.query(
      'SELECT  company.company_name, drug.dev_code, drug.generic_name, drug.drug_name, pipeline.indication, drug.mechanism, pipeline.phase FROM pipeline LEFT JOIN company ON company.company_id=pipeline.company_id LEFT JOIN drug ON drug.drug_id=pipeline.drug_id WHERE company.company_id=40 ',
      (error, results) => {
        res.render('pages/index',{pipelines: results});
      })
  })




  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
