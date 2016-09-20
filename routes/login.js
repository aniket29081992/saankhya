/**
 * Created by aniketverma on 20/08/16.
 */
var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');

var querystring = require('querystring');
var config=require('../config')
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


function sendLastmsg(req,res,userid1,doc,collectionmsg)
{
    var userid=userid1.toString()

  var searchlastmsh=  collectionmsg.find({"stuId":userid},{msg:1,attachment:1,extension:1,msgBy:1}).sort({"sendTime":-1}).limit(1)
    var check=0;
      searchlastmsh.each(function (err, item) {
          if (err === null) {

                  if(item!==null)
                  {
                      console.log("nahi"+item+"m")
                      doc['details']=item
                  }
                  else
                  {

                      res.send(doc);
                      // else
                      //     res.send({"status":"error","msg":"Oopsww something went wrong"})
                  }
              }})


}
function proceedSignup(req,res,collection,collectioninsert)
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
var regTokens=[]
    regTokens.push(req.body.regToken)
                        docins={"signupDate": new Date(),
                            "email": emailEncrypted2.toString('utf-8'),
                            "firstName": req.body.firstName,
                            "uniqueCode": uniqueCode,
                            "secondName": req.body.secondName,
                            "phone": phoneEncrypted2.toString('utf-8'),
                            "dob": req.body.dob,
                            "cCode":req.body.cCode,
                            "regTokens":regTokens,
                            "coins":9000,


                            "blockingStatus": false,
                            "fbId": '1',
                            "gId": '1'}}
                            else

        {
            var regTokens=[]
            regTokens.push(req.body.regToken)
             docins={"signupDate": new Date(),
                "email": emailEncrypted2.toString('utf-8'),
                "firstName": req.body.firstName,
                "uniqueCode": uniqueCode,
                "secondName": req.body.secondName,
                "phone": phoneEncrypted2.toString('utf-8'),
                "dob": req.body.dob,
                 "regTokens":regTokens,
                 "coins":11000,
                "referralCode": req.body.referralCode,
                 "cCode":req.body.cCode,
                "blockingStatus": false,
                "fbId": '1',
                "gId": '1'
    }


                    }
                    collection.insert(docins


                        , function (err, res2) {


                            if (err)
                            {
                                res.send({
                                    'msg': err,
                                    'status': 'error'
                                })
                                     }
                            else {
                                console.log(res2+"cool")
                                var newcollection = db.collection("signup");
                                var nn = encrypt(new Buffer(password, "utf8"));
                                console.log(decrypt(nn).toString('utf-8'))
                                collectioninsert.insert({
                                    "userId": res2.ops[0]._id,
                                    "email": emailEncrypted2.toString('utf-8'),
                                    "cCode":req.body.cCode,
                                    "password": encrypt(new Buffer(password, "utf8")).toString('utf-8'),
                                    "phone": phoneEncrypted2.toString('utf-8')
                                },function (errinsert,resultinsert) {
                                    console.log(errinsert+" up" +resultinsert)
                                    if(errinsert===null)
                                    {

                                        res.send({


                                            'msg': "signed up",
                                            'status': 'success',
                                            "data":res2.ops[0]

                                        })
                                    }

                                })


                            }
                        }
                    )
                }
                else if (req.body.fbId === '1') {
                    var fdoc;
                    if(req.body.referralCode===undefined)
                    {

                        var regTokens=[]
                        regTokens.push(req.body.regToken)
                        fdoc={
                            "regTokens":regTokens,
                            "signupDate": new Date(),
                            "email": emailEncrypted2.toString('utf-8'),
                            "uniqueCode": uniqueCode,
                            "firstName": req.body.firstName,
                            "secondName": req.body.secondName,
                            "phone": phoneEncrypted2.toString('utf-8'),
                            "dob": req.body.dob,
                            "cCode":req.body.cCode,
                            "blockingStatus": false,
                            "coins":9000,

                            "fbId": '1',
                            "gId": req.body.gId
                        }
                    }
                        else
                        {

                            var regTokens=[]
                            regTokens.push(req.body.regToken)
                            fdoc={
                                "regTokens":regTokens,
                                "signupDate": new Date(),
                                "email": emailEncrypted2.toString('utf-8'),
                                "uniqueCode": uniqueCode,
                                "firstName": req.body.firstName,
                                "secondName": req.body.secondName,
                                "phone": phoneEncrypted2.toString('utf-8'),
                                "dob": req.body.dob,
                                "cCode":req.body.cCode,
                                "blockingStatus": false,
                                "referralCode": req.body.referralCode,
                                 "coins":11000,
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

                                var number1 = Math.floor(Math.random() * 100000) + 100
                                var newcollection = db.collection("signup");
                                var password=number1.toString();
                                var nn = encrypt(new Buffer(password, "utf8"));

                                console.log(decrypt(nn).toString('utf-8'))
                                collectioninsert.insert({
                                    "userId": res3.ops[0]._id,
                                    "email": emailEncrypted2.toString('utf-8'),
                                    "cCode":req.body.cCode,
                                    "password": encrypt(new Buffer(password, "utf8")).toString('utf-8'),
                                    "phone": phoneEncrypted2.toString('utf-8')
                                })


                                res.send({


                                    'msg': "signed up",
                                    'status': 'success',
                                    'data':res3.ops[0]

                                })
                            }
                        }
                    )
                }
                else if (req.body.gId === '1') {
                    var docss;
                    if(req.body.referralCode===undefined)
                    {
                        var regTokens=[]
                        regTokens.push(req.body.regToken)
                    docss={"signupDate": new Date(),
                        "email": emailEncrypted2.toString('utf-8'),
                        "uniqueCode": uniqueCode,
                        "firstName": req.body.firstName,
                        "secondName": req.body.secondName,
                        "phone": phoneEncrypted2.toString('utf-8'),
                        "blockingStatus": false,
                        "dob": req.body.dob,
                        "cCode":req.body.cCode,
                        "regTokens":regTokens,
                        "coins":9000,
                        "fbId": req.body.fbId,
                        "gId": '1'}}
                        else
                    {

                        var regTokens=[]
                        regTokens.push(req.body.regToken)
                        docss={
                            "signupDate": new Date(),
                            "email": emailEncrypted2.toString('utf-8'),
                            "uniqueCode": uniqueCode,
                            "firstName": req.body.firstName,
                            "secondName": req.body.secondName,
                            "phone": phoneEncrypted2.toString('utf-8'),
                            "blockingStatus": false,
                            "cCode":req.body.cCode,
                            "dob": req.body.dob,
                            "regTokens":regTokens,
                            "coins":11000,
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
                                var number11 = Math.floor(Math.random() * 100000) + 100
                                var newcollection = db.collection("signup");
                                var password=number11.toString();

                                // console.log(decrypt(nn).toString('utf-8'))
                                collectioninsert.insert({
                                    "userId": res4.ops[0]._id,
                                    "cCode":req.body.cCode,
                                    "email": emailEncrypted2.toString('utf-8'),
                                    "password": encrypt(new Buffer(password, "utf8")).toString('utf-8'),
                                    "phone": phoneEncrypted2.toString('utf-8')
                                })


                                res.send({


                                    'msg': "signed up",
                                    'status': 'success',
                                    'data': res4.ops[0]

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


        var host=config.development.database.host
        var port=config.development.database.port+"/test"
        var dbname=config.development.database.db

        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        MongoClient.connect(host,function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('signup', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var collection = db.collection("digo");
                        console.log("dd")
                        var reF=req.body.referralCode
                        if((reF===undefined)||(reF===null))
                        {
                            proceedSignup(req,res,collection,db.collection('signup'))
                        //ccc
                        }
                        else
                        {
                            collection.findAndModify({"uniqueCode":reF},[], {$inc: { coins: 2000 } },function (errorsr,resultsr)
                            {
                                if(errorsr===null)
                                {
                                    console.log(errorsr)
                                    if(resultsr===null)
                                    {
                                        var doc={"status":"error","msg":"Invalid referral code."}
                                        res.send(doc)
                                    }
                                    else
                                    {
                                        proceedSignup(req,res,collection,db.collection('signup'))
                                    }
                                }
                                else
                                {console.log(errorsr)
                                    var doc={"status":"error","msg":"Oops something went wrong1."}
                                    res.send(doc)
                                }

                            })

                        }

                    }

                });
            }
            else
                console.log(err)
        })
    }
    ,
    loginRequest: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;
        var host=config.development.database.host
        var port=config.development.database.port
        var dbname=config.development.database.db

        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        MongoClient.connect(host,function (err, db) {

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


                            pass.findOne(
                                {
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
                                                    var doc = {"status": "error", "msg": "User does not exist."}
                                                    res.send(doc);
                                                }
                                                else {
                                                    console.log(res1);
                                                    if (checkPass == encryPass)
                                                    {
                                                        var  newww=[]

                                                        newww=res1.regTokens
                                                        if((res1.regTokens===null)||(res1.regTokens===undefined))
                                                            newww=[]
                                                        console.log("dekh lo"+req.body.regToken)
                                                        var t=req.body.regToken
                                                        if(!newww.includes(t))
                                                        newww.push(t)
                                                        console.log(newww)
                                                        dbUdetails.update({ "$or": [{
                                                            "phone": encryUser
                                                        }, {
                                                            "email": encryUser
                                                        }]}, {
                                                            $set: {
                                                                "regTokens":newww
                                                            }},function (errrors,resultss) {


                                                        })
                                                        var doc = {
                                                            "status": "success",
                                                            "msg": "User matched",
                                                            "data": res1
                                                        }
                                                        var collectionmsg=db.collection('message')
                                                        var userCheckstu=res1._id
                                                        console.log(userCheckstu)

                                                        sendLastmsg(req,res,userCheckstu,doc,collectionmsg)
                                                    }
                                                    else{
                                                        var doc = {"status": "error", "msg": "Incorrect password!"}
                                                    res.send(doc);}
                                                }
                                            }
                                            else {
                                                var doc = {"status": "error", "msg": "Something went wrong"}
                                                res.send(doc);

                                            }


                                        })
                                    }
                                    else {
                                        var doc = {"status": "error", "msg": "User does not exist."}
                                        res.send(doc);
                                    }
                                }
                                else {
                                    var doc = {"status": "error", "msg": "Something went wrong."}
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
                                        var doc = {"status": "error", "msg": "User does not exist."}
                                        res.send(doc);
                                    }
                                    else {
                                        console.log(res1);
                                        var  newww=[]
                                        newww=res1.regTokens
                                        console.log("dekh lo"+req.body.regToken)
                                        var t=req.body.regToken
                                        if(!newww.includes(t))
                                        newww.push(t)
                                        console.log(newww)
                                        dbUdetails.update({ "gId": gId}, {
                                            $set: {
                                                "regTokens":newww
                                            }},function (errrors,resultss) {


                                        })

                                        var doc = {"status": "success", "msg": "User matched", "data": res1}
                                        var collectionmsg=db.collection('message')

                                        var userCheckstu=res1._id
                                        console.log(userCheckstu)

                                        sendLastmsg(req,res,userCheckstu,doc,collectionmsg)
                                      //  res.send(doc);
                                    }
                                }
                                else {
                                    var doc = {"status": "error", "msg": "Something went wrong."}
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
                                        var doc = {"status": "error", "msg": "User does not exist."}
                                        res.send(doc);
                                    }
                                    else {
                                        console.log(res1);
                                        var  newww=[]
                                        newww=res1.regTokens
                                        console.log("dekh lo"+req.body.regToken)
                                        var t=req.body.regToken
                                        if(!newww.includes(t))
                                        newww.push(t)
                                        console.log(newww)
                                        dbUdetails.update({ "fbId": fbId}, {
                                            $set: {
                                                "regTokens":newww
                                            }},function (errrors,resultss) {


                                        })
                                        var collectionmsg=db.collection('message')

                                        var doc = {"status": "success", "msg": "User matched", "data": res1}
                                        var userCheckstu=res1._id
                                        console.log(userCheckstu)

                                        sendLastmsg(req,res,userCheckstu,doc,collectionmsg)
                                        //res.send(doc);
                                    }
                                }
                                else {
                                    var doc = {"status": "error", "msg": "Something went wrong."}
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
