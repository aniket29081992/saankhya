var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var cloud = require('../test')
var config=require('../config')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer) {
    return buffer;
    // var cipher = crypto.createCipher(algorithm,password)
    // var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    // return crypted;
}

function decrypt(buffer) {
    return buffer
    // var decipher = crypto.createDecipher(algorithm,password)
    // var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    // return dec;
}

var jsonParser = bodyParser.json();
var teachlogin = {
    login: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;
        var host=config.development.database.host
        var port=config.development.database.port
        var dbname=config.development.database.db

        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        var api = plivo.RestAPI({
            authId: 'MAYJVLZGU4Y2JMODVLNJ',
            authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',
        });


        MongoClient.connect(host,function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var encryPass = encrypt(new Buffer(req.body.teachPass, "utf8")).toString('utf-8');
                        var teacher = db.collection("teacherDetails")
                        teacher.findOne({
                            "teachId": req.body.teachId,
                            "teachPass": encryPass
                        }, function (err, res1) {
                            if (err === null) {
                                if (res1 == null) {
                                    var doc = {"status": "error", "msg": "Invalid credentials"}
                                    res.send(doc)
                                }
                                else {
                                    var newww = []
                                    if(res1.hasOwnProperty("regTokens"))
                                    newww = res1.regTokens

                                    //console.log("dekh lo" + req.body.regToken)

                                    var t = req.body.regToken
                                    if(!newww.includes(t))
                                    newww.push(t)
                                    console.log(newww);
                                    teacher.update({"teachId": req.body.teachId,"blockingStatus":false}, {
                                        $set: {
                                            "regTokens": newww

                                        }
                                    }, function (errrors, resultss) {
                                        if (errrors === null) {
                                            var token;
                                            var random1=  Math.floor(100000 + Math.random() * 900000).toString()
                                            var random2=  Math.floor(100000 + Math.random() * 900000).toString()
                                            var currentTime=new Date().getTime().toString()
                                            token=random1+currentTime+random2
                                            var sessionTeacher=db.collection('sessionDetailsteacher')

                                            var docc={   "teachId": req
                                                .body.teachId,
                                                "status":"active",
                                                "token":token,
                                                "inTime":new Date().getTime().toString(),
                                                "outTime":""}
                                            sessionTeacher.insert(docc)
                                            console.log(resultss)
                                            var doc = {"status": "success", "msg": "Authenticated"}
                                            res.send(doc)
                                        }


                                    })
                                }
                            }
                            else {
                                var doc = {"status": "error", "msg": "Oops something went wrong"}
                                res.send(doc)
                            }

                        })

                    }
                })
            }
        })
    }
}
module.exports = teachlogin
