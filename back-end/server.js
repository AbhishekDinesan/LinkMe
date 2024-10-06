const express = require('express');
const apiRouter = require('../back-end/routes/api');
require('dotenv').config();

const app = express();

app.use(express.json())

app.use('/api', apiRouter)

app.use('/request-type', (req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  console.log('Request type: ', req.method);
  next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`));