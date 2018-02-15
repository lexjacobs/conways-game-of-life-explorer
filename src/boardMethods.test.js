test('', () => {
  expect();
});

// import {
//   cellCount,
//   createBoard
// } from './boardMethods';
//
// test('it correctly counts the number of living cells surrounding a cell, which is 0 if everyone is dead', () => {
//   var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//   expect(board.length).toEqual(9);
//   var result = cellCount(board, 3, 5);
//   expect(result).toBe(0);
//   // this should work regardless of starting index
//   for (var i = 0; i < board.length; i++) {
//     var result = cellCount(board, 3, i);
//     expect(result).toBe(0);
//   }
// });
//
// test('it correctly counts the number of living cells surrounding a cell, which is 8 if everyone is alive', () => {
//   var board = [1, 1, 1, 1, 1, 1, 1, 1, 1];
//   expect(board.length).toEqual(9);
//   var result = cellCount(board, 3, 3, 5);
//   expect(result).toBe(8);
//   // this should work regardless of starting index
//   for (var i = 0; i < board.length; i++) {
//     var result = cellCount(board, 3, i);
//     expect(result).toBe(8);
//   }
// });
//
// test('it creates a board with the expected width, height, and default weighting', () => {
//   var result = createBoard(1, 1)
//   expect(result).toEqual([0]);
//   result = createBoard(2, 1)
//   expect(result).toEqual([0, 0]);
//   result = createBoard(3, 3)
//   expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
//   result = createBoard(20, 10)
//   expect(result.length).toEqual(200);
//   expect(result.includes(1)).toEqual(false);
//   result = createBoard(0, 0)
//   expect(result).toEqual([]);
// });
//
// test('it creates a board with the expected width, height, and defined weighting of 100%', () => {
//   var result = createBoard(20, 10, 100)
//   expect(result.length).toEqual(200);
//   expect(result.includes(0)).toEqual(false);
//   expect(result.includes(1)).toEqual(true);
// });
//
// test('it creates a board with the expected width, height, and defined weighting of 0%', () => {
//   var result = createBoard(20, 10, 0)
//   expect(result.length).toEqual(200);
//   expect(result.includes(0)).toEqual(true);
//   expect(result.includes(1)).toEqual(false);
// });
