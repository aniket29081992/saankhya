var mongo = require('mongodb');
var crypto = require('crypto');
var cloud=require('../test')
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

function decrypt(buffer){
    return buffer
    // var decipher = crypto.createDecipher(algorithm,password)
    // var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    // return dec;
}
function firstEntry(req,res,mess) {
    var ins = {
        "iStatus": "inactive",
        "stuId": req.body.stuId,
        "msg": req.body.msg,
        "teachId": "",
        "sendTime": new Date().getTime().toString(),
        "intId": new Date().getTime().toString(),
        "msgBy": req.body.msgBy
    }
    mess.insert(ins, function (err, result) {
        if (err === null) {
            console.log(result)
            var userS=[]
            userS.push('eOIImMOH9eo:APA91bHfA3TN5-xpeHmz6emCizyG05bo8CZcN13G5--FS5UhNubQt_H__rO9gfYVBm5pFHkKx8Bn0S5tCkz8379m3DVty5rLHUIXo_-6ENJx0JR2nGuADNYA7zPhZryFXG3jdK_jAmOu')
            userS.push('d45cU0fSC2s:APA91bEic92SRp2UIpVXTNzP_JugcZDN8wlMUHYf2uUjz3g0qkV3y13GnbEtjk37zU76VFNKSVb5u1GowkBJ9f_4M17ucPmd2Tf1Tc_pXHVP16l67G0dRRBdGPWnEDOrgnDyChRLjExF')
            userS.push('eHIknDUbIj8:APA91bHwas2vGsgVUzJpz33wt3jC4FJGH-SLDmP_WIzbCW5gMYOsqWQg2UX5p0kgyStB1vRrpyzN4ari2FRff2laoiJ1ln_P0kNgyBB3lqsMIGhi0tBNEQ_op1Y-LkgwGYdE8vUQYNUQ')
            userS.push('ddTiyJ4-VcE:APA91bFvoWHUtfc_KgHUNJUUwnKDIZfnE1YjyW0Bded_5O1kZXWxKPtgrwzN3BUKVgMvJjYfuwmlJGue_PNoS5THQDvV7W5DYLcvO5QQGPqifA47TBaCn_vU-9d7LzXMnxzCFgfRcbgT')

            // userS.push('eOIImMOH9eo:APA91bHfA3TN5-xpeHmz6emCizyG05bo8CZcN13G5--FS5UhNubQt_H__rO9gfYVBm5pFHkKx8Bn0S5tCkz8379m3DVty5rLHUIXo_-6ENJx0JR2nGuADNYA7zPhZryFXG3jdK_jAmOu')
            // userS.push('')

            cloud.send(userS,req.body.msg)

            var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
            res.send(msg);
            //api call
                          }
        else {
            var msg = {"status": "error", "msg": "Oops something went wrong"}
            res.send(msg);

        }

    })

}

var jsonParser = bodyParser.json();
var message = {
    sendnew: function (req, res) {
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
                      var mess=db.collection('message');
                        var findInt={"stuId":req.body.stuId,"iStatus":"active"};

                        mess.findOne(findInt,function (errors,doc) {
                            if(errors===null)
                            {
                                if(doc===null)
                                {
                                    //if time check here then only
                                    firstEntry(req,res,mess)


//insert
         console.log("chill")

                                }
                                else
                                {
                                    //time check
                                    var w=1;
                                    if(w==0)

                                    {
                                        var ins = {
                                            "stuId": req.body.stuId,
                                            "msg": req.body.msg,
                                            "teachId": "",
                                            "sendTime": new Date().getTime().toString(),
                                            "intId": doc.intId,
                                            "msgBy": req.body.msgBy,
                                            "iStatus": "active"

                                        }

                                        mess.insert(ins, function (err, result) {
                                            if (err === null) {
                                                console.log(result)
                                                var userS=[]
                                                userS.push('')
                                                cloud.send(userS)

                                                var msg = {"status": "success", "msg": "Message sent","data":result.ops[0]}
                                                res.send(msg);
                                            }
                                            else {
                                                var msg = {"status": "error", "msg": "Oops something went wrong"}
                                                res.send(msg);

                                                  }

                                        })
                                        console.log(doc)
                                    }
                                   else
                                    {
                                        //find and modify all
                                        var findInt={"stuId":req.body.stuId,"iStatus":"active"};
                                    mess.updateMany(findInt, { $set:{"iStatus":"inactive"}},function (errr,resss) {
                                        if(errr===null)
                                        {

                                            firstEntry(req,res,mess)

                                        }
                                        else
                                        {
                                            var msg = {"status": "error", "msg": "Oops something went wrong"}
                                            res.send(msg);
                                        }
                                    })


                                    }
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