const express = require('express');
require('dotenv').config();
const {Client} = require('pg')


const app = express();

const client = new Client({
  host:process.env.HOST,
  user:process.env.USER,
  port:process.env.DBPORT,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
});


client.connect();

client.query(`SELECT * FROM test_table`, (err, res)=> {
  if(!err){
    console.log(res.rows)
  }
  else{
    console.log(err.message);
  }
  client.end();
})


app.use(express.json())

app.use('/api', require('./routes/api'))

app.use('/request-type', (req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  console.log('Request type: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('good stuff bud');
});

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`));