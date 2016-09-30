var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var cloud=require('../test')
var config=require('../config')
var uploadimg=require('./imageuploader')
var bodyParser = require('body-parser');
var plivo = require('plivo');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer){
    //return buffer;
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
}

function decrypt(buffer){
    //return buffer
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
}

var jsonParser = bodyParser.json();
var messageT = {
    sendnewT: function (req, res) {
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
                db.collection('message', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var mess = db.collection('message');
                        var findInt = {"stuId": req.body.stuId, "iStatus": "active","teachId":req.body.teachId};
                        mess.findOne(findInt,function (err,result) {
                            if(err==null)
                            {
                                if(result!=null)
                                {

                                    var check=0;
                                    var findCheck={"stuId":req.body.stuId,"teachId":req.body.teachId,"iStatus":"active","msgBy":"0"};
                                    var resultteacher=mess.find(findCheck).sort({sendTime:-1}).limit(1)
                                    resultteacher.each(function (err, item) {
                                        if (err === null) {
                                            if(check++==0){
                                                if(item!==null)
                                                {
                                                    var lastStudenttime=parseInt(item.sendTime)
                                                    var currentTime=new Date().getTime()-lastStudenttime
                                                    if(currentTime<=10*60*1000)
                                                    {
                                                        var attachment
                                                        if((req.body.attachment===' ')||(req.body.attachment.length==0))
                                                            attachment=''
                                                        else{

                                                            attachment=req.body.attachment
                                                          //  uploadimg.upload(attachment,req.body.attachment)
                                                        }
                                                        {
                                                            var ins = {
                                                                "stuId": req.body.stuId,
                                                                "msg": req.body.msg,
                                                                "teachId": req.body.teachId,
                                                                "acceptTime":item.acceptTime,

                                                                "subId":req.body.subId,
                                                                "attachment":attachment,
                                                                "extension":req.body.extension,
                                                                "seenTime":req.body.seenTime,
                                                                "localTime":req.body.localTime,
                                                                "sendTime": new Date().getTime().toString(),
                                                                "intId": item.intId,
                                                                "msgBy": req.body.msgBy,
                                                                "iStatus": "active"

                                                            }

                                                            var mess = db.collection('message');
                                                            mess.insert(ins, function (err, result) {
                                                                if (err === null) {
                                                                    // console.log(result)
                                                                    var userS=[]
                                                                    //insert teacher tokens
                                                                    var student=db.collection('digo');
                                                                    var d=req.body.stuId
                                                                    var ObjectId=mongo.ObjectId
                                                                    var _id = new ObjectId(d)
                                                                    student.findOne({"_id":_id},function (err5,res5) {
                                                                        if(err5===null)
                                                                        {
                                                                            if(res5!==null)
                                                                            {
                                                                                for(var i=0;i<res5.regTokens.length;i++)
                                                                                    userS.push(res5.regTokens[i])
                                                                                var dataa=[]
                                                                                dataa.push(result.ops[0])
                                                                                var admin=db.collection('adminDetails')
                                                                                var cursoradmin=admin.find();
                                                                                var admindata=[]
                                                                                cursoradmin.each(function (error,item) {
                                                                                    if(error===null)
                                                                                    {

                                                                                        if(item!==null)
                                                                                        {
                                                                                            if(item.regTokens!==undefined&&item.regTokens!==null)
                                                                                            {
                                                                                                for(var i=0;i<item.regTokens.length;i++)
                                                                                                {
                                                                                                    admindata.push(item.regTokens[i])
                                                                                                    console.log(item.regTokens[i])
                                                                                                    console.log(admindata)
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            console.log(admindata)
                                                                                            cloud.send(admindata,dataa,0,3)
                                                                                        }

                                                                                    }

                                                                                })
                                                                                cloud.send(userS,dataa,0,1)
                                                                                //admin cloud.send(admin,dataa)


                                                                                var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
                                                                                res.send(msg);
                                                                            }
                                                                            else
                                                                                {
                                                                            var doc={"status":"error","msg":"Oops something went wrong1"}
                                                                            res.send(doc)
                                                                        }

                                                                        }
                                                                        else
                                                                        {
                                                                            var doc={"status":"error","msg":"Oops something went wrong2"}
                                                                            res.send(doc)
                                                                        }

                                                                    })
                                                                  //  userS.push('e8k3CgDPZpA:APA91bGx5-RGIvI1XHO63pdZ1HLltuqdpjafWQz01HfmyhZC-1qCLwCwqSeRCsVWCvoYXmdrH9bbYwXiruqhJadHJYjqBlqT2rBjMKrjlJNvM3wiJzaG8KytJjQd6Xfx7IPu1Gn-cGdR')

                                                                }
                                                                else {
                                                                    var msg = {"status": "error", "msg": "Oops something went wrong3"}
                                                                    res.send(msg);

                                                                }

                                                            })
                                                            // consolensole.log(doc)
                                                        }
                                                    }
                                                    else
                                                    {
                                                        var mess=db.collection('message');
                                                        var findInt={"stuId":req.body.stuId,"subId":req.body.subId,"iStatus":"active","teachId":req.body.teachId};
                                                        mess.updateMany(findInt, { $set:{"iStatus":"unassigned","sendTime":new Date().getTime().toString(),"teachId":""}},function (errr,resss) {
                                                            if(errr===null)
                                                            {
                                                                var teachDb=db.collection("teacherDetails");
                                                                teachDb.update({"teachId":item.teachId,},{ $set:{"availStatus":"active"}},function (error1,result1) {
                                                                    if(error1===null)
                                                                    {

                                                        var findCheck={"intId":req.body.interId,"stuId":req.body.stuId,"subId":req.body.subId};
                                                        var cursor=mess.find(findCheck)
                                                        var count=0
                                                        var insertDocument;
                                                        var noDocs=[]
                                                        cursor.each(function (err,item11) {
                                                            if(err===null)
                                                            {
                                                                count++;
                                                                if(item11!=null)
                                                                {
                                                                    noDocs.push(item11)
                                                                }
                                                                else
                                                                {
                                                                    if(count>1)
                                                                    {
                                                                        var userS=[]

                                                                        var teacher=db.collection('teacherDetails');
                                                                        var checkSum=0;
                                                                        var cursorT= teacher.find({"availStatus":"active"})
                                                                        cursorT.each(function (err, item) {
                                                                            if (err === null) {
                                                                                {
                                                                                    checkSum++;
                                                                                    if(item!==null)
                                                                                    {
                                                                                        // console.log(item.regTokens)
                                                                                        for(var i=0;i<item.regTokens.length;i++)
                                                                                        {
                                                                                            console.log(item.regTokens[i])
                                                                                            userS.push(item.regTokens[i])
                                                                                        }

                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        if(checkSum==1)
                                                                                            console.log("no one active")
                                                                                        else {
                                                                                            cloud.send(userS,noDocs,1,0)
                                                                                            //admin cloud.send(admin,dataa)

                                                                                            console.log("bas"+userS)
                                                                                            res.send({"status": "error",
                                                                                                "msg": "Message sent",
                                                                                                "case":1,
                                                                                                "data":noDocs})

                                                                                            var mess=db.collection('message');
                                                                                            var admin=db.collection('adminDetails')
                                                                                            var cursoradmin=admin.find();
                                                                                            var admindata=[]
                                                                                            cursoradmin.each(function (error,item) {
                                                                                                if(error===null)
                                                                                                {

                                                                                                    if(item!==null)
                                                                                                    {
                                                                                                        if(item.regTokens!==undefined&&item.regTokens!==null)
                                                                                                        {
                                                                                                            for(var i=0;i<item.regTokens.length;i++)
                                                                                                            {
                                                                                                                admindata.push(item.regTokens[i])
                                                                                                                console.log(item.regTokens[i])
                                                                                                                console.log(admindata)
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    // else
                                                                                                    // {
                                                                                                    //     console.log(admindata)
                                                                                                    //     cloud.send(admindata,dataa,0,3)
                                                                                                    // }

                                                                                                }

                                                                                            })
                                                                                            // cloud.send(userS,noDocs,1,0)
                                                                                            // //admin cloud.send(admin,dataa)
                                                                                            //
                                                                                            // console.log("bas"+userS)
                                                                                            // res.send({"status": "error",
                                                                                            //     "msg": "Message sent",
                                                                                            //     "case":1,
                                                                                            //     "data":noDocs})
                                                                                            // var findIntnew={"stuId":req.body.stuId,"subId":req.body.subId,"iStatus":"active","teachId":req.body.teachId,"iStatus":"unassigned"};
                                                                                            // mess.updateMany(findIntnew, { $set:{"teachId":""}},function (errr,resss) {
                                                                                            //     if(errr===null)
                                                                                            //     {
                                                                                            //
                                                                                            //
                                                                                            //     }
                                                                                            //     {
                                                                                            //         console.log(errr)
                                                                                            //         res.send({"status": "error",
                                                                                            //             "msg": "Oops something went wrongx"});
                                                                                            //     }
                                                                                            // })
                                                                                            }

                                                                                    }
                                                                                }}})
                                                                        //fcm to all

                                                                    }
                                                                    else
                                                                    {
                                                                        res.send({"status": "error",
                                                                            "msg": "Oops something went wrongy"});
                                                                    }
                                                                }




                                                            }
                                                        })




                                                    }})}})}

//cc
                                                }
                                            }
                                        }
                                    })







                                }
                                else
                                {
                                    var doc={"status":"error","msg":"No session found"}
                                    res.send(doc)
                                }


                            }
                            else
                            {
                                var doc={"status":"error","msg":"Oops something went wrong"}
                                res.send(doc)
                            }

                        })

                    }
                })
            }
        })
    }}
    module.exports=messageT