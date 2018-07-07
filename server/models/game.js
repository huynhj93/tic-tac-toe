class Game {
  constructor (dimension) {
    // Dimension of the board
    this.dimension = dimension;
    this.gameBoard = [];
    // The playerTurn variable determines whose turn it is. If it's one, it's player one's turn.
    // If it's two, it's player two's turn.
    this.playerTurn = 1;
    this.playerOne = null;
    this.playerTwo = null;
    // The winner variable determines if the game is over, and who has won. If it's one, 
    // it's player one's win. If it's two, it's player two's win.
    this.winner = null;
    // Instantiate an NxN gameboard, i.e. an array of rows
    for (let i = 0; i < dimension; i++) {
      const row = new Array(dimension);
      row.fill(' ');
      this.gameBoard.push(row);
    }
  }

  // insert jsdoc block here
  // Marks a certain square at the rowIdx and colIdx with the char, which is an X or an O.
  markSquare(rowIdx, colIdx, char) {
    if ((!rowIdx && rowIdx != 0) || (!colIdx && colIdx != 0) || !char) {
      throw 'Missing fields... \n';
    }
    if (rowIdx >= this.dimension || colIdx >= this.dimension || rowIdx < 0 || colIdx < 0) {
      throw 'Out of bounds error!';
    }
    if (char != 'X' && char != 'O') {
      throw 'Character must be an X or O \n';
    }
    if (!this.playerOne) {
      this.playerOne = char;
      this.playerTwo = char === 'X' ? 'O' : 'X';
    }
    if ((this.playerTurn === 1 && this.playerOne !== char) || (this.playerTurn === 2 && this.playerTwo !== char)) {
      throw `Player ${this.playerTurn} must place an ${this.playerTurn === 1? this.playerOne : this.playerTwo} \n`;
    }
    if (this.gameBoard[rowIdx][colIdx] !== ' ') {
      throw 'This square is already taken! \n';
    }
    this.toggleTurn();
    this.gameBoard[rowIdx][colIdx] = char;
    this.winner = this.checkWinner(rowIdx, colIdx);
  }

  toggleTurn() {
    this.playerTurn = this.playerTurn === 1 ? 2 : 1;
  }
  // ============= Functions to check for Winner ===================
  checkWinner(rowIdx, colIdx) {
    let rowWinner, columnWinner, mainDiagnolWinner, antiDiagnolWinner;
    if (this.checkRowWin(rowIdx)) {
      rowWinner = this.gameBoard[rowIdx][0];
    }
    if (this.checkColWin(colIdx)) {
      columnWinner = this.gameBoard[0][colIdx];
    }
    if(this.checkIsAlongMainDiagnol(rowIdx, colIdx) && this.checkMainDiagnolWin()) {
      mainDiagnolWinner = this.gameBoard[0][0];
    }
    if(this.checkIsAlongAntiDiagnol(rowIdx, colIdx) && this.checkAntiDiagnolWin()) {
      antiDiagnolWinner = this.gameBoard[0][this.dimension - 1];
    }
    return rowWinner || columnWinner || mainDiagnolWinner || antiDiagnolWinner;
  }

  checkRowWin(rowIdx) {
    const row = this.gameBoard[rowIdx];
    return row.every((char, idx, rowArr) => char === rowArr[0]);
  }

  checkMainDiagnolWin() {
    const mainDiagnol = this.getMainDiagnolArray();
    return mainDiagnol.every((char, idx, mainDiagnol) => char === mainDiagnol[0]);
  }

  checkAntiDiagnolWin() {
    const antiDiagnol = this.getAntiDiagnolArray();
    return antiDiagnol.every((char, idx, antiDiagnol) => char === antiDiagnol[0]);
  }
  checkColWin(colIdx) {
    const col = this.getColumnArray(colIdx);
    return col.every((char, idx, colArr) => char === colArr[0]);
  }
  // ============= End of functions  to check for Winner ===================

  // ============= Start of flattening functions of gameboard ==============
  // A flattened array with the values for the specified column
  getColumnArray(colIdx) {
    const col = [];
    this.gameBoard.forEach(row => {
      col.push(row[colIdx])
    });
    return col;
  }
  // A flattened array with the values for the boards main diagnol
  getMainDiagnolArray() {
    const mainDiagnolArr = [];
    this.gameBoard.forEach((row, idx) => {
      mainDiagnolArr.push(row[idx]);
    });
    return mainDiagnolArr;
  }
  // A flattened array with the values for the boards anti diagnol
  getAntiDiagnolArray() {
    const antiDiagnolArr = [];
    this.gameBoard.forEach((row, idx) => {
      antiDiagnolArr.push(row[(this.gameBoard.length - 1) - idx]);
    });
    return antiDiagnolArr;
  }

  // ============= End of flattening functions for game board ===================

  // ===== Functions to check if a coordinate is along the main/anti  diagnol ========          
  checkIsAlongMainDiagnol(rowIdx, colIdx) {
    // 0 0 is along the Main Diagnol,
    const originToCheck = [0,0];
    // Equation of a line: |x1−x2|= m|y1−y2|, where x1 = 0, x2 = rowIdx, y1 = 0, y2 = colIdx.
    // RowIdx and colIdx are along the main diagnol of (0,0) if m = 1, thus, if the following
    // equation is true, x1−x2|= |y1−y2| then the (rowIdx, colIdx) coordinate is along the diagonol.
    return Math.abs(rowIdx - originToCheck[0]) === Math.abs(colIdx - originToCheck[1]);
  }
  checkIsAlongAntiDiagnol(rowIdx, colIdx) {
    // (0, dimension - 1) is along the Anti Diagnol,
    const originToCheck = [0,this.dimension - 1];
    // Refer to checkIsAlongmainDiagnol for the equation
    return Math.abs(rowIdx - originToCheck[0]) === Math.abs(colIdx - originToCheck[1]);
  }
  // ===== End of Functions to check if a coordinate is along the main/anti  diagnol ========   

  // Resets initial state of board
  resetBoard() {
    this.gameBoard = [];
    for (let i = 0; i < this.dimension; i++) {
      const row = new Array(this.dimension);
      row.fill(' ');
      this.gameBoard.push(row);
    }
    this.winner = null;
    this.playerTurn = 1;
    this.playerOne = null;
    this.playerTwo = null;
  }


  // Renders the game board
  render() {
    const displayedRows = [];
    this.gameBoard.forEach((row, index, rows) => {
      // row is an array of x and o's, join them with a | separator
      // Separate individual columns with |
      let displayedRow = row.join(' | ');
      displayedRows.push(displayedRow);
      // Separate each individual row with '---------'.
      if (index != rows.length - 1) {
        displayedRows.push('-'.repeat(displayedRow.length));
      }
    });
    if (this.winner) {
      // Winner is the previous player turn
      displayedRows.push(`\n The winner is Player ${this.playerTurn === 1 ? 2 : 1}, i.e. ${this.playerTurn === 1? this.playerTwo : this.playerOne }\n Restarting the game...\n`);
      this.resetBoard();
    } else {
      displayedRows.push(`\n It is currently Player ${this.playerTurn}'s turn\n`)
    }
    if (this.gameBoard.every(row => row.every(char => char !== ' '))) {
      displayedRows.push(`The game is tied! \n Restarting the game...\n`);
      this.resetBoard();
    }
    const renderedGame = displayedRows.join('\n');
    return renderedGame;
  }
}

module.exports = Game;
