const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const {
  convertAndValidate,
  findMode,
  findMean,
  findMedian
} = require('./helpers');

app.use(express.json());

app.get('/mean', (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      'You must pass a query key of nums with a comma-separated list of numbers.',
      400
    );
  }

  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidate(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: 'mean',
    result: findMean(nums).toFixed(2)
  };

  return res.send(result);
});

app.get('/median', (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      'You must pass a query key of nums with a comma-separated list of numbers.',
      400
    );
  }

  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidate(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: 'median',
    result: findMedian(nums)
  };

  return res.send(result);
});

app.get('/mode', (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      'You must pass a query key of nums with a comma-separated list of numbers.',
      400
    );
  }

  let numsAsStrings = req.query.nums.split(',');
  // check if anything bad was put in
  let nums = convertAndValidate(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: 'mode',
    result: findMode(nums)
  };

  return res.send(result);
});

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
