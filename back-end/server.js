const express = require('express');

const app = express();
app.use(express.json())

//.app.use('/api', require('/routes/api'))

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('She wants you bro.');
});

app.listen(3001, () => console.log('Example app is listening on port 3001.'));