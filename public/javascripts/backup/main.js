window.onload = function() {
  var text = document.getElementById('deleteEffect');
  // console.log(text.style);
  var flag = true;
  setInterval(function() {
    // console.log('point');
    if (flag) {
      text.style.borderRight = 'red 2px solid';
    } else {
      text.style.borderRight = 'red 0px solid';
    }
    flag = !flag;

  }, 800);

  effectBegin(['聚会','郊游','聚餐','KTV','开黑'],text);

  $('#qr-display').click(function (e) {
    e.preventDefault();
    $('.qrcode').toggle();
  });
};

function effectBegin(stra,ele) {
  var sflag = true;
  var index = 0;
  setInterval(function() {
    if (sflag) {
      deleteEffect(stra[index], ele, 1);
    } else {
      deleteEffect(stra[index], ele, -1);
      index++;
    }
    if(index == stra.length)
      index=0;
    sflag = !sflag;
  }, 1500);
}


function deleteEffect(str, ele, move) {
  ele.innerHTML = '';
  var strr = str;
  str = str.split('');
  move = move || 1;
  // str = str.reverse();
  if (move === 1)
    var si = setInterval(function() {
      if (!str || str.length === 0) {
        clearInterval(si);
      }
      var tt = str.shift();
      if (tt) {
        ele.innerHTML += tt;
      }
    }, 20);
  else if (move === -1)
    var sii = setInterval(function() {
      if (!str || str.length === 0) {
        clearInterval(sii);
      }
      str.pop();

      ele.innerHTML = str.join('');

    }, 30);
}

$(function() {
	//console.log('a');
	$(window).load(function() {
		//console.log($(window).width());
		//actionLeftMenuWin();

	});

  $('.action-share').click(function(){
    
  });


	$(window).bind('resize load', function() {

		//actionLeftMenuWin();
		//actionInfoShow();
    $(window).scroll(function () {
      if ($(window).scrollTop() > 200) {
          $(".action-back-top").fadeIn(1000);
    }
    else {
       $(".action-back-top").fadeOut(1000);
     }
   });
            //当点击跳转链接后，回到页面顶部位置
   $(".action-back-top").click(function () {
      $('body,html').animate({ scrollTop: 0 }, 1000);
      return false;
   });



		$('body').removeClass('overflow-hidden');
		var menuBtnM = new SVGMorpheus('#icon');
		/*
		*活动模块初始化，默认显示
		*/
		$('.action-main-child:eq(0)').show().siblings().hide();


		/*
		*top menu bar btn icon动画初始化
		*/

		$('.action-top-center-menu li a').click(function(){
			//console.log('a');
			$(this).addClass('active').parent().siblings().find('a').removeClass('active');
		});

		if($('.action-title').text()===$('.action-top-center-menu li a').text()){


		}


    $('.action-right-search-btn').click(function(){

      $('.action-search').show();
      $('.action-search-close').show();
      $('.action-input-text').trigger('focus');
      $(this).hide();

    });
    $('.action-search-close').click(function(){

      if($(window).width()>600){
      $('.action-right-search-btn').show();
      }
      $('.action-search').hide();
      $(this).hide();
      menuBtnM.to('menu');

    });
    // $('.action-input-search').blur(function (){
    //   $('.action-right-search-btn').show();
    //   $('.action-input-search').hide();
    // });
		//console.log($('.action-top-center-menu li a').length);
		$('.action-left-backdrop').bind('menuBtnM', function(event) {
			event.preventDefault();

		});

		$('.action-right-menu-more').click(function(event) {
			//console.log('a');
			event.stopPropagation();
			if ($('.action-toast').attr('class').match(/active/)) {
				//console.log(true);
				openToast();
			} else if ($('.action-toast').attr('class').match(/default/)) {
				closeToast();
			}
		});
		$(document).click(function() {
			closeToast();
		});





		$('.action-right-search-btn').click(function(){
			console.log('a');
			$('action-input-search').show();
		});

		if($(window).width()<600){
			if(closeLeftMenu()){
				$('.action-main').css('marginTop','64px 0 0 0');
			}else{
				$('.action-main').css('marginTop','64px 0 0 240px');
			}
			/*
			*默认初始化关闭left menu
			*/

			/*
			*left menu control
			*/
			$('.action-top-menu-button').bind('controlLeftmenu',function(event){
		    $(this).click(function(e) {

		  		//
		  		// menuButton.to('menu');
		  		e.stopPropagation();
		  		e.preventDefault();
		  		if ($('.action-left-menu').attr('class').match(/active/)) {
		  			//console.log(true);
		  			openLeftMenu();
		  			openBackdrop();
		  			menuBtnM.to('arrow_back');

		  		} else if ($('.action-left-menu').attr('class').match(/default/)) {
		  			closeLeftMenu();
		  			closeBackdrop();
		  			menuBtnM.to('menu');

		  		}
		  		//console.log($('.action-left-menu').attr('class').match(/active/));
		  	});
		  }).trigger('controlLeftmenu');

			$('.action-left-backdrop').click(function(event) {
				event.stopPropagation();
				menuBtnM.to('menu');

				closeBackdrop();
				closeLeftMenu();
				closeToast();
			});
			$('.action-left-menu').click(function(event) {
				event.stopPropagation();
			});
      $('.action-left-menu-ul .md-icon-button').click(function() {
        menuBtnM.to('arrow_back');
        closeLeftMenu();
        //changeTopMenuBac();
        closeBackdrop();
        //console.log($(this).text());
        $('.action-title-mn').text($(this).text());
      });

			$('.action-top-menu-button-back').click(function(){


				changeTopMenuDef();

				menuBtnM.to('menu');
				$('.action-title-m').text('Us');
				//$('.action-main-user-info').hide();
				//$('.action-main-child:eq(0)').show().siblings().hide();
			});

			/*
			*移动触屏事件
			*/
			var startX, startY;
			document.addEventListener('touchstart', function(ev) {
				startX = ev.touches[0].pageX;
				startY = ev.touches[0].pageY;
			}, false);
			var menuBtnA = new SVGMorpheus('#icon');
			document.addEventListener('touchend', function(ev) {
				var endX, endY;
				endX = ev.changedTouches[0].pageX;
				endY = ev.changedTouches[0].pageY;
				var direction = GetSlideDirection(startX, startY, endX, endY);
        //alert(direction);
				switch (direction) {
				case 0:
					//alert("没滑动");
					//$('.userpanel').animate({left:-pandleWidth})
					break;
				case 1:
					// alert("向上");
					break;
				case 2:
					//  alert("向下");
					break;
				case 3:
					//alert("向左");
					//$('.panel').hide()
					closeLeftMenu();
					closeBackdrop();
					menuBtnM.to('menu');


					closeToast();
					break;
				case 4:
					//alert("向右");
					//$('.panel').show()
					openLeftMenu();
					openBackdrop();
					menuBtnM.to('arrow_back');

					closeToast();
					// menuBtnA.to('arrow_back');
					break;
				default:
				}
			}, false);




		}else{
			closeBackdrop();

		}

	});


	Date.prototype.Format = function(formatStr)
	{
		var str = formatStr;
		var Week = ['日','一','二','三','四','五','六'];

		str=str.replace(/yyyy|YYYY/,this.getFullYear());
		str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

		str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
		str=str.replace(/M/g,(this.getMonth()+1));

		str=str.replace(/w|W/g,Week[this.getDay()]);

		str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
		str=str.replace(/d|D/g,this.getDate());

		str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
		str=str.replace(/h|H/g,this.getHours());
		str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
		str=str.replace(/m/g,this.getMinutes());

		str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
		str=str.replace(/s|S/g,this.getSeconds());

		return str;
	};

	// function timeDif(sdate,edate){
	// 	var dif=edate.getTime()-sdate.getTime();
	// 	return dif;
	// };
	//


	function GetSlideDirection(startX, startY, endX, endY) {
		var dy = startY - endY;
		var dx = endX - startX;
		var result = 0;

		//如果滑动距离太短
		if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
			return result;
		}

		var angle = GetSlideAngle(dx, dy);
		if (angle >= -45 && angle < 45) {
			result = 4;
		} else if (angle >= 45 && angle < 135) {
			result = 1;
		} else if (angle >= -135 && angle < -45) {
			result = 2;
		} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
			result = 3;
		}

		return result;
	}

	function GetSlideAngle(dx, dy) {
		return Math.atan2(dy, dx) * 180 / Math.PI;
	}

	//console.log($('.start-time').html());

	function openLeftMenu() {
		$('.action-left-menu').addClass('action-slide-default').removeClass('action-slide-active');
    $('.action-title-m').text('Me');
		$('body').addClass('overflow-hidden');
	}

	function closeLeftMenu() {
		$('.action-left-menu').addClass('action-slide-active').removeClass('action-slide-default');
    $('.action-title-m').text('Us');
		$('body').removeClass('overflow-hidden');
	}

	function openToast() {
		$('.action-toast').addClass('action-toast-default').removeClass('action-toast-active')
											.css('zIndex',60).stop().show();
	}

	function closeToast() {
		$('.action-toast').addClass('action-toast-active').removeClass('action-toast-default')
											.css('zIndex',0).stop().hide();
	}

	function openBackdrop() {
		$('.action-left-backdrop').addClass('action-left-backdrop-active');
	}

	function closeBackdrop() {
		$('.action-left-backdrop').removeClass('action-left-backdrop-active');
	}
  $('.test').bind('test',function(event){
    $(this).click(function(){
      console.log('a');
    });
  }).trigger('test');

  function changeTopMenuDef() {
		$('.action-top-menu').addClass('action-t-menu-default').removeClass('action-t-menu-active');
    $('.action-top-menu-back').addClass('action-t-menu-active').removeClass('action-t-menu-default');
	}

	function changeTopMenuBac() {
		$('.action-top-menu-back').addClass('action-t-menu-default').removeClass('action-t-menu-active');
    $('.action-top-menu').addClass('action-t-menu-active').removeClass('action-t-menu-default');
	}
});


// window.onload = function () {
// var menuButton=new SVGMorpheus('#icon');
//
// menuButton.to('menu');
// };


var map;
window.onload = function() {
    // 百度地图API
    map = new BMap.Map("actionMapIni", {minZoom:15}); //初始化地图，规定最小缩放
    map.centerAndZoom(new BMap.Point(113.402364,23.056676), 16); //显示中心
    map.enableScrollWheelZoom(); //启用滚轮缩放

		var navigationControl = new BMap.NavigationControl({
	  // 靠左上角位置
	  anchor: BMAP_ANCHOR_TOP_LEFT,
	  // LARGE类型
	  type: BMAP_NAVIGATION_CONTROL_LARGE,
	  // 启用显示定位
	    enableGeolocation: true
	  });
	  map.addControl(navigationControl);
	  // 添加定位控件



    var b = new BMap.Bounds(new BMap.Point(113.363465,23.033239),new BMap.Point(113.42225,23.081655));
    // try {
    //     BMapLib.AreaRestriction.setBounds(map, b); //设置边界
    // } catch (e) {
    //     console.log(e);
    // }
		var geolocation = new BMap.Geolocation();
	  geolocation.getCurrentPosition(function(r){
	  if(this.getStatus() == BMAP_STATUS_SUCCESS){
	    var mk = new BMap.Marker(r.point);
	    map.addOverlay(mk);
	    map.panTo(r.point);
	    console.log(r.point.lng,r.point.lat);
	    point=new BMap.Point(r.point.lng,r.point.lat);
	    setTimeout(function(){
	      map.setZoom(14);
	    }, 1000);
	  }
	  else {
	    $('#mInfo').text('null');
	  }
		},{enableHighAccuracy: true});
		var geolocationControl = new BMap.GeolocationControl();


	  geolocationControl.addEventListener("locationSuccess", function(e){
	  // 定位成功事件
	    var address = '';
	    address += e.addressComponent.province;
	    address += e.addressComponent.city;
	    address += e.addressComponent.district;
	    address += e.addressComponent.street;
	    address += e.addressComponent.streetNumber;
	    alert("当前定位地址为：" + address);
	  });
	  geolocationControl.addEventListener("locationError",function(e){
	    // 定位失败事件
	    alert(e.message);
	  });



};
