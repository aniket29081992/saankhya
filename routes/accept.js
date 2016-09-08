var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var cloud=require('../test')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer){
    return buffer;
    // var cipher = crypto.createCipher(algorithm,password)
    // var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    // return crypted;
}

function decrypt(buffer){
    return buffer
    // var decipher = crypto.createDecipher(algorithm,password)
    // var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    // return dec;
}

var jsonParser = bodyParser.json();
var accept = {
    checkandaccept: function (req, res) {
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
                        var message = db.collection("message");
                        var interactionId=req.body.interId
                        var doc={"stuId":req.body.stuId,"intId":interactionId,"iStatus":"active"}
                        message.findOne(doc,function (error,result) {
                            if(error===null)
                            {
                                if(result!=null)
                                {
                                    var doc={"status":"error","msg":"Already accepted"}
                                    res.send(doc)
                                }
                                else
                                {
                                    var teachId=req.body.teachId
                                    message.updateMany({"stuId":req.body.stuId,"intId":interactionId,"iStatus":"unassigned","teachId":""},{ $set:{"teachId":teachId,"iStatus":"active","acceptTime":new Date().getTime().toString()}},function (errr,resss) {
                                        if (errr !== null) {
                                            res.send({"status": "error"})

                                        }
                                       else if((errr===null)&&(resss.nModified!=0) ){
                                            console.log("mera naam "+resss)

                                        var teachDb = db.collection("teacherDetails");
                                        teachDb.update({
                                            "teachId": teachId,
                                            "availStatus": "active"
                                        }, {$set: {"availStatus": "inactive"}}, function (error1, result1) {
                                            if (error1 === null) {
                                                console.log(result1.result.nModified
                                                )
                                                if (result1.result.nModified != 0)
                                                {
                                                    var userS = []

                                                    var teacher = db.collection('teacherDetails');
                                                    var checkSum = 0;
                                                    var cursorT = teacher.find({"availStatus":"active"})
                                                    cursorT.each(function (err, item) {
                                                        if (err === null) {
                                                            {
                                                                checkSum++;
                                                                if ((item !== null))
                                                                {
                                                                    // console.log(item.regTokens)
                                                                    if (item.teachId != req.body.teachId)
                                                                    {
                                                                        for (var i = 0; i < item.regTokens.length; i++)
                                                                        {
                                                                            console.log(item.regTokens[i])
                                                                            userS.push(item.regTokens[i])

                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    if (checkSum == 1) {
                                                                        console.log("no one active")
                                                                        var doc = {
                                                                            "status": "error",
                                                                            "msg": "No one active"

                                                                        }
                                                                        res.send(doc)
                                                                    }
                                                                    else {


                                                                        var dataa = []
                                                                        var doc = {
                                                                            "status": "success",
                                                                            "msg": "Accepted",
                                                                            "teachId": teachId
                                                                        }
                                                                        res.send(doc)

                                                                        cloud.send(userS, req.body.interId, 2,0)
                                                                        console.log("bas" + userS)
                                                                    }

                                                                }
                                                            }
                                                        }
                                                    })


                                                }
                                                else {
                                                    var doc = {
                                                        "status": "error",
                                                        "msg": "Oops something went wrong"
                                                    }
                                                    res.send(doc)

                                                }

                                                //
                                                //
                                                //
                                                //
                                                // var college = db.collection("message");
                                                //
                                                // var sendDoc=[]
                                                //
                                                // var college = db.collection("message");
                                                // var cursor = college.find({"stuId":req.body.stuId,sendTime: { $lt: req.body.sendTime }}
                                                // ).sort({sendTime: -1}).skip(0).limit(10);
                                                // cursor.each(function (err, item) {
                                                //     if (err === null) {
                                                //         if(item!==null)
                                                //         {
                                                //
                                                //             sendDoc.push(item)
                                                //             console.log(item.sendTime);}
                                                //         else
                                                //         {
                                                //             console.log("mine"+sendDoc.length)
                                                //             if(sendDoc.length==0)
                                                //                 res.send({"status:":"error","msg":"We ran out of pages"})
                                                //             else{
                                                //
                                                //
                                                //
                                                //                     res.send({"status:":"success","data":sendDoc})}
                                                //         }
                                                //
                                                //     }
                                                //     else
                                                //     {
                                                //         res.send({"status:":"error","msg":"Oops something went wrong"})
                                                //
                                                //     }
                                                // });

                                            }


                                        })
                                    }
                                    else if((errr===null)&&(resss.nModified==0) )
                                        {
                                            var doc={"status":"error","msg":"Already accepted"}
                                            res.send(doc)
                                        }

                                    })



                                }
                                //cccc

                            }

                        })








                    }})}})}}
                    module.exports=accept