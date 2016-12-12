var express = require('express');
var router = express.Router();
var validator = require('validator');
var Action = require('../../proxy').Action;
var User = require('../../proxy').User;
var xss = require('xss');
var _ = require('lodash');

router.get('/', function (req, res, next) {
  res.render('index', {
    user: req.session.user,
    active: 'active',
    page: 'index',
    title: 'Action'
  });
});

router.get('/init', function (req, res, next) {
  if (req.query.component && req.query.action) {
    res.render(req.query.component, {
      user: req.session.user,
      action: req.query.action,
      component: req.query.component,
      title: 'Action Login'
    });
  }

});

module.exports = router;