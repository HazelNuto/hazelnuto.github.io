$(document).ready(function() {
  $('#particles').particleground({
    dotColor: 'lightgrey',
    lineColor: 'white'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});

