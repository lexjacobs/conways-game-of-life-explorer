import { initializeArray, randomizeArray, wraparound } from './arrayMethods';

test('testing array initialization', () => {
  expect(initializeArray(0)).toEqual([]);
  expect(initializeArray(1)).toEqual([0]);
  expect(initializeArray(0)).not.toEqual([0]);
  expect(initializeArray(3)).toEqual([0, 0, 0]);
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
  expect(result.filter(x => x === 0).length / 10000).toBeCloseTo(0.25, 1)
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

test('testing the wraparound function', () => {
  expect(wraparound(0, 3, 12)).toBe(3);
  expect(wraparound(0, 12, 12)).toBe(0);
  expect(wraparound(11, 3, 12)).toBe(2);
  expect(wraparound(0, -3, 12)).toBe(9);
  expect(wraparound(3, -3, 12)).toBe(0);
  expect(wraparound(3, -5, 12)).toBe(10);
});
