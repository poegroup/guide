var _inspect = require('util').inspect;

exports.inspect = function() {
  var args = [].slice.call(arguments);
  try {
    var str = JSON.stringify(args[0]);
  } catch(e) {
    str = args[0].toString();
  }
  console.log(_inspect(str, {showHidden: false, depth: null, colors: true}));
}
