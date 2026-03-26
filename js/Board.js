class Board {
  matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  rows = this.matrix.length;
  colls = this.matrix[0].length;

  getStart() {
    return this.matrix;
  }

  putInPlace(x, y, lengthShip, direction) {
    switch (direction) {
      case "vertical":
        if (x + lengthShip > this.rows) {
          console.log("Выход за границы");
          return false;
        }

        for (let i = 0; i < lengthShip; i++) {
          if (this.matrix[x + i][y] !== 0) {
            console.log("Клетка занята");
            return false;
          }
        }
        for (let i = 0; i < lengthShip; i++) {
          this.matrix[x + i][y] = 1;
        }
        break;

      case "horizontal":
        if (y + lengthShip > this.colls) {
          console.log("Выход за границы");
          return false;
        }

        for (let i = 0; i < lengthShip; i++) {
          if (this.matrix[x][y + i] !== 0) {
            console.log("Клетка занята");
            return false;
          }
        }

        for (let i = 0; i < lengthShip; i++) {
          this.matrix[x][y + i] = 1;
        }
        break;

      default:
        console.log("Неверное направление");
        return false;
    }

    return true;
  }
  /*
0 - невыбранная клетка
1 - корабль по которому еще не попали
2 - промах
3 - ранение корабля
 */
  shotAtShip(x, y) {
    if (this.matrix[x][y] === 1) {
      this.matrix[x][y] = 3;
      return true;
    } else if (this.matrix[x][y] === 0) {
      this.matrix[x][y] = 2;
      return false;
    }
    return null;
  }
}
