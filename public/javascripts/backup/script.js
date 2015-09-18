
angular.module('ActionApp', ['ngMaterial','ngMdIcons'])
// var app = angular.module('ActionApp', ['ngMaterial'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('defaultTheme')
    .primaryPalette('blue');
})
// $mdThemingProvider.setDefaultTheme('defaultTheme');
.controller('ActionEventCtrl',function ($scope, $timeout, $mdSidenav, $mdUtil, $log){
  $scope.$on('IndexTopMenuChange',function(event,msg){
    //console.log('parent',msg);
    $scope.$broadcast('IndexTopMenuChangeParrent',msg);
  });
})


.controller('IndexTopMenuAppCtrl', function ($scope, $timeout,$http, $mdSidenav,$mdToast,$mdDialog,$mdUtil, $log) {
  $scope.alert = '';

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/html/aboutDialog.html',
      targetEvent: ev,
    });

  };

})


.controller('ActionUserInfoControl', function($scope,$http) {


  //$scope.userPhoto='images/60.jpeg',
  //$scope.form={'loginname':'admin','passwd':'admin'};
  //$http.post('/users/login',$scope.form);
  $http.get('/users/profile').success(function(res){
    $scope.user=res;
    console.log(res);
    //console.log($scope.user.message.photo);
    if($scope.user.message.background===undefined){
      $scope.userInfoBacImg = '/images/two.jpg';
    }
    else{
      $scope.userInfoBacImg = $scope.message.user.background;
    }
    if($scope.user.message.photo===undefined){
      $scope.userPhoto = '/images/60.jpeg';
    }
    else{
      $scope.userPhoto = $scope.message.user.avatar;
    }
    $scope.usern={};
    $scope.usern.email_enable=res.message.user.email_enable;
    $scope.usern.phone_enable=res.message.user.phone_enable;
    $scope.phone=res.message.user.phone;
    $scope.email=res.message.user.email;
  //   $scope.onPhoneChange = function() {
   //
  //     if($scope.phone_enable===false){
  //       $scope.phone=res.message.user.loginname+'未公开联系方式';
  //     }else{
  //       $scope.phone=res.message.user.phone;
  //     }
   //
  //   };
  //   $scope.onEmailChange = function() {
  //   if($scope.email_enable===false){
  //     $scope.email=res.message.user.loginname+'未公开邮箱';
  //   }else{
  //     $scope.email=res.message.user.email;
  //   }
  //  };
  if($scope.usern.email_enable===true){
    $scope.activeE="公开";
  }
  else if($scope.usern.email_enable===false){
    $scope.activeE="未公开";
  }
  if($scope.usern.phone_enable===true){
    $scope.activeP="公开";
  }
  else if($scope.usern.phone_enable===false){
    $scope.activeP="未公开";
  }
   $scope.updateUserInfo=function(){
     if($scope.usern.email_enable===true){
       $scope.activeE="公开";
     }
     else if($scope.usern.email_enable===false){
       $scope.activeE="未公开";
     }
     if($scope.usern.phone_enable===true){
       $scope.activeP="公开";
     }
     else if($scope.usern.phone_enable===false){
       $scope.activeP="未公开";
     }
     $http({
       method  : 'POST',
       url     : '/users/update',
       data    : $.param($scope.usern),  // pass in data as strings
       headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
     }).success(function(data){
        if(data.status===0){
          $(function(){
            $('.action-error-box').text(data.message);
            $('.action-error-box').stop().fadeIn(100);
            setTimeout(function(){
              $('.action-error-box').stop().fadeOut(100);
            },2000);
          });
        }
     });
   };
    // $http.get('/users/profile').success(function(res){
    //
    //
    //   //$scope.u=res;
    //   console.log(res.message.user.email_enable);
    // });

  });
  // $scope.exitAction=function(){
  //   $http.get('/logout').success(function(res){
  //
  //   });
  // };
})
.controller('ActionsInfoControl',function($scope,$http,$filter){
  var url='/';
  var startTime=[],endTime=[],tEEEE=[];
  $scope.actionInfo=[];
  $scope.actionBacImg=[];
  $scope.timeDiff=[];
  $scope.actionInfo.timeDiff=[];
  $http.get(url).success(function(res){
    $scope.action=res;
    //console.log($scope.action.actions[0].end_date);

    for(var i in $scope.action.actions){

      // $scope.actionInfo=$scope.action.actions.name;
      // $scope.actionInfo=$scope.action.actions.desc;
      //$scope.actionInfo[i]=$scope.action.actions[i];
      //startTime[i]=$filter('date')($scope.$scope.action.actions[i].start_date,'yyyy-MM-dd hh:mm:ss');
      //endTime[i]=$filter('date')($scope.$scope.action.actions[i].end_date,'yyyy-MM-dd hh:mm:ss');
      var theTime=[],stime=[],etime=[];
      $scope.action.actions[i].timeDiff='';
      $scope.action.actions[i].EEEE='';
      $scope.action.actions[i].distance='';
      $scope.action.actions[i].attend='';
          stime[i]=new Date($filter('date')($scope.action.actions[i].start_date,'yyyy-MM-dd hh:mm:ss').replace(/-/g, "/"));
          etime[i]=new Date($filter('date')($scope.action.actions[i].end_date,'yyyy-MM-dd hh:mm:ss').replace(/-/g, "/"));

          theTime[i]=parseInt(etime[i].getTime()-stime[i].getTime());
          $scope.action.actions[i].timeDiff=parseInt(theTime[i]/(1000*3600))+'个小时';
          var tEEEE=$filter('date')($scope.action.actions[i].start_date,'EEEE');
          switch(tEEEE){
          case 'Monday':
          $scope.action.actions[i].EEEE='星期一';
            break;
          case 'Tuesday':
          $scope.action.actions[i].EEEE='星期二';
            break;
          case 'Wednesday':
          $scope.action.actions[i].EEEE='星期三';
            break;
          case 'Thursday':
          $scope.action.actions[i].EEEE='星期四';
            break;
          case 'Friday':
          $scope.action.actions[i].EEEE='星期五';
            break;
          case 'Saturday':
          $scope.action.actions[i].EEEE='星期六';
              break;
          case 'Sunday':
          $scope.action.actions[i].EEEE='星期日';
              break;
          default:
        }
      $scope.action.actions[i].distance='2公里';

      if($scope.action.actions[i].picture===undefined){
        $scope.action.actions[i].picture='/images/bac.jpg';
      }
      if($scope.action.actions[i].active===true){
        $scope.action.actions[i].attend='已参加';
      }

    }
    console.log($scope.action.actions[1].timeDiff);
    // for(var i in $scope.action.actions){
    //   //console.log($scope.action.actions[j].name);
    //   //$scope.actionInfo[i].timeDiff=[];
    //   $scope.actionInfo[i]=$scope.action.actions[i];
    //   ///console.log($scope.actionInfo[i].timeDiff[i]);
    // }
    $scope.actionInfoShow=function(obj){
      //console.log($(this).index());
    	if ($(window).width() < 600) {
    		//console.log($(this).index());
    		// $('.action-info-card md-card').on('click',function(){
    		// 	console.log('a');
    		// });
        console.log(obj.target.getAttribute('class'));
        var eleclass=obj.target.getAttribute("class");
        console.log($('.'+eleclass).parent('md-card').index(this));
    	}

    };
    //$scope.aid=$('.action-info-card .action-main-actions').attr('id');
    //console.log($scope.aid);
    $scope.forkGet=function(itemid){
      //console.log(document.getElementById('action-fork').getAttribute('data'));
      console.log(itemid);
      $http.get('/action/fork/'+itemid).success(function(res){
        //console.log(res);
        if(res.status==-1){
          $(function(){
            $('.action-error-box').text('您已加入！');
            $('.action-error-box').stop().fadeIn(100);
            setTimeout(function(){
              $('.action-error-box').stop().fadeOut(100);
            },2000);
          });
        }
        else{
          $(function(){
            $('.action-error-box').text('成功加入！');
            $('.action-error-box').stop().fadeIn(100);
            setTimeout(function(){
              $('.action-error-box').stop().fadeOut(100);
            },2000);
          });
        }
      });
    };

    $scope.starUp=function(itemid){
      //console.log(document.getElementById('action-fork').getAttribute('data'));
      console.log(itemid);
      $http.get('/action/starUp/'+itemid).success(function(res){
        //console.log(res);
        if(res.status==-1){
          $(function(){
            $('.action-error-box').text(res.message);
            $('.action-error-box').stop().fadeIn(100);
            setTimeout(function(){
              $('.action-error-box').stop().fadeOut(100);
            },2000);
          });
        }
        else{
          $(function(){
            $('.action-error-box').text('已赞');
            $('.action-error-box').stop().fadeIn(100);
            setTimeout(function(){
              $('.action-error-box').stop().fadeOut(100);
            },2000);
          });
        }
      });
    };
    $scope.share=function(){
      $('.action-error-box').text('已分享！');
      $('.action-error-box').stop().fadeIn(100);
      setTimeout(function(){
        $('.action-error-box').stop().fadeOut(100);
      },2000);
    };

  });

})
.controller('ActionsInfoByIdControl',function($scope,$http,$filter){
  var url='/web/action/';
  if($scope.userPhoto===undefined){
    $scope.userPhoto = '/images/60.jpeg';
  }
  if($scope.topicImg===undefined){
    $scope.topicImg = '/images/bac.jpg';
  }

  //
  $scope.forkGet=function(){
    $scope.aid=$('.action-main-act-left').attr('id');
    $http.get('/action/fork/'+$scope.aid).success(function(res){
      //console.log(res);
      if(res.status==-1){
        $(function(){
          $('.action-error-box').text('您已加入！');
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
          },2000);
        });
      }
      else{
        $(function(){
          $('.action-error-box').text('成功加入！');
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
            location.href='/web/action/'+$scope.aid;
          },2000);
        });
      }
    });
  };

  $scope.starUp=function(){
    //console.log(document.getElementById('action-fork').getAttribute('data'));
    $scope.aid=$('.action-main-act-left').attr('id');
    //console.log(itemid);
    $http.get('/action/starUp/'+$scope.aid).success(function(res){
      //console.log(res);
      if(res.status==-1){
        $(function(){
          $('.action-error-box').text(res.message);
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
          },2000);
        });
      }
      else{
        $(function(){
          $('.action-error-box').text('已赞');
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
          },2000);
        });
      }
    });
  };
  $scope.exitAction=function(){
    //console.log(document.getElementById('action-fork').getAttribute('data'));
    $scope.aid=$('.action-main-act-left').attr('id');
    //console.log(itemid);
    $http.get('/action/exit/'+$scope.aid).success(function(res){
      //console.log(res);
      if(res.status==-1){
        $(function(){
          $('.action-error-box').text(res.message);
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
          },2000);
        });
      }
      else{
        $(function(){
          $('.action-error-box').text('已退出！');
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
            location.href='/web/action/'+$scope.aid;
          },2000);
        });
      }
    });
  };

})
.controller('ActionPostControl',function($scope,$http){

  $scope.actionData={


  };
  $scope.actionData.type_id={};
  $scope.actionData.addr_position_x='';
  $scope.actionData.addr_position_y='';
  $scope.actionData.addr_name='';
  $scope.actionData.img_url='';
  $scope.addr=function(){
    var local = new BMap.LocalSearch(map, {
      renderOptions:{map: map},
      pageCapacity:5,
      onSearchComplete: function(results){
       // 判断状态是否正确
      if (local.getStatus() == BMAP_STATUS_SUCCESS){

          for (var i = 0; i < results.getCurrentNumPois(); i ++){
            $('#actionMapReuslt ul').append('<li><div class=" md-icon"><ng-md-icon icon="room" style="fill:#ddd" size="28"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg></ng-md-icon></div><span class="action-map-results-span" addx='+results.getPoi(i).point.lng+' addy='+results.getPoi(i).point.lat+'>'+results.getPoi(i).title+','+results.getPoi(i).address+'</span></li>');
                //+s.push(results.getPoi(i).title + ", " + results.getPoi(i).address+results.getPoi(i).point.lng+results.getPoi(i).point.lat)+'</md-radio-button>';
          }
              //document.getElementById("actionMapReuslt").innerHTML = s.join("<br/>");
          $('.action-map-results-span').click(function(){
            //$('.action-position-search-input').val($(this).text()).trigger('focus');
            $scope.actionData.addr_name=$(this).text();
            $scope.actionData.addr_position_x=parseInt($(this).attr('addx'));
            $scope.actionData.addr_position_y=parseInt($(this).attr('addy'));
            //$('.action-position-search-input').attr('addx',$(this).attr('addx'))
            //$('.action-position-search-input').attr('addy',$(this).attr('addy'))
            //console.log($(this).attr('addx'));
            addr=$(this).text();
            x=$(this).attr('addx');
            y=$(this).attr('addy');

            console.log(addr);

          });


      }



      }
    });


    // $('.action-position-search-input').bind('input propertychange',function(e){
	  //
	  //   //console.log($(this).val());
    //
	  // });
    local.search($('.action-position-search-input').val());
    local.setMarkersSetCallback(function (pois) { //插入marker的回调函数
            for(var i = 0; i < pois.length; i++){
                var marker = pois[i].marker;

                marker.addEventListener("click", function(){ //添加监听事件
                    marker_trick = true;
                    var pos = this.getPosition();
                    //var poi = this.getPoi(i);
                    //var poi=this.get;
                    //setAdress_s(pos.lng, pos.lat);
                    //console.log(poi);
                    //$scope.actionData.addr_name=pos.title;
                    $scope.actionData.addr_position_x=pos.lng;
                    $scope.actionData.addr_position_y=pos.lat;
                })
            }
        });
  };

  $scope.processForm = function() {
    $http({
        method  : 'POST',
        url     : '/action/new',
        data    : $.param($scope.actionData),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);

            if (data.status==-1) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.status;
                $scope.errorSuperhero = data.message;
                $(function(){
                  $('.action-error-box').text('网络错误，提交失败');
                  $('.action-error-box').stop().fadeIn(100);
                  setTimeout(function(){
                    $('.action-error-box').stop().fadeOut(100);
                  },2000);
                });

            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
                $(function(){
                  $('.action-error-box').text('提交成功！');
                  $('.action-error-box').stop().fadeIn(100);
                  setTimeout(function(){
                    $('.action-error-box').stop().fadeOut(100);
                  },2000);
                });
            }
        });
    };
    $scope.uploadImg=function(){
      $http({
          method  : 'POST',
          url     : '/action/uploadImg',
          data    : $.param($scope.actionData),  // pass in data as strings
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
          .success(function(data) {
              console.log(data);

              if (data.status==1) {
                  // if not successful, bind errors to error variables
                  $scope.errorName = data.status;
                  $scope.errorSuperhero = data.url;
                  $(function(){
                    $('.action-error-box').text($scope.errorSuperhero);
                    $('.action-error-box').stop().fadeIn(100);
                    setTimeout(function(){
                      $('.action-error-box').stop().fadeOut(100);
                    },2000);
                  });

              } else {
                  // if successful, bind success message to message
                  $scope.url = data.url;
                  $(function(){
                    $('.action-error-box').text('提交成功！');
                    $('.action-error-box').stop().fadeIn(100);
                    setTimeout(function(){
                      $('.action-error-box').stop().fadeOut(100);
                    },2000);
                  });
              }
          });
    };



    //console.log($scope.aid);


})
.controller('ActionUserSignControl',function($scope,$http){
  $scope.userinfoData={};
  $scope.login=function(){
    $http({
        method  : 'POST',
        url     : '/users/login',
        data    : $.param($scope.userInfoData),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);

            if (data.status==1) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.status;
                $scope.errorSuperhero = data.message;
                $(function(){
                  $('.action-error-box').text($scope.errorName);
                  $('.action-error-box').stop().fadeIn(100);
                  setTimeout(function(){
                    $('.action-error-box').stop().fadeOut(100);
                  },2000);
                });

            }else if(data.status==2){
              $scope.errorName = data.status;
              $scope.errorSuperhero = data.message;
              $(function(){
                $('.action-error-box').text('您已经登录了');
                $('.action-error-box').stop().fadeIn(100);
                setTimeout(function(){
                  $('.action-error-box').stop().fadeOut(100);
                  location.href='/web';
                },2000);
              });
            }
            else {
                // if successful, bind success message to message
                $scope.message = data.message;
                $(function(){
                  $('.action-error-box').text('提交成功！');
                  $('.action-error-box').stop().fadeIn(100);
                  setTimeout(function(){
                    $('.action-error-box').stop().fadeOut(100);
                    location.href='/web';
                  },2000);
                });
            }
        });
  };
  $scope.signup=function(){
    $http({
        method  : 'POST',
        url     : '/users/signup',
        data    : $.param($scope.userInfoData),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);

            if (data.status==1) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.status;
                $scope.errorSuperhero = data.message;
                $(function(){
                  $('.action-error-box').text($scope.errorSuperhero);
                  $('.action-error-box').stop().fadeIn(100);
                  setTimeout(function(){
                    $('.action-error-box').stop().fadeOut(100);
                    location.href='/web/login';
                  },2000);
                });

            }else if(data.status==2){
              $scope.errorName = data.status;
              $scope.errorSuperhero = data.message;
              $(function(){
                $('.action-error-box').text($scope.errorSuperhero);
                $('.action-error-box').stop().fadeIn(100);
                setTimeout(function(){
                  $('.action-error-box').stop().fadeOut(100);
                  location.href='/web/login';
                },2000);
              });
            }
            else if(data.status===0){
                // if successful, bind success message to message
                $scope.message = data.message;
                $(function(){
                  $('.action-error-box').text($scope.message );
                  $('.action-error-box').stop().fadeIn(100);
                  setTimeout(function(){
                    $('.action-error-box').stop().fadeOut(100);

                  },2000);
                });
            }
        });
  };
  $scope.logout=function(){
    $http.get('/users/logout').success(function(res){
      //console.log(res);
      if(res.status==1){
        $(function(){
          $('.action-error-box').text('已退出！');
          $('.action-error-box').stop().fadeIn(100);
          setTimeout(function(){
            $('.action-error-box').stop().fadeOut(100);
            location.href='/web';
          },2000);


        });
      }
      // else{
      //   $(function(){
      //     $('.action-error-box').text('成功加入！');
      //     $('.action-error-box').stop().fadeIn(100);
      //     setTimeout(function(){
      //       $('.action-error-box').stop().fadeOut(100);
      //     },2000);
      //   });
      // }
    });
  };
})
.controller('ActionSearchControl',function($scope,$http){
  $scope.searchResult='';

  $scope.seachAction=function(){
    $http({
        method  : 'GET',
        url     : '/search/name',
        data    : $.param($scope.key),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    }).success(function(data) {
        console.log(data);

        if (data.status===0) {
            // if not successful, bind errors to error variables
            $scope.errorName = data.status;
            $scope.searchResult = data.message;
            console.log($scope.searchResult);




        } else {
            // if successful, bind success message to message
            // $scope.message = data.message;
            // $(function(){
            //   $('.action-error-box').text('提交成功！');
            //   $('.action-error-box').stop().fadeIn(100);
            //   setTimeout(function(){
            //     $('.action-error-box').stop().fadeOut(100);
            //   },2000);
            // });
        }
    });

    // $http.get('/search/name').success(function(res){
    //   //console.log(res);
    //   if(res.status===0){
    //     $scope.searchResult=res;
    //   console.log(res);
    //   }
    //   else{
    //
    //   }
    // });
  };
})
.directive('actionsInfo',function(){
  return {
    restrict : 'E',
		template : '<ul class="md-list-item-text action-list-info-text">111</ul>',
    link : function($scope,$element,$attrs){
      // var url='/';
      // $scope.action='';
      // $http.get(url).success(function(res){
      //   $scope.action=res;
      // });

      //console.log($scope.action);
    }
  };
});


function DialogController($scope, $mdDialog) {
$scope.hide = function() {
  $mdDialog.hide();
};
$scope.cancel = function() {
  $mdDialog.cancel();
};
$scope.answer = function(answer) {
  $mdDialog.hide(answer);
};
}
