var express = require('express');
var router = express.Router();
var login=require('./login')
var sendotp=require('./sendotp')
var sendotp1=require('./sendotpfgpass')
var forgot=require('./forgotpass')
var setdetails=require('./setuserdetail')
var coll=require('./collgcity')

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.post ('/api/signup', login.signUprequest);
router.post ('/api/login', login.loginRequest);
router.post ('/api/signup/sendotp', sendotp.sendOtp);
router.post ('/api/signup/verifyotp', sendotp.verifyOtp);
router.post ('/api/forgot', forgot.reset);
router.post ('/api/userdetails', setdetails.set);
router.get ('/api/school', coll.college);
router.get ('/api/city', coll.city);
router.post ('/api/sendotp', sendotp1.sendOtp1);
router.post ('/api/verifyotp', sendotp1.verifyOtp1);

module.exports = router;
