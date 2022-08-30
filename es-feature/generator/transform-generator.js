// https://zhuanlan.zhihu.com/p/473245486?utm_medium=social&utm_oi=42391486595072&utm_psn=1546135324287246336&utm_source=wechat_session
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
g.next(); // { value: 1, done: false }

g.next('param-a'); // { value: 2, done: false }

g.next('param-b'); // { value: 3, done: false }

g.next(); // { value: 'resultValue', done: true }

g.next(); // { value: undefined, done: true }
