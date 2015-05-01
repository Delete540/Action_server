var express = require('express');
var router = express.Router();
var User=require('../proxy').User;
var session=require('../util/session');
var _ = require('lodash');
var seHelper = require('../middleware/session');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('welcome to Action');
});


/**
 * 用户登录，获取用户信息和属性的相关API path-prefix '/users'
 * @class users-router
 */

/**
 * 登陆验证
 * @deprecated
 */
router.post('/signin',function(req,res,next){
    var user_name=req.body.name;
    User.getUserByLoginName(user_name,function(err,user){
      if(err){
        return next(err);
      }
      if(!user){
        return res.json({message:'账号错误',status:0});
      }

    });
    res.json({message:'welcome',status:1});

});


//注册
//status:1代表成功，0代表已存在账号，2代表账号用户名或者密码格式有问题，-1代表异常或者未知错误
/**
 * 注册
 * @method /signup
 * @param {string} loginname
 * @param {string} passwd
 * @return {json} status:1代表成功，0代表已存在账号，2代表账号用户名或者密码格式有问题，-1代表异常或者未知错误
 */
router.post('/signup', function(req, res) {
  var body = req.body;
  console.log(body);
  var loginname = _.trim(body.loginname);
  var passwd = _.trim(body.passwd);
  if(loginname ==='' || passwd === ''){
    return res.json({message:'账号或者密码格式错误',status:2});
  }
  User.getUserByLoginName(loginname,function (err,user) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    console.log(user);
    if(user){
      return res.json({message:'exist username',status:0});
    }else{
      User.newAndSave({loginname:loginname,passwd:passwd},function (err) {
        if(err){
        	console.err(err.stack);
        	throw err;
        }
        return res.json({message:'done',status:1});
      });
    }
  });
  // res.json({message:'done',status:1});
});



/**
 * 退出登录
 * @mothod /logout
 * @return {json} status:1注销成功，0没有登录，2内部错误
 */
 router.get('/logout',function (req,res,next) {
   req.session.user = null;
   res.json({message:'success',status:1});
 });

 /**
  * 登录
  * @method /login
  * @param {string} loginname
  * @param {string} passwd
  * @return {json} status:1成功，0密码或者账号错误，2内部错误
  *
  */
  router.post('/login',function (req,res,next) {
    var body = req.body;
    var loginname = _.trim(body.loginname);
    var passwd = _.trim(body.passwd);
    if(loginname ==='' || passwd === ''){
      return res.json({message:'账号或者密码格式错误',status:2});
    }
    if(req.session.user){
      return res.json({message:'user had login!',status:2});
    }
    User.getUserByLoginName(loginname,function (err,user) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      console.log(user);
      if(!user || user.length ===0 || user.passwd !== passwd){
        return res.json({message:'loginname or passwd error',status:0});
      }else{
        req.session.user = user;
        return res.json({message:'success',status:1});
      }
    });
  });



/**
 *  账号服务 NOTE 未开放API
 * @method /accountservice
 * @return {json} status:1代表成功，0代表修改失败，2代表账号密码格式有问题，-1代表异常或者未知错误
 */
router.post('/accountservice', seHelper.loginRequire,function(req, res) {
    res.json({message:'',status:1});
});


/**
 * 其他账号登陆  QQ github 手机 NOTE 未开放API
 * @method /3partsignup
 * @return {json} status:1代表成功，0代表账号或密码错误，-1代表异常或未知错误
 */
router.post('/3partsignup', function(req, res) {
    res.json({message:'',status:1});
});




/**
 * 获取自身账号信息
 * @method /profile
 * @return {json} status:1 成功，0 错误，2 未登录
 */
router.get('/profile',seHelper.loginRequire, function(req, res) {
  if(!req.session.user){
    return res.json({message:'please login ',status:2});
  }
  return res.json({message:req.session.user,status:1});
});


/**
 * 获取其他用户的账号信息
 * @method /profile/:uid
 * @param {string} uid User的ObjectId
 * @return {json} status:1 成功，0 错误，2 没有权限
 */
router.get('/profile/:uid',seHelper.loginRequire,function (req,res,next) {
  User.find({_id:uid},{name:1,email:1,phone:1,nickname:1},function (err,user) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({message:user,status:1});
  });
});




module.exports = router;
