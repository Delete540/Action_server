var express = require('express');
var router = express.Router();
var validator = require('validator');
var Action = require('../../proxy').Action;
var User = require('../../proxy').User;
var xss = require('xss');
var _ = require('lodash');

router.get('/',function (req,res,next) {
  res.render('admin/index',{
    user:req.session.user,
    active:'active',
    page:'index'
  });
});
module.exports = router;