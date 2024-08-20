const express = require('express');
require('dotenv').config();


const app = express();
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