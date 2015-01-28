
var h2s = document.querySelectorAll('h2');
for (var i = 0, l = h2s.length, buff = []; i < l; i++) {
  h2s[i].style.zIndex = i + 1;
  if (h2s[i].className !== 'section-filler') buff.push(h2s[i]);
}

buff.map(function(el, i) {
  var fun = throttle(maybeResize.bind(el), 100, 100);
  window.addEventListener('scroll', fun);
})

function maybeResize(event) {
  var el = this;
  var pos = getPosition(this).y;
  var init = this.init = this.init || (window.scrollY + pos + 50)
  if (window.scrollY > init) {
    this.style.position = 'fixed';
    this.style.top = '0px';
    this.className = 'active';
    return;
  }
  this.style.position = 'absolute';
  this.style.top = 'initial';
  this.className = '';
}

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition };
}

function throttle (func, wait, max) {
  max = max || 1;
  var rtn; // return value
  var last = 0; // last invokation timestamp
  var count = 0; // number of times invoked
  return function throttled () {
    var now = new Date().getTime();
    var delta = now - last;
    if (delta >= wait) { // reset
      last = now;
      count = 0;
    }
    if (count++ < max) rtn = func.apply(this, arguments);
    return rtn;
  };
}
