// get one random quote
function randomQuote(){
  var obj = quotes[Math.floor(Math.random()*quotes.length)];
  document.querySelector('.quote-value').textContent = obj[':c'];
  if (!obj[':a']) return;
  document.querySelector('.quote-author').textContent = obj[':a'];
}

randomQuote();
