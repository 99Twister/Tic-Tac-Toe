const gameBoard = (function() {

  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

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

  function makeMove(move, pos) {
    if (board[pos] === " ") {
      board.splice(pos, 1, move);
    } else {
      console.log("That spot is already taken!");
    }
  }

  return { makeMove, checkWin };

})();