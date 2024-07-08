const gameBoard = (function() {

  let board = [" ", " ", "X", " ", " ", "X", " ", " ", "X"];

  function log() {
    console.log(board.slice(0, 3));
    console.log(board.slice(3, 6));
    console.log(board.slice(6, 9));
  }

  function reset() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  }

  return { board, log, reset };

})();

const game = (function() {

  let board = gameBoard.board;

  function checkWin() {
    // horizontal check
    for (i = 0; i < 9; i += 3) {
      if (board.slice(i, i+3).join("") == "XXX" || board.slice(i, i+3).join("") == "OOO") {
        console.log(`${board.slice(i, i+1)} won!`);
        return true;
      }
    }

    // vertical check
    for (i = 0; i <= 2; i++) {
      let slice = board.slice(i, i+1) + board.slice(i+3, i+4) + board.slice(i+6, i+7);
      if (slice === "XXX" || slice === "OOO") {
        console.log(`${board.slice(i, i+1)} won!`);
        return true;
      }
    }

  }

  function makeMove(move, pos) {
    if (board[pos] === " ") {
      board.splice(pos, 1, move);
    } else {
      console.log("That spot is already taken!");
    }
  }

  return { makeMove, checkWin };

})();