var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
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
var teachSignup = {
    signup: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

        var server = new Server('52.66.137.38', 27017, {auto_reconnect: true});
        db = new Db('test', server);
        var api = plivo.RestAPI({
            authId: 'MAYJVLZGU4Y2JMODVLNJ',
            authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',
        });


        db.open(function (err, db) {

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
                                if(res1!=null)
                                {
                                    var doc={"status":"error","msg":"Userid already taken."}
                                    res.send(doc)
                                }
                                else
                                {
                                    var teacher = db.collection("teacherDetails")

                                    var regTokens=[]
                                    var doc={"firstName":req.body.firstName,"lastName":req.body.lastName,
                                        "teachId":req.body.teachId,"teachPass":req.body.teachPass,"subIds":req.body.subIds,
                                    "availStatus":"active","blockingStatus":"active"}
                                    teacher.insert(doc,function (error,resultss) {
                                        if(error==null)
                                        {
                                            var doc1={"status":"success","msg":"teacher details updated"};
                                            res.send(doc1)
                                        }
                                        else
                                        {
                                            var doc={"status":"error","msg":"Oops something went wrong."}
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
                            module.exports=teachSignup