(function($){
  'use strict';
  var $win = $(window), $body_m = $('body');
  var html = document.getElementsByTagName('html')[0];

  // 获取今天日期
  var todayM = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
  var todayD = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate();
  var today = `${todayM}.${todayD}`;
  // 获取昨天日期
  var data = new Date();
  data.setTime(data.getTime() - 24 * 60 * 60 * 1000);
  var yesterdayM = data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
  var yesterdayD = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
  var yesterday = `${yesterdayM}.${yesterdayD}`;
  $('.card.today .-date').text(today);
  $('.card.yesterday .-date').text(yesterday);

	// Get Window Width Height
	function winwidth () {
		return $win.width();
  }
  function winheight () {
		return $win.height();
	}
  var wwCurrent = winwidth();
  var hhCurrent = winheight();
  $body_m.height(hhCurrent);

  // 移动端 rem
  function remFn () {
    if (html) {
      html.style.fontSize = wwCurrent / 3.75 + 'px';
    }
  }

	$win.on('resize', function () { 
    wwCurrent = winwidth();
    hhCurrent = winheight();
    $body_m.height(hhCurrent);
    remFn()
  });

  // 初始化
  $win.on('load', function() {
    remFn()
  });

})(jQuery)