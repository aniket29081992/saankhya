
//var jwt = require('jwt-simple');
var jwt = require('jsonwebtoken');
// var config = require('../secret');
var util = require('util');
var auth = {
    authenticate: function (req, res) {
        var header = req.headers['authorization'] || '',        // get the header
            token = header.split(/\s+/).pop() || '',            // and the encoded auth token
            auth = new Buffer(token, 'base64').toString(),    // convert from base64
            parts = auth.split(/:/),                          // split on colon
            username = req.body.username,
            password = req.body.password;
        console.log(header)
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 'error',
                "msg": "Authentication failed. Invalid credentials"
            });
            return;
        } else {
            if (username == 'q' && password == 'q')
            {
                res.json({
                    "status": 'suc',
                    "msg": "Authentication failed. Invalid credentials"
                });
            }

        }
    }
}

module.exports = auth;