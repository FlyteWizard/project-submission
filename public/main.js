// When document is ready
$(document).ready(function() {
  // Get JSON through the API
  $.getJSON('https://baconipsum.com/api/?callback=?',
    { 'type':'all-meat', 'sentences':'1' },
    function(baconGoodness) {
      // Assign text to the data
      let text = baconGoodness[0];
      // Place it into the HTML
      document.getElementById('footer-ipsum-start').innerHTML = text;
  });
  // Get JSON through the API
  $.getJSON('https://baconipsum.com/api/?callback=?',
    { 'type':'meat-and-filler', 'sentences':'3' },
    function(baconGoodness) {
      // Assign text to the data
      let text = baconGoodness[0];
      // Place it into the HTML
      document.getElementById('footer-ipsum-middle').innerHTML = text;
  });
  // Get JSON through the API
  $.getJSON('https://baconipsum.com/api/?callback=?',
    { 'type':'meat-and-filler', 'sentences':'2' },
    function(baconGoodness) {
      // Assign text to the data
      let text = baconGoodness[0];
      // Place it into the HTML
      document.getElementById('footer-ipsum-end').innerHTML = text;
  });
});
