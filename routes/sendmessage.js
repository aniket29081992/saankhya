var mongo = require('mongodb');
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
function firstEntry(req,res,mess) {

    console.log("cofse")
    var findCheck={"stuId":req.body.stuId};
    var cursor=mess.find(findCheck).sort({sendTime:-1}).limit(1)
    var count=0
    var insertDocument;
    cursor.each(function (err,item) {
        if(err===null)
        {

           if(count++==0)
           {
               console.log("check")
               if(item!=null)
           {

               //check conditions
               if((item.iStatus==="unassigned"))
               {
                   var attachment
                   if((req.body.attachment===' ')||(req.body.attachment.length==0))
                       attachment=''
                   else{

                       attachment=req.body.attachment
                   //    uploadimg.upload(attachment,req.body.attachment)
                       }
                   insertDocument = {
                       "iStatus": "unassigned",
                       "stuId": req.body.stuId,
                       "msg": req.body.msg,
                       "teachId": "",
                       "firstName":req.body.firstName,

                       "subId":req.body.subId,
                       "localTime":req.body.localTime,
                       "attachment":attachment,
                       "extension":req.body.extension,
                       "seenTime":"",



                       "sendTime": new Date().getTime().toString(),
                       "intId": item.intId,
                       "msgBy": req.body.msgBy
                   }
               }
               else
                   if(item.iStatus==="inactive")
                   {
                       var attachment

                       console.log("diggo"+req.body.attachment.length)
                       if((req.body.attachment===' ')||(req.body.attachment.length==0))
                           attachment=' '
                       else{
                           attachment=req.body.attachment
                           // uploadimg.upload(attachment,req.body.attachment)
                       }
                       insertDocument = {
                           "iStatus": "unassigned",
                           "stuId": req.body.stuId,
                           "msg": req.body.msg,
                           "firstName":req.body.firstName,
                           "teachId": "",
                           "localTime":req.body.localTime,
                           "subId":req.body.subId,
                           "attachment":attachment,
                           "extension":req.body.extension,
                           "seenTime":"",

                           "sendTime": new Date().getTime().toString(),
                           "intId": req.body.stuId+new Date().getTime().toString(),
                           "msgBy": req.body.msgBy
                       }

                   }


           }
           else

               {
                   var attachment

                   console.log("diggo"+req.body.attachment.length)
                   if((req.body.attachment===' ')||(req.body.attachment.length==0))
                       attachment=' '
                   else{

                       attachment=req.body.attachment
                    //   uploadimg.upload(attachment,req.body.attachment)
                       // uploadimg.upload(req.body.attachment)
                       // attachment="https://myimageping.s3.ap-south-1.amazonaws.com/"+req.body.stuId+new Date().getTime().toString()
                   }
                   insertDocument = {
                       "iStatus": "unassigned",
                       "stuId": req.body.stuId,
                       "msg": req.body.msg,
                       "teachId": "",
                       "subId":req.body.subId,
                       "firstName":req.body.firstName,

                       "attachment":attachment,
                       "extension":req.body.extension,
                       "seenTime":"",
                       "localTime":req.body.localTime,


                       "sendTime": new Date().getTime().toString(),
                       "intId": req.body.stuId+new Date().getTime().toString(),
                       "msgBy": req.body.msgBy
                   }
               }

               mess.insert(insertDocument, function (err, result)
               {
                   if (err === null) {
                       // console.log(result)
                       var userS=[]
                       // userS.push('eOIImMOH9eo:APA91bHfA3TN5-xpeHmz6emCizyG05bo8CZcN13G5--FS5UhNubQt_H__rO9gfYVBm5pFHkKx8Bn0S5tCkz8379m3DVty5rLHUIXo_-6ENJx0JR2nGuADNYA7zPhZryFXG3jdK_jAmOu')
                       // userS.push('d45cU0fSC2s:APA91bEic92SRp2UIpVXTNzP_JugcZDN8wlMUHYf2uUjz3g0qkV3y13GnbEtjk37zU76VFNKSVb5u1GowkBJ9f_4M17ucPmd2Tf1Tc_pXHVP16l67G0dRRBdGPWnEDOrgnDyChRLjExF')
                       // userS.push('eHIknDUbIj8:APA91bHwas2vGsgVUzJpz33wt3jC4FJGH-SLDmP_WIzbCW5gMYOsqWQg2UX5p0kgyStB1vRrpyzN4ari2FRff2laoiJ1ln_P0kNgyBB3lqsMIGhi0tBNEQ_op1Y-LkgwGYdE8vUQYNUQ')
                       // userS.push('ddTiyJ4-VcE:APA91bFvoWHUtfc_KgHUNJUUwnKDIZfnE1YjyW0Bded_5O1kZXWxKPtgrwzN3BUKVgMvJjYfuwmlJGue_PNoS5THQDvV7W5DYLcvO5QQGPqifA47TBaCn_vU-9d7LzXMnxzCFgfRcbgT')

                       // userS.push('eOIImMOH9eo:APA91bHfA3TN5-xpeHmz6emCizyG05bo8CZcN13G5--FS5UhNubQt_H__rO9gfYVBm5pFHkKx8Bn0S5tCkz8379m3DVty5rLHUIXo_-6ENJx0JR2nGuADNYA7zPhZryFXG3jdK_jAmOu')
                       // userS.push('')
//check this code from here
                       var teacher=db.collection('teacherDetails');
                       var checkSum=0;
                       //add subid
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
                                           console.log("digo"+item.regTokens[i])
                                           userS.push(item.regTokens[i])
                                       }


                                   }
                                   else
                                   {
                                       if(checkSum==1)
                                       {
                                           var msg = {"status": "error", "msg": "Oops something went wrong."}
                                           res.send(msg);
                                       }
                                       else {

                                           var msg =
                                           {"status": "success", "msg": "Message sent","data":result.ops[0]
                                           }
                                           res.send(msg);
                                           var dataa=[]
                                           dataa.push(result.ops[0])
                                           cloud.send(userS,dataa,1,0)
                                           console.log("bas"+userS)}

                                   }
                               }}})
                       //to here




                     //

                       //api call

                   }
                   else {
                       var msg = {"status": "error", "msg": "Oops something went wrong"}
                       res.send(msg);

                   }

               })
           }




        }

    })

//check last message if it is unassigned then copy interaction id ,if it is active then also else create new interaction id





}

var jsonParser = bodyParser.json();
var message = {
    sendnew: function (req, res) {
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


        db.open(function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('message', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                      var mess=db.collection('message');
                        var findInt={"stuId":req.body.stuId,"iStatus":"active"};

                        mess.findOne(findInt,function (errors,doc) {
                            if(errors===null)
                            {
                                if(doc===null)
                                {
                                    //if time check here then only
                                    firstEntry(req,res,db.collection('message'))
//insert


                                }
                                else
                                    {
                                    var mess=db.collection('message');
                                    var teacherTime=0;
                                    var checkTeacher=0;
                                        var check=0;
                                    var findCheck={"stuId":req.body.stuId,"iStatus":"active","msgBy":"1"};
                                    var resultteacher=mess.find(findCheck).sort({sendTime:-1}).limit(1)
                                    resultteacher.each(function (err, item) {
                                        if (err === null) {
                                            if(check++==0){
                                            if(item!==null)
                                            {

                                                teacherTime=parseInt(item.sendTime)
                                                console.log("check2"+teacherTime)
                                                var difference=new Date().getTime()-teacherTime;
                                                console.log(difference)

                                                if(difference<=5*60*1000)
                                                {

                                                    {

                                                        var attachment

                                                        console.log("diggo"+req.body.attachment.length)
                                                        if((req.body.attachment===' ')||(req.body.attachment.length==0))
                                                            attachment=' '
                                                        else{

                                                            attachment=req.body.attachment
                                                          //  uploadimg.upload(attachment,req.body.attachment)
                                                            // uploadimg.upload(req.body.attachment)
                                                            // attachment="https://myimageping.s3.ap-south-1.amazonaws.com/"+req.body.stuId+new Date().getTime().toString()
                                                        }
                                                        var ins = {
                                                            "stuId": req.body.stuId,
                                                            "msg": req.body.msg,
                                                            "teachId": item.teachId,
                                                            "firstName":req.body.firstName,
                                                            "subId":req.body.subId,
                                                            "attachment":attachment,
                                                            "extension":req.body.extension,
                                                            "seenTime":"",
                                                            "localTime":req.body.localTime,
                                                            "sendTime": new Date().getTime().toString(),
                                                            "intId": doc.intId,
                                                            "msgBy": req.body.msgBy,
                                                            "iStatus": "active"

                                                                   }

                                                        mess.insert(ins, function (err, result) {
                                                            if (err === null) {
                                                                // console.log(result)
                                                                // var userS=[]
                                                                //insert teacher tokens
                                                                //userS.push('e8k3CgDPZpA:APA91bGx5-RGIvI1XHO63pdZ1HLltuqdpjafWQz01HfmyhZC-1qCLwCwqSeRCsVWCvoYXmdrH9bbYwXiruqhJadHJYjqBlqT2rBjMKrjlJNvM3wiJzaG8KytJjQd6Xfx7IPu1Gn-cGdR')
                                                                var userS=[]
                                                                //insert teacher tokens
                                                                var teacher=db.collection('teacherDetails');
                                                                var d=item.teachId

                                                                teacher.findOne({"teachId":d},function (err5,res5) {
                                                                    if(err5===null)
                                                                    {
                                                                        if(res5!==null)
                                                                        {
                                                                            for(var i=0;i<res5.regTokens.length;i++)
                                                                                userS.push(res5.regTokens[i])

                                                                            var dataa=[]
                                                                            dataa.push(result.ops[0])
                                                                            cloud.send(userS,dataa,0,0)

                                                                            var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
                                                                            res.send(msg);}
                                                                            else
                                                                        no
                                                                    }})

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
                                                    {
                                                        //find and modify all
                                                        var findInt={"stuId":req.body.stuId,"iStatus":"active"};
                                                        mess.updateMany(findInt, { $set:{"iStatus":"inactive"}},function (errr,resss) {
                                                            if(errr===null)
                                                            {
                                                                var teachDb=db.collection("teacherDetails");
                                                                //add subid
                                                                teachDb.update({"teachId":item.teachId,},{ $set:{"availStatus":"active"}},function (error1,result1) {
                                                                    if(error1===null)
                                                                    {
                                                                        console.log("yahoo"+item.teachId)
                                                                        firstEntry(req,res,mess)


                                                                    }})
console.log("mera naam "+resss)


                                                            }
                                                            else
                                                            {
                                                                var msg = {"status": "error", "msg": "Oops something went wrong"}
                                                                res.send(msg);
                                                            }
                                                        })


                                                    }
                                                }

                                                console.log((difference)/(1000*60*60))
                                            }
                                            else
                                            {
//here
//check if last message time by student if time is less than 2  minutes then
var check2=0;
                                                var findCheck={"stuId":req.body.stuId,"iStatus":"active","msgBy":"0"};
                                                var resultteacher=mess.find(findCheck).sort({sendTime:-1}).limit(1)
                                                resultteacher.each(function (err, item) {
                                                    if (err === null) {
                                                        if(check2++==0){
                                                            if(item!==null)
                                                            {
                                                               var firstMsgtime=parseInt(item.sendTime)

                                                                var differenceNow=firstMsgtime-parseInt(item.acceptTime);



                                                                if(differenceNow<=2*60*1000)
                                                                {
                                                                    var mess=db.collection('message');

                                                                    var attachment

                                                                    console.log("diggo"+req.body.attachment.length)
                                                                    if((req.body.attachment===' ')||(req.body.attachment.length==0))
                                                                        attachment=' '
                                                                    else {

                                                                        attachment=req.body.attachment
                                                          //              uploadimg.upload(attachment,req.body.attachment)
                                                                        // uploadimg.upload(req.body.attachment)
                                                                        // attachment = "https://myimageping.s3.ap-south-1.amazonaws.com/" + req.body.stuId + new Date().getTime().toString()
                                                                    }var ins =
                                                                    {
                                                                        "stuId": req.body.stuId,
                                                                        "msg": req.body.msg,
                                                                        "teachId": doc.teachId,
                                                                        "subId":req.body.subId,
                                                                        "acceptTime":item.sendTime,
                                                                        "attachment":attachment,
                                                                        "extension":req.body.extension,
                                                                        "seenTime":"",
                                                                        "localTime":req.body.localTime,
                                                                        "sendTime": new Date().getTime().toString(),
                                                                        "intId": doc.intId,
                                                                        "firstName":req.body.firstName,
                                                                        "msgBy": req.body.msgBy,
                                                                        "iStatus": "active"

                                                                    }

                                                                    mess.insert(ins, function (err, result)
                                                                    {
                                                                        if (err === null) {
                                                                            // console.log(result)
                                                                            var userS=[]
                                                                            var teacher=db.collection('teacherDetails');
                                                                            teacher.findOne({ "teachId": doc.teachId},function (errors,resultnew)
                                                                            {
                                                                                if(errors===null)
                                                                                {
                                                                                    console.log("digo+"+resultnew.regTokens[0])

                                                                                    for(var i=0;i<resultnew.regTokens.length;i++)
                                                                                    {
                                                                                        //console.log(item.regTokens[i])
                                                                                        userS.push(resultnew.regTokens[i])
                                                                                    }
                                                                                    var dataa=[]
                                                                                    dataa.push(result.ops[0])
                                                                                    cloud.send(userS,dataa,0,0)


                                                                                    var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
                                                                                    res.send(msg);
                                                                                }
                                                                                else
                                                                                {
                                                                                    var msg = {"status": "error", "msg": "Oops something went wrong"}
                                                                                    res.send(msg);
                                                                                }


                                                                            })
                                                                           // userS.push('e8k3CgDPZpA:APA91bGx5-RGIvI1XHO63pdZ1HLltuqdpjafWQz01HfmyhZC-1qCLwCwqSeRCsVWCvoYXmdrH9bbYwXiruqhJadHJYjqBlqT2rBjMKrjlJNvM3wiJzaG8KytJjQd6Xfx7IPu1Gn-cGdR')

                                                                        }
                                                                        else
                                                                            {
                                                                            var msg = {"status": "error", "msg": "Oops something went wrong"}
                                                                            res.send(msg);

                                                                             }

                                                                                                              })
                                                                }
                                                                else
                                                                {

                                                                    var mess=db.collection('message');
                                                                    var findInt={"stuId":req.body.stuId,"iStatus":"active","intId":item.intId};
                                                                    mess.updateMany(findInt, { $set:{"iStatus":"unassigned","teachId":"","seenTime":""}},function (errr,resss) {
                                                                        if(errr===null)
                                                                        {
                                                                            var teachDb=db.collection("teacherDetails");
                                                                            teachDb.update({"teachId":item.teachId},{ $set:{"availStatus":"active"}},function (error1,result1) {
                                                                                if(error1===null)
                                                                                {

                                                                                    var attachment
                                                                                    console.log("diggo"+req.body.attachment.length)
                                                                                    if((req.body.attachment===' ')||(req.body.attachment.length==0))
                                                                                        attachment=' '
                                                                                    else {

                                                                                        attachment=req.body.attachment


                                                                                        //uploadimg.upload(attachment,req.body.attachment)
                                                                                        // uploadimg.upload(req.body.attachment)
                                                                                        // attachment = "https://myimageping.s3.ap-south-1.amazonaws.com/" + req.body.stuId + new Date().getTime().toString()
                                                                                    }
                                                                                        var insertDocument = {
                                                                                        "iStatus": "unassigned",
                                                                                        "stuId": req.body.stuId,
                                                                                        "msg": req.body.msg,
                                                                                        "teachId": "",
                                                                                            "firstName":req.body.firstName,
                                                                                        "subId":req.body.subId,
                                                                                        "localTime":req.body.localTime,
                                                                                        "attachment":attachment,
                                                                                        "extension":req.body.extension,
                                                                                        "seenTime":"",



                                                                                        "sendTime": new Date().getTime().toString(),
                                                                                        "intId": item.intId,
                                                                                        "msgBy": req.body.msgBy
                                                                                    }
                                                                                    mess.insert(insertDocument, function (err, result)
                                                                                    {
                                                                                        if (err === null) {
                                                                                            //her
                                                                                            var findCheck={"intId":item.intId,"stuId":req.body.stuId,"subId":req.body.subId};
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
                                                                                                                            {
                                                                                                                                var msg = {"status": "error", "msg": "Oops something went wrong."}
                                                                                                                                res.send(msg);

                                                                                                                                console.log("no one active")}
                                                                                                                            else {
                                                                                                                                cloud.send(userS,noDocs,1,0)
                                                                                                                                console.log("bas"+userS)
                                                                                                                                res.send({"status": "success",
                                                                                                                                    "msg": "Message sent",
                                                                                                                                    "case":1,
                                                                                                                                    "data":noDocs})}

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
                                                                                            //r


                                                                                        }})

                                                                                    console.log("yahoo"+item.teachId)

                                                                                    // firstEntry(req,res,mess)mess
                                                                                }
                                                                            })
                                                                            console.log("mera naam "+resss)


                                                                        }
                                                                        else
                                                                        {
                                                                            var msg = {"status": "error", "msg": "Oops something went wrong"}
                                                                            res.send(msg);
                                                                        }
                                                                    })



                                                                }

                                                            }}}})




                                            }

                                            // else
                                            // {
                                            //
                                            //     var ins = {
                                            //         "stuId": req.body.stuId,
                                            //         "msg": req.body.msg,
                                            //         "teachId": item.teachId,
                                            //         "subId":req.body.subId,
                                            //         "attachment":req.body.attachment,
                                            //         "extension":req.body.extension,
                                            //         "seenTime":req.body.seenTime,
                                            //         "localTime":req.body.localTime,
                                            //         "sendTime": new Date().getTime().toString(),
                                            //         "intId": doc.intId,
                                            //         "msgBy": req.body.msgBy,
                                            //         "iStatus": "active"
                                            //
                                            //          }
                                            //
                                            //     mess.insert(ins, function (err, result) {
                                            //         if (err === null) {
                                            //             // console.log(result)
                                            //             var userS=[]
                                            //             userS.push('')
                                            //             cloud.send(userS)
                                            //
                                            //             var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
                                            //             res.send(msg);
                                            //         }
                                            //
                                           //       else {
                                            //             var msg = {"status": "error", "msg": "Oops something went wrong"}
                                            //             res.send(msg);
                                            //
                                            //         }
                                            //
                                            //     })
                                            //
                                            // }

                                            }
                                        }})


                                    //time check
                                    // var w=studentTime-teacherTime;
                                    // console.log("dont"+w)

                                      var w=0;


                                    //check time
                                    //if time then update
                                    //else
//create new in table
                                   // console.log(doc)
                                }
                            }
                            else
                            {
                                res.send({"status":"error","msg":"Oops something went wrong"})

                            }


                        })
                    }
                });
            }});}
                    }
module.exports=message;