const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());

// 404 HANDLER
app.use((req, res, next) => {
  const e = new ExpressError('Page Not Found', 404);
  next(e);
});

// GENERIC ERROR HANDLER
app.use((error, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = error.status || 500;
  let message = error.message;
  // set the status and alert the user
  return res.status(status).json({ error: { message, status } });

  // res.status(error.status).send(error.msg) //alt
});
// END GENERIC ERROR HANDLER

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
