const cat = document.getElementById('cat');
const childsCat = cat.querySelectorAll('div');
const btnControl = document.getElementById('btn-control');
let quadrants: {
  target: HTMLDivElement;
  cordx: number;
  cordy: number;
  position: number;
  value: string;
}[] = [];

const game = {
  state: false,
  turn: '', // x or o
  availableTurn: 9,
  start: function () {
    this.state = true;
    btnControl.textContent = 'Restart';
    this.turn = this.randomTurn();
    cat.classList.add(`turn-${this.turn}`);
    this.availableTurn = 9;
  },
  end: function () {
    this.state = false;
    btnControl.textContent = 'Start';
    for (let box of quadrants) {
      box.value = '';
      box.target.textContent = '';
      box.target.classList.remove('full');
    }
    cat.className = 'cat';
  },
  randomTurn: function () {
    const bool = Math.random() < 0.5 ? 'x' : 'o';
    return bool;
  },
  clickQuadrant(index) {
    quadrants[index].value = this.turn;
    quadrants[index].target.textContent = this.turn;
  },
  endTurn: function (position: number) {
    quadrants[position].target.classList.add('full');
    cat.classList.remove(`turn-${this.turn}`);
    this.availableTurn--;
    if (this.verify(quadrants[position])) {
      alert(`gano : ${this.turn}`);
      this.state = false;
    } else if (this.availableTurn != 0) {
      this.turn = this.turn == 'x' ? 'o' : 'x';
      cat.classList.add(`turn-${this.turn}`);
    } else {
      alert('Nadie gano');
    }
  },
  verify: function (quadrant) {
    let position = quadrant.position;
    if (quadrant.cordy === 2) {
      if (
        quadrants[position].value === this.turn &&
        quadrants[position - 3].value === this.turn &&
        quadrants[position + 3].value === this.turn
      ) {
        return true;
      }
    } else if (quadrant.cordy === 1) {
      if (
        quadrants[position].value === this.turn &&
        quadrants[position + 3].value === this.turn &&
        quadrants[position + 6].value === this.turn
      ) {
        return true;
      }
    } else if (quadrant.cordy === 3) {
      if (
        quadrants[position].value === this.turn &&
        quadrants[position - 3].value === this.turn &&
        quadrants[position - 6].value === this.turn
      ) {
        return true;
      }
    }
    if (quadrant.cordx == 1) {
      if (
        quadrants[position].value === this.turn &&
        quadrants[position + 1].value === this.turn &&
        quadrants[position + 2].value === this.turn
      ) {
        return true;
      }
    } else if (quadrant.cordx == 2) {
      if (
        quadrants[position].value === this.turn &&
        quadrants[position - 1].value === this.turn &&
        quadrants[position + 1].value === this.turn
      ) {
        return true;
      }
    } else {
      if (
        quadrants[position].value === this.turn &&
        quadrants[position - 1].value === this.turn &&
        quadrants[position - 2].value === this.turn
      ) {
        return true;
      }
    }
    if (position % 2 === 0) {
      if (
        quadrants[0].value === this.turn &&
        quadrants[4].value === this.turn &&
        quadrants[8].value === this.turn
      ) {
        return true;
      } else if (
        quadrants[2].value === this.turn &&
        quadrants[4].value === this.turn &&
        quadrants[6].value === this.turn
      ) {
        return true;
      }
    }
  },
};

btnControl.addEventListener('click', () => {
  game.state ? game.end() : game.start();
});
for (const [index, box] of childsCat.entries()) {
  const np = index + 1;
  quadrants[index] = {
    target: box,
    position: index,
    cordx:
      [1, 4, 7].find(x => x == np) != undefined
        ? 1
        : [2, 5, 8].find(x => x == np) != undefined
        ? 2
        : 3,
    cordy: 1 <= np && np <= 3 ? 1 : np >= 4 && np <= 6 ? 2 : 3,
    value: '',
  };
  box.addEventListener('click', e => {
    if (game.state && !box.classList.contains('full')) {
      game.clickQuadrant(index);
      game.endTurn(index);
    }
  });
}
