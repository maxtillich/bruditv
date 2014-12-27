$(function() {
  // FORCE 16:9 VIDEO RATIO
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

  // FULLSCREEN
  $('.fullscreen-button').click(function() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  });

  // FOCUS HUG FOR ANGULAR KEYUP
  $('.hug').focus();
});