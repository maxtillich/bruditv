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
});