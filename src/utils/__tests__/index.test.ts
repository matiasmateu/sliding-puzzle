import { calPieceSize, swap, canSwap, isSolved, isSolvable, shuffle, getLinearPosition } from '../index';
import _ from 'lodash';

describe('calPieceSize', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
    });
  });

  test('calculates pieceSize correctly in landscape mode', () => {
    window.innerWidth = 1200;
    window.innerHeight = 800;
    const rows = 5;
    const expectedResult = 800 / (rows + 1);

    expect(calPieceSize(rows)).toBeCloseTo(expectedResult);
  });

  test('calculates pieceSize correctly in portrait mode', () => {
    window.innerWidth = 800;
    window.innerHeight = 1200;
    const rows = 5;
    const expectedResult = 800 / (rows + 1);

    expect(calPieceSize(rows)).toBeCloseTo(expectedResult);
  });
});

describe('swap', () => {
    test('swaps elements correctly', () => {
      const numbers = [1, 2, 3, 4, 5];
      const src = 1;
      const dest = 3;
      const expectedResult = [1, 4, 3, 2, 5];
  
      expect(swap(numbers, src, dest)).toEqual(expectedResult);
    });
  
    test('does not modify the original array', () => {
      const numbers = [1, 2, 3, 4, 5];
      const originalNumbers = _.clone(numbers);
      const src = 1;
      const dest = 3;
  
      swap(numbers, src, dest);
      expect(numbers).toEqual(originalNumbers);
    });
  
    test('returns a new array', () => {
      const numbers = [1, 2, 3, 4, 5];
      const src = 1;
      const dest = 3;
  
      const result = swap(numbers, src, dest);
      expect(result).not.toBe(numbers);
    });
  });

  describe('canSwap', () => {
    test('returns true for adjacent positions', () => {
      const rows = 4;
      const cols = 4;
  
      expect(canSwap(0, 1, rows, cols)).toBe(true);
      expect(canSwap(5, 6, rows, cols)).toBe(true);
    });
  
    test('returns false for non-adjacent positions', () => {
      const rows = 4;
      const cols = 4;
      expect(canSwap(0, 2, rows, cols)).toBe(false);
      expect(canSwap(10, 15, rows, cols)).toBe(false);
    });
  });

  describe('shuffle', () => {
    test('returns a shuffled array', () => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const hole = 0;
      const rows = 3;
      const cols = 3;
  
      const shuffledNumbers = shuffle(numbers, hole, rows, cols);
  
      expect(shuffledNumbers).not.toEqual(numbers);
      expect(_.sortBy(shuffledNumbers)).toEqual(numbers);
    });
  
    test('returns a solvable shuffled array', () => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const hole = 0;
      const rows = 3;
      const cols = 3;
  
      const shuffledNumbers = shuffle(numbers, hole, rows, cols);
  
      expect(isSolvable(shuffledNumbers, rows, cols)).toBe(true);
    });
  
    test('returns a non-solved shuffled array', () => {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const hole = 0;
      const rows = 3;
      const cols = 3;
  
      const shuffledNumbers = shuffle(numbers, hole, rows, cols);
  
      expect(isSolved(shuffledNumbers)).toBe(false);
    });
  });

  describe('getLinearPosition', () => {
    test('calculates linear position correctly', () => {
      const rows = 4;
      const cols = 4;
  
      expect(getLinearPosition({ row: '0', col: '0' }, rows, cols)).toBe(0);
      expect(getLinearPosition({ row: '1', col: '1' }, rows, cols)).toBe(5);
      expect(getLinearPosition({ row: '2', col: '3' }, rows, cols)).toBe(11);
      expect(getLinearPosition({ row: '3', col: '2' }, rows, cols)).toBe(14);
    });
  
    test('handles non-numeric row and col values', () => {
      const rows = 4;
      const cols = 4;
  
      expect(getLinearPosition({ row: '1a', col: '1b' }, rows, cols)).toBe(5);
      expect(getLinearPosition({ row: '2a', col: '3b' }, rows, cols)).toBe(11);
    });
  });