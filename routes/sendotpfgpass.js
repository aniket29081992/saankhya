var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var config=require('../config')

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer) {
    //return buffer;
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
// }
}
function decrypt(buffer){
   // return buffer;
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
}

var jsonParser = bodyParser.json();
var sendotpfg = {

    sendOtp1: function (req, res) {
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
                        var otpcol = db.collection("otp");
                        var prof=db.collection("digo")
                        var otpcode=  Math.floor(1000 + Math.random() * 9000)
                        //already present then check db and send
                        var encryptedPhone=encrypt(new Buffer(req.body.phone, "utf8"))
                        prof.findOne({"phone": encryptedPhone.toString('utf-8')}, function (err11, resu1) {
                            if(err11===null)
                            {
                                if(resu1!=null)
                                {



                                    otpcol.findOne({"phone": encryptedPhone.toString('utf-8')}, function (err, res1) {
                                        if (err === null) {
                                            if (res1 === null) {

                                                var doc = {
                                                    "phone": encryptedPhone.toString('utf-8'),
                                                    "otp": otpcode,
                                                    "valid": new Date().getTime() + 15 * 60 * 1000
                                                }
                                                otpcol.insert(doc, function (err, result) {
                                                    if (err == null) {
                                                        api.send_message({
                                                            'src': '+16314462144',
                                                            'dst':  req.body.cCode+req.body.phone,
                                                            'text':  otpcode+" is the OTP to verify your phone number on Pinglearn.",
                                                            'url': "https://api.plivo.com/v1/Account/" + 'MAYJVLZGU4Y2JMODVLNJ' + "/Message/", // The URL to which with the status of the message is sent
                                                            'method': "POST"
                                                        }, function (status, response) {
                                                            if (status >= 200 && status < 300) {
                                                                console.log('Successfully made call request.');
                                                                var data = {"status": "success", "msg": "OTP sent successfully"}
                                                                res.send(data);
                                                                console.log('Response:', response);
                                                            } else {
                                                                console.log('Oops! Something went wrong.');
                                                                var data = {"status": "error", "msg": response}
                                                                res.send(data);
                                                                console.log('Status:', status);
                                                                console.log('Response:', response);
                                                            }
                                                        });

                                                    }
                                                    else if (err !== null) {
                                                        var data = {"status": "error", "msg": "Some problem has occured"}
                                                        res.send(data);
                                                    }

                                                })
                                                //do as below
                                            }
                                            else if (res1 !== null) {

                                                var checkValid = res1.valid;
                                                var timeNow = new Date().getTime();
                                                if (checkValid > timeNow) {
                                                    var api2 = plivo.RestAPI({
                                                        authId: 'MAYJVLZGU4Y2JMODVLNJ',
                                                        authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',
                                                    });
                                                    api2.send_message({
                                                        'src': '+16314462144',
                                                        'dst': req.body.cCode+req.body.phone,
                                                        'text': res1.otp+" is the OTP to verify your phone number on Pinglearn.",
                                                        'url': "https://api.plivo.com/v1/Account/" + 'MAYJVLZGU4Y2JMODVLNJ' + "/Message/", // The URL to which with the status of the message is sent
                                                        'method': "POST"
                                                    }, function (status, response) {
                                                        if (status >= 200 && status < 300) {
                                                            console.log('Successfully made call request.');
                                                            var data = {"status": "success", "msg": "OTP sent successfully"}
                                                            res.send(data);

                                                        } else {
                                                            console.log('Oops! Something went wrong.111');
                                                            var data = {"status": "error", "msg": response}
                                                            res.send(data);
                                                        }
                                                    });

                                                }
                                                else {
                                                    var otpcode1 = Math.floor(1000 + Math.random() * 9000)
                                                    var encryptedPhone2 = encrypt(new Buffer(req.body.phone, "utf8"))
                                                    otpcol.update({"phone": encryptedPhone2.toString('utf-8')}, {
                                                        $set: {
                                                            "phone": encryptedPhone2.toString(),
                                                            "otp": otpcode1,
                                                            "valid": new Date().getTime() + 15 * 60 * 1000
                                                        }
                                                    }, function (err, resnew) {
                                                        if (err === null) {
                                                            var api1 = plivo.RestAPI({
                                                                authId: 'MAYJVLZGU4Y2JMODVLNJ',
                                                                authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',
                                                            });
                                                            api1.send_message({
                                                                'src': '+16314462144',
                                                                'dst': req.body.cCode+req.body.phone,
                                                                'text': otpcode1+" is the OTP to verify your phone number on Pinglearn.",
                                                                'url': "https://api.plivo.com/v1/Account/" + 'MAYJVLZGU4Y2JMODVLNJ' + "/Message/", // The URL to which with the status of the message is sent
                                                                'method': "POST"
                                                            }, function (status, response) {
                                                                if (status >= 200 && status < 300) {
                                                                    console.log('Successfully made call request.');
                                                                    var data = {
                                                                        "status": "success",
                                                                        "msg": "OTP sent successfully"
                                                                    }
                                                                    res.send(data);
                                                                    console.log('Response:', response);
                                                                } else {
                                                                    console.log('Oops! Something went wrong.');
                                                                    var data = {"status": "error", "msg": response}
                                                                    res.send(data);
                                                                    console.log('Status:', status);
                                                                    console.log('Response:', response);
                                                                }
                                                            });

                                                        }

                                                    })

                                                    // update db
                                                }


                                            }
                                        }

                                    });
                                }
                                else
                                {
                                    var doc={"status":"error","msg":"User does not exist"};
                                    res.send(doc);
                                }
                            }
                            else
                            {
                                var doc={"status":"error","msg":"Oops something went wrong"};
                                res.send(doc);
                            }
                            //change
                        });
                    }

                });
            }
        });


    },
    verifyOtp1: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;
        var host=config.development.database.host
        var port=config.development.database.port
        var dbname=config.development.database.db

        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        MongoClient.connect(host,function (err,db) {
            if(err===null)
            {
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {


                        var otpcol = db.collection("otp");
                        //already present then check db and send
                        var encryptedPhone=encrypt(new Buffer(req.body.phone, "utf8"))
                        otpcol.findOne({"phone": encryptedPhone.toString('utf-8')},function (err, res1) {
                            if(err===null)
                            {
                                if(res1===null)
                                {
                                    var doc={"status":"error","msg":"Phone number not present"}
                                    res.send(doc);
                                }
                                else
                                {
                                    var dbOtp=res1.otp;
                                    var checkOtp=req.body.otp;
                                    if(checkOtp===dbOtp)
                                    {
                                        var doc={"status":"success","msg":"OTP verified successfully."}
                                        res.send(doc);
                                    }
                                    else
                                    {
                                        var doc={"status":"error","msg":"Incorrect OTP."}
                                        res.send(doc);
                                    }

                                }
                            }
                            else
                            if(err!=null)
                            {
                                var doc={"status":"error","msg":"Something went wrong."}
                                res.send(doc);
                            }

                        })

                    }})

            }


        })

    }
}
module.exports = sendotpfg;