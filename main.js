const gameBoard = (function() {

  let board = [" ", "O", "X", "O", "O", "X", "O", "X", "O"];

  function log() {
    console.log(board.slice(0, 3));
    console.log(board.slice(3, 6));
    console.log(board.slice(6, 9));
  }

  function reset() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    gameBoard.log();
  }

  return { board, log, reset };

})();

const game = (function() {

  const board = gameBoard.board;

  function makeMove(move, pos) {
    if (board[pos] === " ") {
      board.splice(pos, 1, move.toUpperCase());
      gameBoard.log();
      if (checkWin()) {
        if (prompt("Start new game? Y/N").toUpperCase() === "Y") {
          gameBoard.reset();
        } 
      }
    } else {
      console.log("That spot is already taken!");
    }
  }

  function checkWin() {

    function compare(slice) {
      if (slice === "XXX" || slice === "OOO") {
        console.log(`${slice[0]} won!`);
        return true;
      }
      return false;
    }

    // horizontal check
    for (let i = 0; i <= 6; i += 3) {
      const slice = board.slice(i, i + 3).join("");
      if (compare(slice)) return true;
    }

    // vertical check
    for (let i = 0; i <= 2; i++) {
      const slice = board[i] + board[i + 3] + board[i + 6];
      if (compare(slice)) return true;
    }

    // diagonal check
    // 4 is the center of the board, i is the distance between
    for (let i = 2; i <= 4; i += 2) {
      const slice = board[4 - i] + board[4] + board[4 + i];
      if (compare(slice)) return true;
    }

    // tie check
    if (!board.includes(" ")) {
      console.log("The game ended in a tie!");
      return true;
    }

  }

  return { makeMove, checkWin };

})();