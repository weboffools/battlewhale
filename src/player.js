class Player {

  attempts = [];

  constructor(name) {
    this.name = name;
  }

  takeTurn(board, x, y) {
    let outcome;
    let sunk;
    if (board.name === 'Computer') {
      [ outcome, sunk ] = board.receiveAttack(x, y);
      this.attempts.push([x, y]);
      return [ outcome, sunk ];
    } else {
      x = this.genRandomNum(10);
      y = this.genRandomNum(10);
      [x, y] = this.randomTurn(this.attempts, x, y);
      [ outcome, sunk ] = board.receiveAttack(x, y);
      this.attempts.push([x, y]);
      return [ outcome, sunk, x, y ];
    }
  }

  genRandomNum(n) {
    return Math.floor(Math.random() * n);
  }

  randomPlace(board) {
    for (let ship in board.ships) {
      let success = 0;
      let name = ship;
      while (success === 0) {
        let x = this.genRandomNum(10);
        let y = this.genRandomNum(10);
        let direction = ['right', 'down'][this.genRandomNum(2)];
        if (board.placeShip(x, y, name, direction)) success = 1;
      }
    }
  }

  randomTurn(attempted, x, y) {
    for (let attempt of attempted) {
      if (String(attempt) === String([x, y])) {
        x = this.genRandomNum(10);
        y = this.genRandomNum(10);
        [x, y] = this.randomTurn(attempted, x, y);
      }
    }
    return [x, y];
  }
}

module.exports = Player;
