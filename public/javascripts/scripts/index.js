/*!
 * Action
 * 
 * author Jun
 * Github https://github.com/Delete540/Action_server 
 */

'use script';

var action = {};

action.initHeaderNavMenu = function (data) {
  $('#actionHeaderNavMenu').html('');
  $('#actionHeaderNavMenu').append(data);
};

action.initLeftSide = function (data) {
  $('#actionLeftSide').html('');
  $('#actionLeftSide').append(data);
};

action.initContentRight = function(data){
  $('#actionContentRight').html('');
  $('#actionContentRight').append(data);
};


action.initContentCards = function (data) {
  var cardStr = '<div class="card" data-photo="' + data.user_photo + '" data-action-title="' + data.name + '">';

  cardStr += '<div class="card-img"><img class="background" src="' + data.img_url + '" />';
  cardStr += '<span class="text">' + data.user_name + '<br/>' + data.email + '</span><div class="top">';
  cardStr += '<a href="#" class="photo btn-min square circle left"><img src="' + data.user_photo + '" alt="' + data.user_name + '"></a>';
  cardStr += '<a href="#" class="more-vert btn-min square circle bc-alpha-0 right"><i class="material-icons">more_vert</i></a>';
  cardStr += '<a href="#" class="share btn-min square circle bc-alpha-0 right"><i class="material-icons">share</i></a>';
  cardStr += '<a href="#" class="star btn-min square circle bc-alpha-0 right"><i class="material-icons">star</i><span class="data">11</span></a>';
  cardStr += '<a href="#" class="thumb-up btn-min square circle bc-alpha-0 right"><i class="material-icons">thumb_up</i><span class="data">11</span></a></div></div>';
  cardStr += '<div class="card-title"><h5 class="left">' + data.name + '</h5><h6 class="right info hot">hot</h6><h6 class="right info new">new</h6></div><div class="card-content"><p>' + data.desc + '</p></div>';
  cardStr += '<ul class="list"><li><div class="header"><span class="list-title left"><i class="material-icons">date_range</i></span> 时间<span class="list-content right">' + data.start_date + '</span></div></li><li>';
  cardStr += '<div class="header"><span class="list-title left"><i class="material-icons">place</i></span> 地点<span class="list-content right">' + data.addr_name + '</span></div></li><li></li></ul>';
  cardStr += '<div class="card-action"><a class=""><i class="material-icons left">flag</i><h6>加入我们</h6></a></div></div>';

  $('#actionContentCards').append(cardStr);
};

action.initContentCardsData = function (callback) {
  /*$.ajax({
    url: '/', //ajax 与服务器交互地址
    type: 'get',//ajax 方式:get/post,默认是post
    dataType: 'json', //数据类型,默认是json
    cache: false, //是否缓存,默认是true
    async: true, //是否异步,默认是true

    success: function (data) {

      //action.initContentCards(data); 
      if (data && callback && typeof callback === 'function') {
        callback(data);
      }
    },
    error: function (e) {
      console.log(e);
    }
  });*/
 
  var data = [{
    name:'Card Title1',
    img_url:'/img/backup/two.jpg',
    desc:'Description',
    start_date:'2016年12月12日',
    addr_name:'上海',
    user_name:'Test User1',
    user_photo:'/img/backup/60.jpeg',
    email:'test_user1@test.com'
  },{
    name:'Card Title2',
    img_url:'/img/backup/bg3.jpg',
    desc:'Description',
    start_date:'2016年12月12日',
    addr_name:'上海',
    user_name:'Test User2',
    user_photo:'/img/backup/60.jpeg',
    email:'test_user2@test.com'
  },{
    name:'Card Title3',
    img_url:'/img/backup/bac.jpg',
    desc:'Description',
    start_date:'2016年12月12日',
    addr_name:'上海',
    user_name:'Test User3',
    user_photo:'/img/backup/60.jpeg',
    email:'test_user3@test.com'
  }];
  for(var i=0;i<data.length;i++){
    action.initContentCards(data[i]);
  }
};

action.initIndexComponents = function (component, action, callback) {
  $.ajax({
    url: '/index/init', //ajax 与服务器交互地址
    type: 'get',//ajax 方式:get/post,默认是post
    dataType: 'html', //数据类型,默认是json
    cache: false, //是否缓存,默认是true
    async: true, //是否异步,默认是true
    data: {
      component: component,
      action: action
    },
    success: function (data) {
      if (data && callback && typeof callback === 'function') {
        callback(data);
      }
    },
    error: function (e) {
      console.log(e);
    }
  });
};

action.initIndex = function () {

  action.initIndexComponents('headerNavMenu', 'init', function (data) {
    action.initHeaderNavMenu(data);
  });

  action.initIndexComponents('leftSide', 'init', function (data) {
    action.initLeftSide(data);
  });

  action.initContentCardsData();

  action.initIndexComponents('actionContentRight', 'init', function (data) {
    action.initContentRight(data);
  });

  
  
};

$(function () {

  if (window) {
    window.action = action;
  }

  action.initIndex();

});
