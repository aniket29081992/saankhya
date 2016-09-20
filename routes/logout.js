var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
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
var logout = {
    logoutteachstud: function (req, res) {
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
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var collectionsout;
                        var _id;
                        var comp;
                        if(req.body.logout==='0')//0 is for students
                        {

                            collectionsout=db.collection('digo')
                            var d=req.body.userId
                            var ObjectId=mongo.ObjectId
                           _id = new ObjectId(d)
                            comp="_id"
                        }
                        else //1 is for teacher
                        {

                            collectionsout=db.collection('teacherDetails')
                            _id=req.body.userId
                            comp="teachId"
                        }
                      //noinspection JSAnnotator
                        collectionsout.update({[comp]:_id},{ $pull: {"regTokens": req.body.regToken} },function (err,result) {
                          //  console.log("logout chekc"+result.firstName)
                          if(err===null)
                          {
                              res.send({"status":"success","msg":"deleted reg token"})
                          }
else
                          {
                              res.send({"status":"error","msg":"Something went wrong!"})
                          }
                        })




                    }
                })
            }
        })
    }}
    module.exports=logout