"use strict";function _createForOfIteratorHelper(a,b){var c="undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(!c){if(Array.isArray(a)||(c=_unsupportedIterableToArray(a))||b&&a&&"number"==typeof a.length){c&&(a=c);var d=0,e=function(){};return{s:e,n:function n(){return d>=a.length?{done:!0}:{done:!1,value:a[d++]}},e:function e(a){throw a},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,g=!0,h=!1;return{s:function s(){c=c.call(a)},n:function n(){var a=c.next();return g=a.done,a},e:function e(a){h=!0,f=a},f:function f(){try{g||null==c["return"]||c["return"]()}finally{if(h)throw f}}}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}var cat=document.getElementById("cat"),childsCat=cat.querySelectorAll("div"),btnControl=document.getElementById("btn-control"),game={state:!1,turn:"",// x or o
start:function start(){this.state=!0,this.turn=this.randomTurn(),cat.classList.add("turn-".concat(this.turn))},end:function end(){this.state=!1},randomTurn:function randomTurn(){var a=.5>Math.random()?"x":"o";return a},endTurn:function endTurn(){cat.classList.remove("turn-".concat(this.turn)),this.turn="x"==this.turn?"o":"x",cat.classList.add("turn-".concat(this.turn))}};btnControl.addEventListener("click",function(){game.state?game.end():game.start(),btnControl.textContent=game.state?"Restart":"Start"});var _step,_iterator=_createForOfIteratorHelper(childsCat);try{var _loop=function(){var a=_step.value;a.addEventListener("click",function(){game.state&&!a.classList.contains("full")&&(a.textContent=game.turn,a.classList.add("full"),game.endTurn())})};for(_iterator.s();!(_step=_iterator.n()).done;)_loop()}catch(a){_iterator.e(a)}finally{_iterator.f()}