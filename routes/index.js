var express = require('express');
var router = express.Router();
var login=require('./login')
var sendotp=require('./sendotp')
var forgot=require('./forgotpass')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post ('/api/signup', login.signUprequest);
router.post ('/api/login', login.loginRequest);
router.post ('/api/signup/sendotp', sendotp.sendOtp);
router.post ('/api/verifyotp', sendotp.verifyOtp);
router.post ('/api/forgot', forgot.reset);




module.exports = router;
