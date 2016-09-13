var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var config = require('../config')
var cloud=require('../test')
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
var seen = {
    msgseen: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

        var host = config.development.database.host
        var port = config.development.database.port
        var dbname = config.development.database.db

        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
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
                              var messg=db.collection('message');
                            var upd;
                              var stuId=req.body.stuId,
                                  teachId=req.body.teachId,
                                  interId=req.body.intId,
                                  seenBy=req.body.seenBy,
                                  subId=req.body.subId
                            if(seenBy==='0')
                                upd='1'
                            if(seenBy==='1')
                                upd='0'

                            var doc={"stuId":stuId,"intId":interId,"subId":subId,"iStatus":"active","seenTime":"","msgBy":upd}
                            console.log(doc)
                            messg.updateMany(doc,{$set:{"seenTime":new Date().getTime().toString()}},function (errornow,resultnow) {
                                if(errornow===null)
                                {
                                    var mod=parseInt(resultnow.result.nModified)
                                    console.log(mod)
                                    if(mod>0)
                                    {
                                    console.log(mod)
                                    var docn={"stuId":stuId,"intId":interId,"subId":subId,"iStatus":"active","msgBy":upd}
                                    var cursor=messg.find(docn).sort({sendTime:-1}).limit(mod)
                                    var senddoc=[]
                                    cursor.each(function (err,item) {
                                        if(err===null)
                                        {
                                            if(item!=null)
                                            {
                                                senddoc.push(item)
                                            }
                                            else

                                            {
                                                var collectionName;

                                                  var userId,
                                                      checkUserId;
                                                //check

var comp,
    _id,
    who;
                                                //send fcm to the other one if seenby is 0 send to student else teacher
if(seenBy==='0')
{
    collectionName=db.collection('digo')
    var d=req.body.stuId
    var ObjectId=mongo.ObjectId
    _id = new ObjectId(d)
    comp="_id"
    who=1

}
    //send msg to student id
    else {
    collectionName=db.collection('teacherDetails')
    _id=req.body.teachId
    comp="teachId"
    who=0
}
var regTokfcm=[];
                                                collectionName.findOne({[comp]:_id},function (errfcm,docfcm)
                                                {
                                                    if(errfcm===null)
                                                    {
                                                        if(docfcm!=null)

                                                        {
                                                            console.log(docfcm)
                                                            for(var i=0;i<docfcm.regTokens.length;i++)

                                                                regTokfcm.push(docfcm.regTokens[i])
                                                            cloud.send(regTokfcm,senddoc,3,who)


                                                        }
                                                    }



                                                })



                                                var success={"status":"success","data":senddoc}
                                                res.send(success)
                                            }

                                        }})}
                                        else
                                    {
                                        console.log("cool"+errornow)
                                        var send={"status":"error","msg":"Oops something went wrong."}
                                        res.send(send)
                                    }


                                }
                                else
                                {
                                    var send={"status":"error","msg":"Oops something went wrong."}
                                    res.send(send)
                                }

                            })

                            //seenBy is 0 if teacher sees and 1 if student sees it
                            //active msg id and seen is blank then update subid stud id






                             }
                    })
                }
            }
        )
    }
}
module.exports=seen