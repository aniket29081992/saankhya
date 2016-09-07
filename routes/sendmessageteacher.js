var mongo = require('mongodb');
var crypto = require('crypto');
var cloud=require('../test')
var uploadimg=require('./imageuploader')
var bodyParser = require('body-parser');
var plivo = require('plivo');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer){
    return buffer;
    // var cipher = crypto.createCipher(algorithm,password)
    // var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    // return crypted;
}

function decrypt(buffer)
{
    return buffer
    // var decipher = crypto.createDecipher(algorithm,password)
    // var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    // return dec;
}
var jsonParser = bodyParser.json();
var messageT = {
    sendnewT: function (req, res) {
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
                db.collection('message', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var mess = db.collection('message');
                        var findInt = {"stuId": req.body.stuId, "iStatus": "active","intId":req.body.interId,"teachId":req.body.teachId};
                        mess.findOne(findInt,function (err,result) {
                            if(err==null)
                            {
                                if(result!=null)
                                {

                                    var check=0;
                                    var findCheck={"stuId":req.body.stuId,"intId":req.body.interId,"iStatus":"active","msgBy":"0"};
                                    var resultteacher=mess.find(findCheck).sort({sendTime:-1}).limit(1)
                                    resultteacher.each(function (err, item) {
                                        if (err === null) {
                                            if(check++==0){
                                                if(item!==null)
                                                {
                                                    var lastStudenttime=parseInt(item.sendTime)
                                                    var currentTime=new Date().getTime()-lastStudenttime
                                                    if(currentTime<=5*60*1000)
                                                    {
                                                        var attachment
                                                        if((req.body.attachment===' ')||(req.body.attachment.length==0))
                                                            attachment=''
                                                        else{

                                                            attachment=req.body.stuId+new Date().getTime().toString()
                                                            uploadimg.upload(attachment,req.body.attachment)}
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
                                                                "intId": req.body.interId,
                                                                "msgBy": req.body.msgBy,
                                                                "iStatus": "active"

                                                            }

                                                            var mess = db.collection('message');
                                                            mess.insert(ins, function (err, result) {
                                                                if (err === null) {
                                                                    // console.log(result)
                                                                    var userS=[]
                                                                    //insert teacher tokens
                                                                    userS.push('e8k3CgDPZpA:APA91bGx5-RGIvI1XHO63pdZ1HLltuqdpjafWQz01HfmyhZC-1qCLwCwqSeRCsVWCvoYXmdrH9bbYwXiruqhJadHJYjqBlqT2rBjMKrjlJNvM3wiJzaG8KytJjQd6Xfx7IPu1Gn-cGdR')
                                                                    var dataa=[]
                                                                    dataa.push(result.ops[0])
                                                                    cloud.send(userS,dataa,0,1)

                                                                    var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
                                                                    res.send(msg);
                                                                }
                                                                else {
                                                                    var msg = {"status": "error", "msg": "Oops something went wrong"}
                                                                    res.send(msg);

                                                                }

                                                            })
                                                            // consolensole.log(doc)
                                                        }
                                                    }
                                                    else
                                                    {
                                                        var mess=db.collection('message');
                                                        var findInt={"stuId":req.body.stuId,"iStatus":"active","intId":req.body.interId};
                                                        mess.updateMany(findInt, { $set:{"iStatus":"unassigned"}},function (errr,resss) {
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
                                                                {   noDocs.push(item11)
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
                                                                                            cloud.send(userS,noDocs,1,1)
                                                                                            console.log("bas"+userS)
                                                                                            res.send({"status": "success",
                                                                                                "msg": "Message sent",
                                                                                                "case":1,
                                                                                                "data":noDocs})
                                                                                            }

                                                                                    }
                                                                                }}})
                                                                        //fcm to all

                                                                    }
                                                                    else
                                                                    {
                                                                        res.send({"status": "error",
                                                                            "msg": "Oops something went wrong"});
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