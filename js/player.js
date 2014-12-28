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
        $(this).addClass('isfullscreen');
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
        $(this).addClass('isfullscreen');
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        $(this).addClass('isfullscreen');
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
        $(this).removeClass('isfullscreen');
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        $(this).removeClass('isfullscreen');
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
        $(this).removeClass('isfullscreen');
      }
    }
  });

  // FOCUS HUG FOR ANGULAR KEYUP
  $('.hug').focus();

  // AUTO HIDE TOOLBARS
  var timer;
  $('.ui').addClass('show-ui');
  $('*').removeClass('hide-cursor');
  setTimeout(function() {
    $('.ui').removeClass('show-ui');
    $('*').addClass('hide-cursor');
    $(window).on('mousemove', function () {
      $('.ui').addClass('show-ui');
      $('*').removeClass('hide-cursor');
      try {
        clearTimeout(timer);
      } catch (e) {}
      timer = setTimeout(function () {
        $('.ui').removeClass('show-ui');
        $('*').addClass('hide-cursor');
      }, 1500);
    });
  }, 2700);
});
