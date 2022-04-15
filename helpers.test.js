const { findMean, findMedian, findMode } = require('./helpers');

describe('findMedian', function () {
  it('finds the median of an even set', function () {
    expect(findMedian([3, -4, 9, 2])).toEqual(2.5);
  });
  it('finds the median of an odd set', function () {
    expect(findMedian([4, -1, 5])).toEqual(4);
  });
});

describe('findMean', function () {
  it('finds the mean of an empty array', function () {
    expect(findMean([])).toEqual(0);
  });
  it('finds the mean of an array of numbers', function () {
    expect(findMean([1, -1, 33, 6])).toEqual(9.75);
  });
});

describe('findMode', function () {
  it('finds the mode', function () {
    expect(findMode([1, 2, 2, 3, 3, 3])).toEqual(3);
  });
});
