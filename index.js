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

let reconnection;

function handleDisconnect() {
    console.log('INFO.CONNECTION_DB: ');
    reconnection = mysql.createConnection(connection);
    
    //connection取得
    reconnection.connect(function(err) {
        if (err) {
            console.log('ERROR.CONNECTION_DB: ', err);
            setTimeout(handleDisconnect, 1000);
        }
    });
    
    //error('PROTOCOL_CONNECTION_LOST')時に再接続
    reconnection.on('error', function(err) {
        console.log('ERROR.DB: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('ERROR.CONNECTION_LOST: ', err);
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();


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
      'SELECT  company.company_name, drug.dev_code, drug.generic_name, drug.drug_name, pipeline.indication, drug.mechanism, pipeline.phase FROM pipeline LEFT JOIN company ON company.company_id=pipeline.company_id LEFT JOIN drug ON drug.drug_id=pipeline.drug_id WHERE company.company_name LIKE'+ connection.escape('%' + req.query.cn + '%')+'AND pipeline.indication LIKE'+ connection.escape('%' + req.query.ind + '%'),
      (error, results) => {
        res.render('pages/index',{pipelines: results});
      })
  })




  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
