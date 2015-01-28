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

  return "\nvar currentTheme = window.localStorage.getItem('theme');\nif (!currentTheme) setTheme('dark-theme');\nelse setTheme(currentTheme);\n\nfunction toggleTheme() {\n  setTheme(switchTheme());\n}\n\nfunction setTheme(theme) {\n  window.localStorage.setItem('theme', theme);\n  document.body.className = theme;\n}\n\nfunction switchTheme() {\n  return (window.localStorage.getItem('theme') === 'light-theme' ? 'dark-theme' : 'light-theme');\n}\n"
}