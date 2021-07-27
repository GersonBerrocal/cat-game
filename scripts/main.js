"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cat = document.getElementById('cat');
var childsCat = cat.querySelectorAll('div');
var btnControl = document.getElementById('btn-control');
var quadrants = [];
var game = {
  state: false,
  turn: '',
  // x or o
  availableTurn: 9,
  start: function start() {
    this.state = true;
    btnControl.textContent = 'Restart';
    this.turn = this.randomTurn();
    cat.classList.add("turn-".concat(this.turn));
    this.availableTurn = 9;
  },
  end: function end() {
    this.state = false;
    btnControl.textContent = 'Start';

    var _iterator = _createForOfIteratorHelper(quadrants),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var box = _step.value;
        box.value = '';
        box.target.textContent = '';
        box.target.classList.remove('full');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    cat.className = 'cat';
  },
  randomTurn: function randomTurn() {
    var bool = Math.random() < 0.5 ? 'x' : 'o';
    return bool;
  },
  clickQuadrant: function clickQuadrant(index) {
    quadrants[index].value = this.turn;
    quadrants[index].target.textContent = this.turn;
  },
  endTurn: function endTurn(position) {
    quadrants[position].target.classList.add('full');
    cat.classList.remove("turn-".concat(this.turn));
    this.availableTurn--;

    if (this.verify(quadrants[position])) {
      alert("gano : ".concat(this.turn));
      this.state = false;
    } else if (this.availableTurn != 0) {
      this.turn = this.turn == 'x' ? 'o' : 'x';
      cat.classList.add("turn-".concat(this.turn));
    } else {
      alert('Nadie gano');
    }
  },
  verify: function verify(quadrant) {
    var position = quadrant.position;

    if (quadrant.cordy === 2) {
      if (quadrants[position].value === this.turn && quadrants[position - 3].value === this.turn && quadrants[position + 3].value === this.turn) {
        return true;
      }
    } else if (quadrant.cordy === 1) {
      if (quadrants[position].value === this.turn && quadrants[position + 3].value === this.turn && quadrants[position + 6].value === this.turn) {
        return true;
      }
    } else if (quadrant.cordy === 3) {
      if (quadrants[position].value === this.turn && quadrants[position - 3].value === this.turn && quadrants[position - 6].value === this.turn) {
        return true;
      }
    }

    if (quadrant.cordx == 1) {
      if (quadrants[position].value === this.turn && quadrants[position + 1].value === this.turn && quadrants[position + 2].value === this.turn) {
        return true;
      }
    } else if (quadrant.cordx == 2) {
      if (quadrants[position].value === this.turn && quadrants[position - 1].value === this.turn && quadrants[position + 1].value === this.turn) {
        return true;
      }
    } else {
      if (quadrants[position].value === this.turn && quadrants[position - 1].value === this.turn && quadrants[position - 2].value === this.turn) {
        return true;
      }
    }

    if (position % 2 === 0) {
      if (quadrants[0].value === this.turn && quadrants[4].value === this.turn && quadrants[8].value === this.turn) {
        return true;
      } else if (quadrants[2].value === this.turn && quadrants[4].value === this.turn && quadrants[6].value === this.turn) {
        return true;
      }
    }
  }
};
btnControl.addEventListener('click', function () {
  game.state ? game.end() : game.start();
});

var _iterator2 = _createForOfIteratorHelper(childsCat.entries()),
    _step2;

try {
  var _loop = function _loop() {
    var _step2$value = _slicedToArray(_step2.value, 2),
        index = _step2$value[0],
        box = _step2$value[1];

    var np = index + 1;
    quadrants[index] = {
      target: box,
      position: index,
      cordx: [1, 4, 7].find(function (x) {
        return x == np;
      }) != undefined ? 1 : [2, 5, 8].find(function (x) {
        return x == np;
      }) != undefined ? 2 : 3,
      cordy: 1 <= np && np <= 3 ? 1 : np >= 4 && np <= 6 ? 2 : 3,
      value: ''
    };
    box.addEventListener('click', function (e) {
      if (game.state && !box.classList.contains('full')) {
        game.clickQuadrant(index);
        game.endTurn(index);
      }
    });
  };

  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}