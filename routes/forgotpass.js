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
    //return buffer;
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
}

function decrypt(buffer){
   // return buffer
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);

    return dec;
}

var jsonParser = bodyParser.json();
var forgot = {
    reset: function (req, res) {
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
                        var pass = db.collection("signup");
                        var phone=req.body.username
                        var passwordd=req.body.password
                        var encrypasss=encrypt(new Buffer(passwordd, "utf8")).toString('utf-8');
                        var encryphone=encrypt(new Buffer(phone, "utf8")).toString('utf-8');
                        console.log(decrypt(encrypasss))
                        pass.findAndModify({ "phone" : encryphone }, [],{ $set:{"password": encrypasss}} ,function (error,result) {
                            if(error===null)
                            {
                                if(result.value===null)
                                {
                                    var doc={"status":"error","msg":"No user found."}
                                    res.send(doc)
                                }
                                else
                                {console.log(result)
                                    var doc={"status":"success","msg":"Password changed successfully."}
                                    res.send(doc)

                                }
                            }
                            else
                            {
                                console.log(error)
                                var doc={"status":"error","msg":"Something went wrong"}
                                res.send(doc)
                            }

                        })

                    }})}})},

    change: function (req, res) {
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
                        var pass = db.collection("signup");
                        var user=req.body.username

                        var passwordd=req.body.password
                        var encrypasss=encrypt(new Buffer(passwordd, "utf8")).toString('utf-8');
                        var newencrypasss=encrypt(new Buffer(req.body.newpassword, "utf8")).toString('utf-8');
                        var encryphone=encrypt(new Buffer(user, "utf8")).toString('utf-8');
                        var ObjectId=mongo.ObjectId
                       var _id = new ObjectId(user)
                        console.log(passwordd+decrypt(encrypt(new Buffer(passwordd, "utf8"))))
                    var check=new Buffer(encrypasss,"utf-8")
                        var newstring=decrypt(check)
                     var phone11=new Buffer(encrypasss,'utf-8')

                        console.log(decrypt(encrypasss))
                        console.log(encrypt(new Buffer(passwordd, "utf8")))



                        pass.findAndModify( {"userId":_id,'password':encrypasss }, [],{ $set:{"password": newencrypasss}} ,function (error,result) {
                            if(error===null)
                            {
                                if(result.value===null)
                                {
                                    var doc={"status":"error","msg":"Please enter the correct details."}
                                    res.send(doc)
                                }
                                else
                                {console.log(result)
                                    var doc={"status":"success","msg":"Password changed successfully"}
                                    res.send(doc)

                                }
                            }
                            else
                            {
                                console.log(error)
                                var doc={"status":"error","msg":"Something went wrong."}
                                res.send(doc)
                            }

                        })

                    }})}})}
                    }
module.exports = forgot;
