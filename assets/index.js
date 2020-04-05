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
    if(!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
      $('#app').html(`<p class="pc-tip">请使用手机访问！</p>`)
    }
    var userInfo = JSON.parse(localStorage.getItem('px_user'));
    if (userInfo) {
      $('.info .-name').text(userInfo.name);
      var iphoneN = userInfo.iphone
      var iphoneD = iphoneN.substr(0, 3) + '****' + iphoneN.substr(7)
      $('.info .-iphone').text(iphoneD);
    }
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
  var datalist = [
    { iphone: '18731233503', name: '韩咏超' },
    { iphone: '15830909959', name: '韩咏超' },
    { iphone: '15120003668', name: '薛成' },
    { iphone: '13244451123', name: '程琳' },
    { iphone: '13126657077', name: '张传晓' }
  ]
  $('.login-btn').click(function () {
    var inp_iphone = $('#inpIphone').val();
    var rule = []
    if (inp_iphone !== '' ) {
      var res = inp_iphone.replace(/\s/g, "");
      rule = datalist.filter(e => {
        return e.iphone === res
      })
    }
    if (inp_iphone === '' || inp_iphone.length !== 13 || rule.length === 0) {
      alert('请输入有效手机号')
    } else {
      var json = JSON.stringify(rule[0]);
      localStorage.setItem('px_user', json);
      window.location.href = 'home.html';
      
    }
  })

  // 退出
  $('.logout').click(function () {
    localStorage.removeItem('px_user');
    window.location.href = 'index.html';
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