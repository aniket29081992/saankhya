/**
 * Created by aniketverma on 20/08/16.
 */
var mongo = require('mongodb');
var crypto=require('crypto');
var bodyParser = require('body-parser');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
}

function decrypt(buffer){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
}
function write()
{

}

var jsonParser = bodyParser.json();
var login = {

    signUprequest: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

        var server = new Server('52.66.137.38', 27017, {auto_reconnect: true});
        db = new Db('test', server);
        db.open(function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('signup', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var phone = req.body.phone
                        var email = req.body.email
                        var phoneEncrypted= encrypt(new Buffer(phone, "utf8"))
                        var emailEncrypted= encrypt(new Buffer(email, "utf8"))
// outputs hello world
                        var collection = db.collection("digo");

                        collection.findOne({
                            "$or":
                                [{
                                "phone": phoneEncrypted.toString('utf-8')
                            }, {
                                "email": emailEncrypted.toString('utf-8')
                                }]
                        }, function (err, res1) {
                            if (err === null) {
                                if (res1 != null) {

                                if(emailEncrypted.toString('utf-8')===res1.email)
                                {
                                    res.send({
                                        'm':decrypt(emailEncrypted).toString('utf-8'),
                                        'msg': "email exists already",
                                        'status': 'error'
                                    })
                                   }

                                 else if(phoneEncrypted.toString('utf-8')===res1.phone)
                                {

                                    res.send({
                                        'msg': "phone number exists already",
                                        'status': 'error'
                                    })}



                                }
                                else if (res1 === null) {


                                    var subStringname=req.body.firstName.substr(0,4);
                                    var number=Math.floor(Math.random() * 1000) + 100
                                    var uniqueCode=subStringname+number

                                    if ((req.body.fbId === '1') && (req.body.gId === '1')) {
                                        var password=req.body.password;

                                        var phone2= req.body.phone
                                        var email2 = req.body.email
                                        var phoneEncrypted2= encrypt(new Buffer(phone2, "utf8"))
                                        var emailEncrypted2= encrypt(new Buffer(email2, "utf8"))
                                        collection.insert({
                                            "signupDate":new Date(),
                                                "email": emailEncrypted2.toString('utf-8'),
                                                "firstName": req.body.firstName,
                                                "uniqueCode":uniqueCode,
                                                "secondName": req.body.secondName,
                                                "phone": phoneEncrypted2.toString('utf-8'),
                                                "dob": req.body.dob,
                                                "referralCode": req.body.referralCode,
                                            "blockingStatus":false,
                                                "fbId": '1',
                                                "gId": '1'
                                            }, function (err, res2) {


                                                if (err) {
                                                    res.send({
                                                        'msg': err,
                                                        'status': 'error'
                                                    })
                                                }
                                                else
                                                {
                                                    var newcollection = db.collection("signup");
                                                    var nn=encrypt(new Buffer(password, "utf8"));
                                                    console.log(decrypt(nn).toString('utf-8'))
                                                    newcollection.insert({"userId":res2.ops[0]._id,"password":encrypt(new Buffer(password, "utf8")), "phone": phoneEncrypted2.toString('utf-8')})


                                                    res.send({


                                                        'msg': "signed up",
                                                        'status': 'success'
                                                    })}
                                            }
                                        )
                                    }
                                    else if (req.body.fbId === '1') {
                                        collection.insert({
                                            "signupDate":new Date(),
                                                "email": req.body.email,
                                            "uniqueCode":uniqueCode,
                                                "firstName": req.body.firstName,
                                                "secondName": req.body.secondName,
                                                "phone": req.body.phone,
                                                "dob": req.body.dob,
                                            "blockingStatus":false,
                                                "referralCode": req.body.referralCode,
                                                "fbId": '1',
                                                "gId": req.body.gId
                                            }, function (err, res3) {


                                            if (err) {
                                                res.send({
                                                    'msg': err,
                                                    'status': 'error'
                                                })
                                            }
                                            else
                                            {
                                                res.send({
                                                    'msg': "signed up",
                                                    'status': 'success'
                                                })}
                                            }
                                        )
                                    }
                                    else if (req.body.gId === '1') {
                                        collection.insert({
                                            "signupDate":new Date(),
                                                "email": req.body.email,
                                            "uniqueCode":uniqueCode,
                                                "firstName": req.body.firstName,
                                                "secondName": req.body.secondName,
                                                "phone": req.body.phone,
                                            "blockingStatus":false,
                                                "dob": req.body.dob,
                                                "referralCode": req.body.referralCode,
                                                "fbId": req.body.fbId,
                                                "gId": '1'
                                            }, function (err, res4) {


                                            if (err) {
                                                res.send({
                                                    'msg': err,
                                                    'status': 'error'
                                                })
                                            }
                                            else
                                            {
                                                res.send({
                                                    'msg': "signed up",
                                                    'status': 'success'
                                                })}
                                            }
                                        )
                                    }

                                }
                            }

                        })

                    }

                });
            }
        })
    }
}

module.exports = login;
