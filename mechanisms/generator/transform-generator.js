// https://zhuanlan.zhihu.com/p/473245486
//
// import './regenerator-runtime.js';

var _marked = /*#__PURE__*/_regeneratorRuntime().mark(genn);

function genn() {
  var a, b, c;
  return _regeneratorRuntime().wrap(function genn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'saber';

        case 2:
          a = _context.sent;
          console.log(a, 'this is a');
          _context.next = 6;
          return 'archer';

        case 6:
          b = _context.sent;
          console.log(b, 'this is b');
          _context.next = 10;
          return 'rider';

        case 10:
          c = _context.sent;
          console.log(c, 'this is c');
          return _context.abrupt("return", 'resultValue');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var g = genn();
g.next(); // { value: 'saber', done: false }

g.next('param-a'); // { value: 'archer', done: false }

g.next('param-b'); // { value: 'rider', done: false }

g.next(); // { value: 'resultValue', done: true }

g.next(); // { value: undefined, done: true }
