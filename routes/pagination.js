var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var config=require('../config')

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
var page = {
   pagination: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

       var host=config.development.database.host
       var port=config.development.database.port
       var dbname=config.development.database.db

       var server = new Server(host, port, {auto_reconnect: true});
       db = new Db(dbname, server);
         db.open(function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var userId=req.body.userId
                        var page=req.body.page

                        var college = db.collection("message");
                        var skp=0;
                        var lmt=0;
                       skp=(page-1)*5;
                        if(page==1)
                            lmt=2
                        else
                            lmt=5
                        var sendDoc=[]


                        var cursor = college.find({"stuId":userId,sendTime: { $lt: req.body.sendTime }}
                        ).sort({sendTime: -1}).skip(skp).limit(lmt);
                        cursor.each(function (err, item) {
                            if (err === null) {
                           if(item!==null)
                           {

                               sendDoc.push(item)
                                console.log(item.sendTime);
                           }
                                else
                           {
                               console.log("mine"+sendDoc.length)
                               if(sendDoc.length==0)
                                   res.send({"status:":"error","msg":"We ran out of pages"})
                               else{
                               var senddoc;
                               if(page==1){
                                   senddoc={"status:":"success","data":sendDoc}
                               res.send(senddoc)}
                               else

                               res.send({"status:":"success","data":sendDoc})}
                           }

                                              }
                                              else
                            {
                                res.send({"status:":"error","msg":"Something went wrong"})

                            }
                        });
                    }
                })
            }
        })
    }
}
module.exports=page;

