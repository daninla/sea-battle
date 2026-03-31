import Board from "./Board.js";

class Game {
  constructor() {
    this.playerBoard = new Board();
    this.enemyBoard = new Board();
    this.currentTurn = "player";
    this.gameOver = false;
  }

  start() {
    this.playerBoard.canIputInPlace();
    this.enemyBoard.canIputInPlace();
    this.currentTurn = "player";
    this.gameOver = false;
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === "player" ? "enemy" : "player";
  }

  shoot(x, y) {
    if (this.gameOver) return alert("Game is over!");

    let targetBoard = this.currentTurn === "player" ? this.enemyBoard : this.playerBoard;
    let hit = targetBoard.shotAtShip(x, y);

    if (hit === null) return; // если уже стреляли в эту клетку

    console.log(hit ? "Hit!" : "Miss!");

    if (!hit) this.switchTurn(); // промах → меняем ход

    if (targetBoard.isGameOver()) {
      this.gameOver = true;
      alert(this.currentTurn + " wins!");
    }
  }

  gameOverCheck() {
    if (this.playerBoard.isGameOver()) {
      this.gameOver = true;
      alert("Game Over! Enemy wins!");
    } else if (this.enemyBoard.isGameOver()) {
      this.gameOver = true;
      alert("Game Over! Player wins!");
    }
  }
}
export default Game;