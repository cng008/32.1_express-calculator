/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} numsAsStrings array of strings
 * @returns {Array|Error} an array or an error object
 */
function convertAndValidate(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let valToNumber = Number(numsAsStrings[i]);

    if (Number.isNaN(valToNumber)) {
      return new Error(
        `Value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
      );
    }

    result.push(valToNumber);
  }
  return result;
}

// MEAN
function findMean(nums) {
  if (nums.length === 0) return 0;

  let value = 0;
  for (let i in nums) {
    value += nums[i];
  }
  return value / nums.length;
}

// MEDIAN
function findMedian(nums) {
  // sort and get the middle element
  nums.sort();

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median;
}

// MODE
/**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 */
function frequencyCounter(nums) {
  let frequency = {};

  for (let num of nums) {
    if (frequency[num]) {
      frequency[num]++;
    } else {
      frequency[num] = 1;
    }
  }
  return frequency;
}

/**
 * Find the most common element in the array
 * @param {Array} arr any array
 */
function findMode(nums) {
  let results = frequencyCounter(nums); // returns an object

  // find the key with the highest frequency
  let max = 0;
  let maxKey;

  for (let num in results) {
    if (results[num] > max) {
      max = results[num];
      maxKey = num;
    }
  }
  return parseInt(maxKey);
}

module.exports = {
  findMean,
  findMedian,
  findMode,
  convertAndValidate
};
