var express = require('express');
var router = express.Router();
var login=require('./login')
var sendotp=require('./sendotp')
var sendotp1=require('./sendotpfgpass')
var forgot=require('./forgotpass')
var setdetails=require('./setuserdetail')
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var coll=require('./collgcity')
var sndmsg=require('./sendmessage')
var sndmsgT=require('./sendmessageteacher')
var page=require('./pagination')
var accept=require('./accept')
var end=require('./endchat')
var teach=require('./teacherlogin')
var teachs=require('./teacherdata')
var block=require('./blockingteacherstudent')
var admin=require('./adminLogin')
var c=require('./checku')
/* GET home page. */
router.use(multipartyMiddleware);
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.post ('/api/c', c.check111);
router.post ('/api/signup', login.signUprequest);
router.post ('/api/login', login.loginRequest);
router.post ('/api/signup/sendotp', sendotp.sendOtp);
router.post ('/api/signup/verifyotp', sendotp.verifyOtp);
router.post ('/api/forgot', forgot.reset);
router.post ('/api/change', forgot.change);
router.post ('/api/userdetails', setdetails.set);
router.get ('/api/school', coll.college);
router.get ('/api/city', coll.city);
router.post ('/api/sendotp', sendotp1.sendOtp1);
router.post ('/api/verifyotp', sendotp1.verifyOtp1);
router.post ('/api/sendmsg', sndmsg.sendnew);
router.post ('/api/sendmsgteach', sndmsgT.sendnewT);
router.post('/api/message/page',page.pagination)
router.post('/api/accept',accept.checkandaccept)
router.post('/api/end',end.endchat)
router.post('/api/teacher/login',teach.login)
router.post('/api/teacher/signup',teachs.signup)
router.post('/api/block',block.blocknow)
router.post('/api/admin/login',admin.login)
module.exports = router;
