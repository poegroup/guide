
var currentTheme = window.localStorage.getItem('theme');
if (!currentTheme) setTheme('dark-theme');
else setTheme(currentTheme);

function toggleTheme() {
  setTheme(switchTheme());
}

function setTheme(theme) {
  window.localStorage.setItem('theme', theme);
  document.body.className = theme;
}

function switchTheme() {
  return (window.localStorage.getItem('theme') === 'light-theme' ? 'dark-theme' : 'light-theme');
}
