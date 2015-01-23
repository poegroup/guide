var REVEAL_TIME = 2000;

var fileContent = document.createElement('div');
fileContent.className = 'filetree-content';
var subsection = document.body.querySelector('.filetree');
subsection.appendChild(fileContent);
var fileHelp = document.querySelector('.filetree-help');

var lines = document.querySelectorAll('.line .text-code');
var arr = [];
for(var i = 0; i < lines.length; i++) arr[i] = lines[i];

arr.forEach(function(line, idx){
  line = arr[idx];
  if (~line.className.indexOf('ignored')) return;
  var content = line.parentElement.children[line.parentElement.children.length - 1]
  if (content.className !== 'inner') content = false;
  else fileContent.appendChild(content);

  line.addEventListener('mouseenter', toggle);
  line.addEventListener('mouseleave', toggle);
  line.addEventListener('click', toggle);

  function toggle(ev) {
    var box = ev.target.nextElementSibling;
    var parent = ev.target.parentElement;
    var parentActive = ~parent.className.indexOf('active');
    if (ev.type === 'click') box.checked = !box.checked;
    if (ev.type === 'mouseleave' && !box.checked && parentActive) activate(parent);
    if (ev.type === 'mouseenter' && !parentActive) deactivate(parent);
  }

  var timeout;

  function activate(el) {
    el.className = 'text';
    content.className = 'inner';
    fileHelp.className = 'filetree-help hidden'
  }

  function deactivate(el) {
    el.className = 'text active';
    content.className = 'inner active';
    reset();
  }

  function clear() {
    fileHelp.className = 'filetree-help hidden'
    window.clearTimeout(timeout);
    timeout = false;
  }

  function reset() {
    clear();
    timeout = window.setTimeout(reveal, REVEAL_TIME);
  }

  function reveal() {
    var active = document.querySelectorAll('.filetree-content .active')
    if (active.length) return;
    fileHelp.className = 'filetree-help'
  }
});
