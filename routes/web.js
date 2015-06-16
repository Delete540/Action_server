var express = require('express');
var router = express.Router();
var validator = require('validator');
var Action = require('../proxy').Action;
var User = require('../proxy').User;
var xss = require('xss');
var _ = require('lodash');

router.get('/',function (req,res,next) {
  res.render('index',{
    user:req.session.user,
    active:'active'
  });
});
router.get('/login',function(req,res,next){
  if(req.session.user){
    res.redirect('/web');
  }
  res.render('login');
});
router.get('/signup',function(req,res,next){
  res.render('signup');
});
router.get('/action/:aid',function(req,res,next){
  var aid = req.params.aid?_.trim(req.params.aid):'';
  aid=xss(aid);
  if(!aid || aid.length !== 24){
    return res.json({status:1,message:'invalid objectid'});
  }
  Action.getActionById(aid,function(err,action){
    if(err){
        console.log(err.stack);
        res.json({status:-1,message:'server error'});
        throw err;
      }
      //return res.json({status:0,message:action});
      //console.log(action.creator);

      User.getUserById(action.creator,function(err,usera){
        if(err){
        	console.err(err.stack);
        	throw err;
        }

      return res.render('action',{
          id:action._id,
          action:action,
          creator_name:usera.loginname,
          active:'active',
          title:action.name,
          user:req.session.user,
        });


      });
      //console.log(creator);


  });
});
router.get('/initiate',function(req,res,next){

  if(!req.session.user){
    res.render('login',{
      message:'您未登录，请先登录'

    });
  }else{
    res.render('initiate',{
      user:req.session.user,
      title:'发起',
      active:'active'
    });
  }


});
router.get('/message/:uid',function(req,res,next){
  var uid = req.params.uid?_.trim(req.params.uid):'';
  uid=xss(uid);
  if(!uid || uid.length !== 24){
    return res.json({status:1,message:'invalid objectid'});
  }
  if(!req.session.user){
    res.render('login',{
      message:'您未登录，请先登录'
    });
  }else{
    res.render('message',{
      user:req.session.user,
      title:'消息',
      active:'active'
    });
  }


});

router.get('/user/:uid',function(req,res,next){
  var uid=req.params.uid?_.trim(req.params.uid):'';
  uid=xss(uid);
  if(!uid || uid.length !== 24){
    return res.json({status:1,message:'invalid objectid'});
  }
  res.render('userinfo',{
    user:req.session.user,
    title:req.session.user.name+'主页',
  });
});
router.get('/user',function(req,res,next){
  return res.json({user:req.session.user});
});

router.get('/find',function(req,res,next){
  if(!req.session.user){
    res.render('login',{
      message:'您未登录，请先登录'

    });
  }else{
    res.render('find',{
      user:req.session.user,
      title:'发现',
      active:'active'
    });
  }
});
module.exports = router;
