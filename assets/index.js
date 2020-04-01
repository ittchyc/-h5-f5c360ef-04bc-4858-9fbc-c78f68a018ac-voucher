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

  // 验证码计时
  $('.get-code').click(function () {
    var count = 60
    var $this = $(this)
    $('.code-num').show();
    $this.hide()
    setInterval(() => {
      if (count > 1) {
        count--
        $('.code-num').text(count + 's')
      } else {
        $this.show();
        $('.code-num').hide();
      }
    }, 1000)
  })

  // 登录
  $('.login-btn').click(function () {
    window.location.href = 'index.html';
  })

  // 退出
  $('.logout').click(function () {
    window.location.href = 'login.html';
  })

  // 语言切换
  $('.lang').click(function () {
    if ($(this).text() === 'English') {
      $(this).text('中 文');
      $('.login-box').css('height', '5rem');
      $('.login-box h1').text('Epidemic prevention and control information collection system in commercial buildings');
      $('.login-box .tip').text('Welcome!');
      $('.form-iphone p').text('Phone');
      $('.form-code p').text('Code');
      $('.form-code .get-code').text('Get Code');
      $('.login-box .tip-2').text('If you have submitted before, you can login with last 6 characters of your ID number.');
      $('.login-box .tip-3').text('Confidentiality commitments: Enterprises and individuals submit sensitive information such as ID numbers and contact information only to relevant government departments of epidemic prevention, and no third party has the right to obtain relevant information.');
      $('.login-box .login-btn').text('Sign in');
    } else {
      $(this).text('English');
      $('.login-box').css('height', '4.3rem');
      $('.login-box h1').text('商务楼宇疫情防控信息采集系统');
      $('.login-box .tip').text('欢迎您的到来！');
      $('.form-iphone p').text('手机号');
      $('.form-code p').text('验证码');
      $('.form-code .get-code').text('获取验证码');
      $('.login-box .tip-2').text('如果您已经有过填报记录，您可以使用最后一次填报时的身份证号码最后六位登录');
      $('.login-box .tip-3').text('保密承诺：企业及个人填报身份证号、联系方式等敏感信息仅提供给政府防疫相关部门，任何第三方无权获取相关信息。');
      $('.login-box .login-btn').text('登 录');
    }
  })

})(jQuery)