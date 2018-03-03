/*
 return array of specified length, all zeros
 */
export function initializeBlankArray(len) {
  return new Array(len).fill(0);
}

/*
 randomly populate zeros and ones, with probability of returning `1` === weight (in %)
 input arguments:
  len: length integer
  weight: integer 0-100,

 */
export function randomizeArray(array, weight = 50) {

  function calculateRandom(weight) {
    // example weight of 100
    // will always return 1
    // and weight of 0 will always return 0
    return (Math.random() * 100) < weight ? 1 : 0;
  }

  let result = [];
  for(var i = 0; i < array.length; i++) {
    result.push(calculateRandom(weight));
  }

  return result;
}

/*
 wrapSide: useful for navigating array as a toroid
 https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Algorithms
 moving off the right edge continues on the left edge and vice versa.

 input arguments:
  start: starting array index
  add: (positive or negative) move forward or backward that many indices
  width: number of columns on board

 output: integer (array position)
 */

export function wrapSide(start, add, width) {

  // add is positive
  if (add > 0) {

    // (start + add) % width is 0, right edge
    if ((start + add) % width === 0) {
      return start + add - width;
    } else {
      return start + add;
    }

    // add is negative
  } else {

    // start % width is 0, left edge
    if (start % width === 0) {
      return start + add + width;
    } else {
      return start + add;
    }
  }
}

/*
 useful for navigating array as a toroid
 moving off the top edge continues on the bottom edge and vice versa.

 arguments:
  start: starting array index
  add: (positive or negative) move forward or backward that many indices
  width: number of columns (number of rows will be inferred)
 */

export function wrapTopBottom(start, add, width, length) {

  // add is positive
  if (add > 0) {

    // start + width >= length, bottom edge
    if (start + width >= length) {
      return start + width - length;
    } else {
      return start + width;
    }

  } else {
    // add is negative

    // start - width < 0 , top edge
    if (start - width < 0) {
      return start - width + length;
    } else {
      return start - width;
    }
  }

}
