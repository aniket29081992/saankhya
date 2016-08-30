/**
 * Created by aniketverma on 20/08/16.
 */
var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');

var querystring = require('querystring');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer) {
    return buffer
    // var cipher = crypto.createCipher(algorithm, password)
    // var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    // return crypted;
}

function decrypt(buffer) {
    return buffer
    // var decipher = crypto.createDecipher(algorithm, password)
    // var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
    // return dec;
}
function proceedSignup(req,res,collection)
{

    var phone = req.body.phone
    var email = req.body.email
    var phoneEncrypted = encrypt(new Buffer(phone, "utf8"))
    var emailEncrypted = encrypt(new Buffer(email, "utf8"))
// outputs hello world


    collection.findOne({
        "$or": [{
            "phone": phoneEncrypted.toString('utf-8')
        }, {
            "email": emailEncrypted.toString('utf-8')
        }]
    }, function (err, res1) {
        if (err === null) {
            if (res1 != null) {

                if (emailEncrypted.toString('utf-8') === res1.email) {
                    res.send({

                        'msg': "email exists already",
                        'status': 'error'
                    })
                }

                else if (phoneEncrypted.toString('utf-8') === res1.phone) {

                    res.send({
                        'msg': "phone number exists already",
                        'status': 'error'
                    })
                }


            }
            else if (res1 === null) {


                var subStringname = req.body.firstName.substr(0, 4);
                var number = Math.floor(Math.random() * 1000) + 100
                var uniqueCode = subStringname + number

                var phone2 = req.body.phone
                var email2 = req.body.email
                var phoneEncrypted2 = encrypt(new Buffer(phone2, "utf8"))
                var emailEncrypted2 = encrypt(new Buffer(email2, "utf8"))
                if ((req.body.fbId === '1') && (req.body.gId === '1')) {
                    var password = req.body.password;


                    var docins;
if(req.body.referralCode===undefined)
{

                        docins={"signupDate": new Date(),
                            "email": emailEncrypted2.toString('utf-8'),
                            "firstName": req.body.firstName,
                            "uniqueCode": uniqueCode,
                            "secondName": req.body.secondName,
                            "phone": phoneEncrypted2.toString('utf-8'),
                            "dob": req.body.dob,

                            "blockingStatus": false,
                            "fbId": '1',
                            "gId": '1'}}
                            else

        {
             docins={"signupDate": new Date(),
                "email": emailEncrypted2.toString('utf-8'),
                "firstName": req.body.firstName,
                "uniqueCode": uniqueCode,
                "secondName": req.body.secondName,
                "phone": phoneEncrypted2.toString('utf-8'),
                "dob": req.body.dob,
                "referralCode": req.body.referralCode,
                "blockingStatus": false,
                "fbId": '1',
                "gId": '1'
    }


                    }
                    collection.insert(docins


                        , function (err, res2) {


                            if (err) {
                                res.send({
                                    'msg': err,
                                    'status': 'error'
                                })
                            }
                            else {
                                var newcollection = db.collection("signup");
                                var nn = encrypt(new Buffer(password, "utf8"));
                                console.log(decrypt(nn).toString('utf-8'))
                                newcollection.insert({
                                    "userId": res2.ops[0]._id,
                                    "email": emailEncrypted2.toString('utf-8'),
                                    "password": encrypt(new Buffer(password, "utf8")).toString('utf-8'),
                                    "phone": phoneEncrypted2.toString('utf-8')
                                })


                                res.send({


                                    'msg': "signed up",
                                    'status': 'success'

                                })
                            }
                        }
                    )
                }
                else if (req.body.fbId === '1') {
                    var fdoc;
                    if(req.body.referralCode===undefined)
                    {
                        fdoc={
                            "signupDate": new Date(),
                            "email": emailEncrypted2.toString('utf-8'),
                            "uniqueCode": uniqueCode,
                            "firstName": req.body.firstName,
                            "secondName": req.body.secondName,
                            "phone": phoneEncrypted2.toString('utf-8'),
                            "dob": req.body.dob,
                            "blockingStatus": false,

                            "fbId": '1',
                            "gId": req.body.gId
                        }
                    }
                        else
                        {
                            fdoc={
                                "signupDate": new Date(),
                                "email": emailEncrypted2.toString('utf-8'),
                                "uniqueCode": uniqueCode,
                                "firstName": req.body.firstName,
                                "secondName": req.body.secondName,
                                "phone": phoneEncrypted2.toString('utf-8'),
                                "dob": req.body.dob,
                                "blockingStatus": false,
                                "referralCode": req.body.referralCode,

                                "fbId": '1',
                                "gId": req.body.gId
                            }

                    }

                    collection.insert(fdoc, function (err, res3) {


                            if (err) {
                                res.send({
                                    'msg': err,
                                    'status': 'error'
                                })
                            }
                            else {

                                var newcollection = db.collection("signup");
                                var password="xxx"
                                var nn = encrypt(new Buffer(password, "utf8"));

                                console.log(decrypt(nn).toString('utf-8'))
                                newcollection.insert({
                                    "userId": res3.ops[0]._id,
                                    "email": emailEncrypted2.toString('utf-8'),
                                    "password": encrypt(new Buffer(password, "utf8")).toString('utf-8'),
                                    "phone": phoneEncrypted2.toString('utf-8')
                                })


                                res.send({


                                    'msg': "signed up",
                                    'status': 'success'

                                })
                            }
                        }
                    )
                }
                else if (req.body.gId === '1') {
                    var docss;
                    if(req.body.referralCode===undefined)
                    {
                    docss={"signupDate": new Date(),
                        "email": emailEncrypted2.toString('utf-8'),
                        "uniqueCode": uniqueCode,
                        "firstName": req.body.firstName,
                        "secondName": req.body.secondName,
                        "phone": phoneEncrypted2.toString('utf-8'),
                        "blockingStatus": false,
                        "dob": req.body.dob,

                        "fbId": req.body.fbId,
                        "gId": '1'}}
                        else
                    {
                        docss={"signupDate": new Date(),
                            "email": emailEncrypted2.toString('utf-8'),
                            "uniqueCode": uniqueCode,
                            "firstName": req.body.firstName,
                            "secondName": req.body.secondName,
                            "phone": phoneEncrypted2.toString('utf-8'),
                            "blockingStatus": false,
                            "dob": req.body.dob,
                            "referralCode": req.body.referralCode,
                            "fbId": req.body.fbId,
                            "gId": '1'}

                    }
                    collection.insert(docss

                        , function (err, res4) {


                            if (err) {
                                res.send({
                                    'msg': err,
                                    'status': 'error'
                                })
                            }
                            else {
                                var newcollection = db.collection("signup");
                                var password="xxx"
                                var nn = encrypt(new Buffer(password, "utf8"));
                                console.log(decrypt(nn).toString('utf-8'))
                                newcollection.insert({
                                    "userId": res4.ops[0]._id,
                                    "email": emailEncrypted2.toString('utf-8'),
                                    "password": encrypt(new Buffer(password, "utf8")).toString('utf-8'),
                                    "phone": phoneEncrypted2.toString('utf-8')
                                })


                                res.send({


                                    'msg': "signed up",
                                    'status': 'success'

                                })
                            }
                        }
                    )
                }

            }
            //here
        }

    })

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
                        var collection = db.collection("digo");
                        var reF=req.body.referralCode
                        if((reF===undefined)||(reF===null))
                        {
                            proceedSignup(req,res,collection)
                        //ccc
                        }
                        else
                        {
                            collection.findOne({"uniqueCode":reF},function (errorsr,resultsr)
                            {
                                if(errorsr===null)
                                {
                                    if(resultsr===null)
                                    {
                                        var doc={"status":"error","msg":"Invalid referral code"}
                                        res.send(doc)
                                    }
                                    else
                                    {
                                        proceedSignup(req,res,collection)
                                    }
                                }
                                else
                                {
                                    var doc={"status":"error","msg":"Oops something went wrong"}
                                    res.send(doc)
                                }

                            })

                        }

                    }

                });
            }
        })
    }
    ,
    loginRequest: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

        var server = new Server('52.66.137.38', 27017, {auto_reconnect: true});
        db = new Db('test', server);
        db.open(function (err, db) {

            if (err === null) {


                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {


//                     console.log(query)
// //  console.log(query)
// //                     console.log("The otp collection doesn't exist. Creating it with sample data...");
                        var loginColl = db.collection("signup");



                        var gId = req.body.gid;

                        if (gId === undefined)
                            gId = '1'


                        var fbId = req.body.fbid;
                        if (fbId === undefined)
                            fbId = '1'


                        if ((fbId == '1') && (gId == '1')) {
                            var pass = db.collection("signup")

                            var username = req.body.username;
                            var password = req.body.password;
                            console.log(username + password)
                            var encryPass = encrypt(new Buffer(password, "utf8")).toString('utf-8');
                            var encryUser = encrypt(new Buffer(username, "utf8")).toString('utf-8');


                            pass.findOne({
                                "$or": [{
                                    "phone": encryUser
                                }, {
                                    "email": encryUser
                                }]
                            }, function (err, res1) {
                                if (err === null) {
                                    if (res1 != null) {
                                        console.log("digo")
                                        var checkPass = res1.password
                                        console.log(res1)

                                        console.log("urr")

                                        var dbUdetails = db.collection("digo");
                                        dbUdetails.findOne({
                                            "$or": [{
                                                "phone": encryUser
                                            }, {
                                                "email": encryUser
                                            }]
                                        }, function (err, res1) {
                                            if (err === null) {
                                                if (res1 === null) {
                                                    var doc = {"status": "error", "msg": "User does not exist"}
                                                    res.send(doc);
                                                }
                                                else {
                                                    console.log(res1);
                                                    if (checkPass == encryPass)
                                                        var doc = {
                                                            "status": "success",
                                                            "msg": "User matched",
                                                            "data": res1
                                                        }
                                                    else
                                                        var doc = {"status": "error", "msg": "Incorrect password"}
                                                    res.send(doc);
                                                }
                                            }
                                            else {
                                                var doc = {"status": "error", "msg": "Something went wrong"}
                                                res.send(doc);

                                            }


                                        })
                                    }
                                    else {
                                        var doc = {"status": "error", "msg": "User does not exist"}
                                        res.send(doc);
                                    }
                                }
                                else {
                                    var doc = {"status": "error", "msg": "Something went wrong"}
                                    res.send(doc);

                                }
                            })

                            //check in signup db

                            //if password matches send user details

                        }
                        else if (fbId == '1') {
                            var dbUdetails = db.collection("digo");
                            dbUdetails.findOne({"gId": gId}, function (err, res1) {
                                if (err === null) {
                                    if (res1 === null) {
                                        var doc = {"status": "error", "msg": "User does not exist"}
                                        res.send(doc);
                                    }
                                    else {
                                        console.log(res1);
                                        var doc = {"status": "success", "msg": "User matched", "data": res1}
                                        res.send(doc);
                                    }
                                }
                                else {
                                    var doc = {"status": "error", "msg": "Something went wrong"}
                                }


                            })
//check in user details
                        }
//                         else
                        else if (gId == '1') {
                            var dbUdetails = db.collection("digo");
                            dbUdetails.findOne({"fbId": fbId}, function (err, res1) {
                                if (err === null) {
                                    if (res1 === null) {
                                        var doc = {"status": "error", "msg": "User does not exist"}
                                        res.send(doc);
                                    }
                                    else {
                                        console.log(res1);
                                        var doc = {"status": "success", "msg": "User matched", "data": res1}
                                        res.send(doc);
                                    }
                                }
                                else {
                                    var doc = {"status": "error", "msg": "Something went wrong"}
                                }


                            })
//check in user details
// //check in user details
                        }
//
//
//
//
                    }
//
// })
                })
            }
        })
    }
}


module.exports = login;
