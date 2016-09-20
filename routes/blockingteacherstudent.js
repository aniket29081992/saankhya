var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var config=require('../config')
var cloud = require('../test')

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
var block = {
    blocknow: function (req, res) {
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
                        var teacher = db.collection("teacherDetails")
                        teacher.findOne({
                                "teachId": req.body.teachId,

                            }, function (err, res1) {
                                if (err === null) {
                                    if(res1==null)
                                    {
                                        var doc={"status":"error","msg":"No techer found."}
                                        res.send(doc)
                                    }
                                    else
                                    {
                                        var teacher = db.collection("teacherDetails")

                                        var regTokens=[]
                                        var doc={"firstName":req.body.firstName,"lastName":req.body.lastName,
                                            "teachId":req.body.teachId,"teachPass":req.body.teachPass,"subIds":req.body.subIds,
                                            "availStatus":"active","blockingStatus":"active"}
                                        teacher.update({"teachId": req.body.teachId}, {
                                            $set: {
                                                "blockingStatus": "inactive"
                                            }
                                        }, function (errrors, resultss) {
                                            if (errrors === null) {
                                                console.log(resultss)
                                                var doc = {"status": "success", "msg": "Teacher blocked"}
                                                res.send(doc)
                                            }
                                            else
                                            {
                                                var doc = {"status": "error", "msg": "Oops something went wrong!"}
                                                res.send(doc)
                                            }


                                        })
                                    }

                                }
                            }
                        )}
                })
            }
        })}}
module.exports=block