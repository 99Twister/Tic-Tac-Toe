const gameBoard = (function() {

  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  function reset() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    display.update();
    document.getElementById("score").innerHTML = "";
    display.mark = 0;
    display.unfreeze()
  }

  function getBoard() {
    return board;
  }

  return { getBoard, reset };

})();

const game = (function() {

  function makeMove(move, pos) {
    const board = gameBoard.getBoard();

    if (board[pos] === " ") {
      board.splice(pos, 1, move.toUpperCase());
      checkWin();
    }

    display.update();
  }

  function checkWin() {
    const board = gameBoard.getBoard();

    function compare(slice) {
      if (slice === "XXX" || slice === "OOO") {
        let winner;

        if (slice === "XXX") {
          winner = display.getPlayers().player1;
        } else {
          winner = display.getPlayers().player2;
        }

        if (winner === "") {
          document.getElementById("score").innerHTML = `${slice[0]} won!`;
          display.freeze();
          return true;
        }

        document.getElementById("score").innerHTML = `${winner} won!`;
        display.freeze();
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
      document.getElementById("score").innerHTML = "The game ended in a tie!";
      return true;
    }

  }

  return { makeMove, checkWin };

})();

const display = (function() {
  const tiles = document.getElementsByClassName("tile");

  function update() {
    const board = gameBoard.getBoard();

    for (let i = 0; i <= 8; i++) {  
      tiles[i].innerHTML = board[i];
    }
  }

  function getPlayers() {
    const player1 = document.getElementById("player1Name").value;
    const player2 = document.getElementById("player2Name").value;

    return { player1, player2 };
  }

  let mark = 0;

  function assignMark() {
    if (mark) {
      game.makeMove("O", this.getAttribute("data-"));
      mark = 0;
    } else {
      game.makeMove("X", this.getAttribute("data-"));
      mark = 1;
    }
  }
  
  for (let tile of tiles) {
    tile.addEventListener("click", assignMark);
  }

  function freeze() {
    for (let tile of tiles) {
      tile.removeEventListener("click", assignMark);
    }
  }

  function unfreeze() {
    for (let tile of tiles) {
      tile.addEventListener("click", assignMark);
    }
  }

  document.getElementById("newGame").addEventListener("click", gameBoard.reset);

  return { mark, update, getPlayers, freeze, unfreeze };

})();