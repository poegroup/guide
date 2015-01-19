module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, thunk) {
    var val = obj[prop];
    if (Array.isArray(val)) return val.map(thunk).join('');
    if ('function' == typeof val) return val.call(obj, thunk(obj));
    if (negate) val = !val;
    if (val) return thunk(obj);
    return '';
  };

  return "/**\n * Expose the application.\n */\n\nvar app = module.exports = require('poe-ui')();\n"
}