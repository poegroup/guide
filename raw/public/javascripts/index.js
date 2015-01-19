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

  return "/**\n * Module dependencies\n */\n\nvar App = require('poe-ui');\n\n/**\n * Expose the app\n */\n\nvar app = module.exports = App('PROJECT');\n\n/**\n * Load plugins here with the 'use' method:\n *\n *   app.use(require('modal'));\n *\n */\n"
}