var express = require('express');
var router = express.Router();
var login=require('./login')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post ('/api/login', login.signUprequest);

module.exports = router;
