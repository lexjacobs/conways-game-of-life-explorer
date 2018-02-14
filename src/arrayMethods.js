/*
 return array of specified length, all zeros
 */
export function initializeArray(len) {
  return Array(len).fill(0)
}

/*
 randomly populate zeros and ones, with probability of 1 === weight (in %)
 */
export function randomizeArray(arr, weight = 50) {

  function calculateRandom(weight) {
    // example weight === 100
    // will always return 1
    // and weight === 0, always return 0
    return (Math.random() * 100) < weight ? 1 : 0;
  }

  return arr.map(x => calculateRandom(weight))
}

/*
 useful for wrapping from end to beginning,
 or from beginning back to end of array of specified length.

 arguments:
  start: starting array index
  add: (positive or negative) move forward or backward that many indices
  len: length of array
 */

export function wraparound(start, add, len) {
  var result = (start + add) % len;
  return result < 0 ? len + result : result;
}
