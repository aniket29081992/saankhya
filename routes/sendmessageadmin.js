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
var messageA = {
    sendnewA: function (req, res) {
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

                        var findInt = {"stuId": req.body.stuId,"subId":req.body.subId, "iStatus": "active","teachId":req.body.teachId};
                        mess.findOne(findInt,function (err,result) {
                            if(err==null)
                            {
                                if(result!=null)
                                {

                                    console.log(result+"dis")
                                    var attachment
                                    if((req.body.attachment===' ')||(req.body.attachment.length==0))
                                        attachment=''
                                    else
                                        attachment=req.body.attachment
                                    var ins = {
                                        "stuId": result.stuId,
                                        "msg": req.body.msg,
                                        "teachId": result.teachId,
                                        "acceptTime":result.acceptTime,

                                        "subId":result.subId,
                                        "attachment":attachment,
                                        "extension":req.body.extension,
                                        "seenTime":result.seenTime,
                                        "localTime":result.localTime,
                                        "sendTime": new Date().getTime().toString(),
                                        "intId": result.intId,
                                        "msgBy": "3",
                                        "iStatus": "active"

                                    }
                                    mess.insert(ins,function (errin,resin) {
                                        if(errin===null)
                                        {


                                            var teachId = result.teachId

                                            var teach=db.collection('teacherDetails')
                                            teach.findOne({"teachId":teachId},function (error12,result12)
                                            {
                                                if(error12===null) {
                                                    var cloudmsg = []
                                                    if ((result12.regTokens !== null) && (result12.regTokens !== undefined)) {
                                                        for (var i = 0; i < result12.regTokens.length; i++) {
                                                            cloudmsg.push(result12.regTokens[i])

                                                        }
                                                        var send=[]
                                                        send.push(ins);
                                                        cloud.send(cloudmsg, send, 0, 0)


                                                    }
                                                }
                                                else
                                                {
                                                    res.send({"status":"error","msg":"Oopss21 something went wrong"})

                                                }
                                            })
                                            var stu=db.collection('digo')
                                            var d=req.body.stuId
                                            var ObjectId=mongo.ObjectId
                                            var _id = new ObjectId(d)
                                            console.log(d)
                                            stu.findOne({"_id":_id},function (error122,result122)
                                            {
                                                if(error122===null) {
                                                    console.log(_id)
                                                    var cloudmsg1 = []
                                                    if ((result122.regTokens !== null) && (result122.regTokens !== undefined)) {
                                                        for (var i = 0; i < result122.regTokens.length; i++) {
                                                            cloudmsg1.push(result122.regTokens[i])

                                                        }
                                                        var send=[]
                                                        send.push(ins);
                                                        cloud.send(cloudmsg1, send, 0, 1)



                                                    }
                                                }
                                                else
                                                {
                                                    res.send({"status":"error","msg":"Oopss21 something went wrong"})
                                                }
                                            })

                                            var doc111 = {"status": "success",'msg':'Msg sent',data:ins}
                                            res.send(doc111)
                                        }
                                        else
                                        {
                                            var doc111 = {"status": "error"}
                                            res.send(doc111)
                                        }

                                    })
 // mess.insert(ins,function (errinsert,resultinsert) {
 //    if(errinsert===null)
 //
 //    {



        //


                // var doc111={"status":"success","msg":"d"}
        //
        //         res.send(doc111)
        //
        //
        //
        //     }
        //     // else
        //     // {
        //     //     var doc={"status":"error","msg":"Oops3 something went wrong!"}
        //     //     res.send(doc)
        //     // }
        //
        //
        // })
            }
            else
            {
                var doc={"status":"error","msg":"No data found."}
                res.send(doc)
            }


        // })
        //




// })

                                    //send message to all users






                                // }
                            // else
                                //res.send({"status":"success"})
                            //     {res.send({"status":"error","msg":"No msg"})}
                            }
                            else
                            {
                                res.send({"status":"error","msg":"Oops something went wrong."})

                            }
                           })
                    }})}})}}
                                module.exports=messageA