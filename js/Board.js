class Board {
  matrix = Array.from({ length: 10 }, () => Array(10).fill(0));

  rows = this.matrix.length;
  colls = this.matrix[0].length;

  /*
  0 - пусто
  1 - корабль
  2 - промах
  3 - попадание
  -1 - запрещённая клетка
  */


  canIputInPlace(x, y, lengthShip, direction) {
    let dx = 0;
    let dy = 0;

    if (direction === "horizontal") dy = 1;
    else if (direction === "vertical") dx = 1;
    else return false;

    if (
      x + dx * (lengthShip - 1) >= this.rows ||
      y + dy * (lengthShip - 1) >= this.colls
    ) {
      return false;
    }

    // проверка
    for (let i = 0; i < lengthShip; i++) {
      let nx = x + i * dx;
      let ny = y + i * dy;

      if (this.matrix[nx][ny] !== 0) {
        return false;
      }
    }
    return true;
  }

   putInPlace(x, y, lengthShip, direction) {
    if (!this.canIputInPlace(x, y, lengthShip, direction)) {
      return false;
    }

    let dx = 0;
    let dy = 0;

    if (direction === "horizontal") dy = 1;
    else if (direction === "vertical") dx = 1;

    for (let i = 0; i < lengthShip; i++) {
      let nx = x + i * dx;
      let ny = y + i * dy;

      this.matrix[nx][ny] = 1;

      // помечаем окружение
      for (let sx = -1; sx <= 1; sx++) {
        for (let sy = -1; sy <= 1; sy++) {
          let nnx = nx + sx;
          let nny = ny + sy;

          if (
            nnx >= 0 &&
            nnx < this.rows &&
            nny >= 0 &&
            nny < this.colls
          ) {
            if (this.matrix[nnx][nny] === 0) {
              this.matrix[nnx][nny] = -1;
            }
          }
        }
      }
    }
  }

  shotAtShip(x, y) {
    if (this.matrix[x][y] === 1) {
      this.matrix[x][y] = 3;
      return true;
    } else if (this.matrix[x][y] === 0 || this.matrix[x][y] === -1) {
      this.matrix[x][y] = 2;
      return false;
    }
    return null; // уже стреляли
  }

  isShipSunk(x, y) {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      let nx = x;
      let ny = y;

      while (
        nx >= 0 &&
        nx < this.rows &&
        ny >= 0 &&
        ny < this.colls &&
        this.matrix[nx][ny] !== 0 &&
        this.matrix[nx][ny] !== -1
      ) {
        if (this.matrix[nx][ny] === 1) {
          return false;
        }

        nx += dx;
        ny += dy;
      }
    }

    return true;
  }


  isGameOver() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colls; j++) {
        if (this.matrix[i][j] === 1) {
          return false;
        }
      }
    }
    return true; 
  }

  printBoard() {
    console.table(this.matrix);
  }
}
export default Board;

const board = new Board();
board.putInPlace(0, 0, 4, "horizontal");
board.putInPlace(2, 2, 3, "vertical");
board.putInPlace(5, 5, 2, "horizontal");
board.putInPlace(7, 7, 1, "vertical");

board.printBoard();


