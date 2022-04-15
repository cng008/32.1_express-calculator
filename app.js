const express = require('express');
const app = express();
const ExpressError = require('./expressError');

app.use(express.json());

app.get('/mean', (req, res) => {
  if (!req.query.nums) throw new ExpressError('nums are required', 400);

  let { operation = 'mean', value = 0, nums = 0 } = req.query;
  //   turn query param into array
  nums = req.query.nums.split(',').map(num => {
    return parseInt(num);
  });
  // count and get mean of numbers
  for (let i in nums) {
    value += nums[i];
  }
  value = (value / nums.length).toFixed(2);
  // return res.send(
  //   `MEAN operation is: ${operation}, value is: ${value}, nums: ${nums}`
  // );
  return res.json({
    response: { operation: operation, value: value }
  });
});

app.get('/median', (req, res) => {
  if (!req.query.nums) throw new ExpressError('nums are required', 400);

  let { operation = 'median', value = 0, nums = 0 } = req.query;
  //   turn query param into array
  nums = req.query.nums.split(',').map(num => {
    return parseInt(num);
  });
  // count and get median of numbers
  nums.sort();

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  console.log(median);
  value = median;
  // return res.send(
  //   `MEDIAN operation is: ${operation}, value is: ${value}, nums: ${nums}`
  // );
  return res.json({ response: { operation: operation, value: value } });
});

app.get('/mode', (req, res) => {});

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
