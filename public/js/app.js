'use strict';

// Un-hides form element
$('.select-button').on('click', function() {
  event.preventDefault()
  $(this).next().toggleClass('hide-me');
});

// Un-hides form element
$('.btn-update').on('click', function() {
  event.preventDefault()
  $('#hidden-form').removeClass('hide-me');
});
