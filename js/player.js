$(function() {
  var changeRatio = function() {
    var wrapperWidth = $('.videoWrapper').width();
    $('.player').attr('height', wrapperWidth*9/16);
    var playerHeight = $('.player').height() / 2;
    $('.player').css('margin-top', -playerHeight+"px");
  }

  changeRatio();

  $(window).resize(function() {
    changeRatio();
  });

  ui = $('.hug');
  $('.fullscreen-button').click(function(event) {
    event.preventDefault();

    if (ui.requestFullscreen) {
      ui.requestFullscreen();
    } else if (ui.msRequestFullscreen) {
      ui.msRequestFullscreen();
    } else if (ui.mozRequestFullScreen) {
      ui.mozRequestFullScreen();
    } else if (ui.webkitRequestFullscreen) {
      ui.webkitRequestFullscreen();
    }
  });
});