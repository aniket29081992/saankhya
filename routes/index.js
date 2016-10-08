var express = require('express');

var router = express.Router();
var login=require('./login')
var sendotp=require('./sendotp')
var sendotp1=require('./sendotpfgpass')
var forgot=require('./forgotpass')
var setdetails=require('./setuserdetail')
var fetch=require('./fetchstudentdetails')
var fetchTeacher=require('./fetchteacherdetails')
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var coll=require('./collgcity')
var fdback=require('./feedback')
var sndmsg=require('./SendMessage/sendmessage')
var sndmsgT=require('./SendMessage/sendmessageteacher')
var page=require('./pagination')
var accept=require('./accept')
var end=require('./endchat')
var teach=require('./teacherlogin')
var teachs=require('./teacherdata')
var list=require('./listteacher')
var block=require('./blockingteacherstudent')
var admin=require('./adminLogin')
var logout=require('./logout')

var avtars=require('./avtars')
// var blocking=require('./bl')
var c=require('./checku')
var auth=require('./auth')
var seen=require('./msgseen')
var rec=require('./received')
var appversion=require('./appversion')
var adminsend=require('./SendMessage/sendmessageadmin')
var sub=require('./sendsubdetails')
var reportmsg=require('./reportmsg')
var refreshtoken=require('./generateFcmtoken')
var sendpush=require('./sendPush')
/* GET home page. */
router.use(multipartyMiddleware);
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.send({"status":"error","msg":"Authentication Error"})
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  }
  if (user.name === 'pinglearn' && user.pass === 'pinglearnadmin') {
    next();
  } else {
    res.send({"status":"error","msg":"Authentication Error"})
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  }
}
var path = require('path');





router.post ('/api/c',auth, c.check111);
router.post ('/api/signup',auth, login.signUprequest);
router.post ('/api/login', auth,login.loginRequest);
router.post ('/api/signup/sendotp',auth, sendotp.sendOtp);
router.post ('/api/signup/verifyotp',auth, sendotp.verifyOtp);
router.post ('/api/forgot',auth, forgot.reset);
router.post ('/api/change',auth, forgot.change);
router.post ('/api/userdetails',auth, setdetails.set);
router.get ('/api/school',auth, coll.college);
router.get ('/api/city',auth, coll.city);
router.post ('/api/sendotp',auth, sendotp1.sendOtp1);
router.post ('/api/verifyotp',auth, sendotp1.verifyOtp1);
router.post ('/api/sendmsg',auth, sndmsg.sendnew);
router.post ('/api/sendmsgadmin',auth, adminsend.sendnewA);
router.post ('/api/sendmsgteach',auth, sndmsgT.sendnewT);
router.post('/api/message/page',auth,page.pagination)
router.post('/api/accept',auth,accept.checkandaccept)
router.post('/api/end',auth,end.endchat)
router.post('/api/teacher/login',auth,teach.login)
router.post('/api/teacher/signup',auth,teachs.signup)
router.post('/api/teacher/update',auth,teachs.update)
router.post('/api/block',auth,block.blocknow)
router.post('/api/admin/login',auth,admin.login)
router.get('/api/fetchuserdetails',auth,fetch.fetch)
router.get('/api/fetchteach',auth,fetchTeacher.fetchTeacher)
router.post('/api/logout',auth,logout.logoutteachstud)
router.post('/api/report',auth,reportmsg.msgreported)
router.get('/api/report/view',auth,reportmsg.viewreports)
router.post('/api/seen',auth,seen.msgseen)
router.post('/api/recv',auth,rec.msgrecv)
router.get('/api/list/teacher',auth,list.listteacher)
router.get('/api/version',auth,appversion.checkversion)
router.get('/api/feedback/view',auth,fdback.viewfeedbacks)
router.get('/api/avtars',auth,avtars.getavtars)
router.get('/api/sublist',auth,sub.sendsub)
router.post('/api/feedback',auth,fdback.feedbackm)
router.post('/api/sendpush',auth,sendpush.sendpush)
router.post('/api/refreshtoken',auth,refreshtoken.generatefcm)
module.exports = router;
