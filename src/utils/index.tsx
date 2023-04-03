import _ from 'lodash'

export function getMatrixPosition (index: number, rows: number, cols: number) {
    return {
      row: Math.floor(index / cols),
      col: index % cols
    }
  }

export function getVisualPosition ({row, col}: {row: number, col: number}, width: number, height: number) {
    return {
      x: col * width,
      y: row * height
    }
  }

// Checks if the puzzle can be solved.
export function isSolvable (numbers: number[], rows: number, cols: number) {
    let product = 1
    for (let i = 1, l = rows * cols - 1; i <= l; i++) {
      for (let j = i + 1, m = l + 1; j <= m; j++) {
        product *= (numbers[i - 1] - numbers[j - 1]) / (i - j)
      }
    }
    return Math.round(product) === 1
  }

// Checks if the array is ordered.
export function isSolved (numbers: number[]) {
    for (let i = 0, l = numbers.length; i < l; i++) {
      if (numbers[i] !== i) {
        return false
      }
    }
    return true
  }

// Get the linear index from a row/col pair.
export function getLinearPosition ({row, col}: {row: string, col: string}, rows: number, cols: number) {
    return parseInt(row, 10) * cols + parseInt(col, 10)
  }

// Shuffle the array.
  export function shuffle (numbers: number[], hole: number, rows: number, cols: number) {
    do {
      numbers = _.shuffle(_.without(numbers, hole)).concat(hole)
    } while (isSolved(numbers) || !isSolvable(numbers, rows, cols))
    return numbers
  }
  
  // Checks if the two pieces can be swapped.
  export  function canSwap (src: number, dest: number, rows: number, cols: number) {
    const {row: srcRow, col: srcCol} = getMatrixPosition(src, rows, cols)
    const {row: destRow, col: destCol} = getMatrixPosition(dest, rows, cols)
    return (Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1)
  }
  
  // Swap the two pieces.
  export function swap (numbers: number[], src: number, dest: number) {
    numbers = _.clone(numbers);
    [numbers[src], numbers[dest]] = [numbers[dest], numbers[src]]
    return numbers
  }

  // Calculate the piece size.
  export const calPieceSize = (rows: number) => {
    const isLandScape = window.innerWidth > window.innerHeight;;
    const pieceSize = isLandScape ? window.innerHeight / ( rows + 1 ) : window.innerWidth / ( rows + 1 )
    return pieceSize;
  }