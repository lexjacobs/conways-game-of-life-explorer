/* global test expect */
import { initializeBlankArray, randomizeArray, wrapSide, wrapTopBottom } from './arrayMethods';

test('testing array initialization', () => {
  expect(initializeBlankArray(0)).toEqual([]);
  expect(initializeBlankArray(1)).toEqual([0]);
  expect(initializeBlankArray(0)).not.toEqual([0]);
  expect(initializeBlankArray(3)).toEqual([0, 0, 0]);
});

test('testing randomizer rate with default weight', () => {
  var array = Array(50).fill(0);
  var result = randomizeArray(array);
  expect(array).not.toEqual(result);
  result = randomizeArray(array);
  expect(array).not.toEqual(result);
  result = randomizeArray(array);
  expect(array).not.toEqual(result);
});

test('testing randomizer rate with specific weight', () => {
  var array = Array(50).fill(0);
  var specificWeight = 50;
  var result = randomizeArray(array, specificWeight);
  expect(array).not.toEqual(result);
  result = randomizeArray(array, specificWeight);
  expect(array).not.toEqual(result);
  result = randomizeArray(array, specificWeight);
  expect(array).not.toEqual(result);
  array = Array(5000).fill(0);
  result = randomizeArray(array, specificWeight);
  expect(result.filter(x => x === 0).length / 10000).toBeCloseTo(0.25, 1);
});

test('testing randomizer rate with specific weight. 0% weighting of 1 should always return zeros', () => {
  var array = Array(500).fill(0);
  var result = randomizeArray(array, 0);
  expect(array).toEqual(result);
});

test('testing randomizer rate with specific weight. 100% weighting of 1 should always return ones', () => {
  var array = Array(500).fill(1);
  var result = randomizeArray(array, 100);
  expect(array).toEqual(result);
});

test('testing the wrapSide function for positive cases', () => {
  // edge case, width of 1
  expect(wrapSide(0, 1, 1)).toBe(0);

  expect(wrapSide(0, 1, 3)).toBe(1);
  expect(wrapSide(1, 1, 3)).toBe(2);
  expect(wrapSide(2, 1, 3)).toBe(0);
  expect(wrapSide(3, 1, 3)).toBe(4);
  expect(wrapSide(4, 1, 3)).toBe(5);
  expect(wrapSide(5, 1, 3)).toBe(3);

});

test('testing the wrapSide function for negative cases', () => {
  // edge case, width of 1
  expect(wrapSide(0, -1, 1)).toBe(0);

  expect(wrapSide(0, -1, 3)).toBe(2);
  expect(wrapSide(1, -1, 3)).toBe(0);
  expect(wrapSide(2, -1, 3)).toBe(1);
  expect(wrapSide(3, -1, 3)).toBe(5);
  expect(wrapSide(4, -1, 3)).toBe(3);
  expect(wrapSide(5, -1, 3)).toBe(4);

});

test('testing the wrapTopBottom function for positive cases', () => {
  expect(wrapTopBottom(0, 1, 3, 9)).toBe(3);
  expect(wrapTopBottom(3, 1, 3, 9)).toBe(6);
  expect(wrapTopBottom(6, 1, 3, 9)).toBe(0);
  expect(wrapTopBottom(2, 1, 3, 9)).toBe(5);
  expect(wrapTopBottom(5, 1, 3, 9)).toBe(8);
  expect(wrapTopBottom(8, 1, 3, 9)).toBe(2);
});

test('testing the wrapTopBottom function for negative cases', () => {
  expect(wrapTopBottom(0, -1, 3, 9)).toBe(6);
  expect(wrapTopBottom(3, -1, 3, 9)).toBe(0);
  expect(wrapTopBottom(6, -1, 3, 9)).toBe(3);
  expect(wrapTopBottom(2, -1, 3, 9)).toBe(8);
  expect(wrapTopBottom(5, -1, 3, 9)).toBe(2);
  expect(wrapTopBottom(8, -1, 3, 9)).toBe(5);
});
