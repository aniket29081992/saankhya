var express = require('express');
var router = express.Router();
var login=require('./login')
var sendotp=require('./sendotp')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post ('/api/signup', login.signUprequest);
router.get ('/api/login', login.loginRequest);
router.post ('/api/signup/sendotp', sendotp.sendOtp);
router.post ('/api/verifyotp', sendotp.verifyOtp);




module.exports = router;
