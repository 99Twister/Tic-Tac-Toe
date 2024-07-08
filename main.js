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

  const board = gameBoard.board;

  function makeMove(move, pos) {
    if (board[pos] === " ") {
      board.splice(pos, 1, move.toUpperCase());
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
        console.log(`${board.slice(i, i+1)} won!`);
        return true;
      }
    }

    // horizontal check
    for (i = 0; i <= 6; i += 3) {
      const slice = board.slice(i, i+3).join("");
      if (compare(slice)) return true;
    }

    // vertical check
    for (i = 0; i <= 2; i++) {
      const slice = board.slice(i, i+1) + board.slice(i+3, i+4) + board.slice(i+6, i+7);
      if (compare(slice)) return true;
    }

    // cross check
    for (i = 2; i <= 4; i += 2) {
      const slice = board.slice(4-i, 5-i) + board.slice(4, 5) + board.slice(4+i, 5+i);
      if (compare(slice)) return true;
    }
  }

  return { makeMove, checkWin };

})();