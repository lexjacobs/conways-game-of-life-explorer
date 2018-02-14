import { createBoard } from './boardMethods';

test('it creates a board with the expected width, height, and default weighting', () => {
  var result = createBoard(1, 1)
  expect(result).toEqual([0]);
  result = createBoard(2, 1)
  expect(result).toEqual([0, 0]);
  result = createBoard(3,3)
  expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  result = createBoard(20, 10)
  expect(result.length).toEqual(200);
  expect(result.includes(1)).toEqual(false);
  result = createBoard(0, 0)
  expect(result).toEqual([]);
});

test('it creates a board with the expected width, height, and defined weighting of 100%', () => {
  var result = createBoard(20, 10, 100)
  expect(result.length).toEqual(200);
  expect(result.includes(0)).toEqual(false);
  expect(result.includes(1)).toEqual(true);
});

test('it creates a board with the expected width, height, and defined weighting of 0%', () => {
  var result = createBoard(20, 10, 0)
  expect(result.length).toEqual(200);
  expect(result.includes(0)).toEqual(true);
  expect(result.includes(1)).toEqual(false);
});
