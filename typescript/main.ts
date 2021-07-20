const cat = document.getElementById('cat');
const childsCat = cat.querySelectorAll('div');
const btnControl = document.getElementById('btn-control');

const game = {
  state: false,
  turn: '', // x or o
  start: function () {
    this.state = true;
    this.turn = this.randomTurn();
    cat.classList.add(`turn-${this.turn}`);
  },
  end: function () {
    this.state = false;
  },
  randomTurn: function () {
    const bool = Math.random() < 0.5 ? 'x' : 'o';
    return bool;
  },
  endTurn: function () {
    cat.classList.remove(`turn-${this.turn}`);
    this.turn = this.turn == 'x' ? 'o' : 'x';
    cat.classList.add(`turn-${this.turn}`);
  },
};

btnControl.addEventListener('click', () => {
  game.state ? game.end() : game.start();
  btnControl.textContent = game.state ? 'Restart' : 'Start';
});
for (const box of childsCat) {
  box.addEventListener('click', e => {
    if (game.state && !box.classList.contains('full')) {
      box.textContent = game.turn;
      box.classList.add('full');
      game.endTurn();
    }
  });
}
