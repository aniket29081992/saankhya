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
var setuserdetail = {
    set: function (req, res) {
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
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {

                        var pass = db.collection("digo");
                        var phone=req.body.phone
                        var grade=req.body.grade
                        var school=req.body.school;
                        var city=req.body.city;
                        var target=req.body.target;
                        var after10=req.body.after10;
                        var firstName=req.body.firstName
                        var lastName=req.body.secondName
                        var dp=req.body.dp
                        var docins={}
                        if(grade!==null&&grade!==undefined)
                        docins['grade']=grade
                        if(school!==null&&school!==undefined)
                        docins['school']=school
                        if(city!==null&&city!==undefined)
                        docins['city']=city
                        if(target!==null&&target!==undefined)
                        docins['target']=target
                        if(after10!==null&&after10!==undefined)
                        docins['after10']=after10
                        if(dp!==null&&dp!==undefined)
                        docins['dp']=dp
                        if(firstName!==null&&firstName!==undefined)
                        docins['firstName']=firstName
                        if(lastName!==null&&lastName!==undefined)
                        docins['secondName']=lastName

                        // var docins={"grade":grade,"school":school,"city":city,"target":target,"after10":after10};



                        // var encrypasss=encrypt(new Buffer(passwordd, "utf8")).toString('utf-8');
                        var encryphone=encrypt(new Buffer(phone, "utf8")).toString('utf-8');
                        pass.findAndModify({ "phone" : encryphone }, [],{ $set:docins},function (error,result) {
                            if(error===null)
                            {
                                if(result.value===null)
                                {
                                    var doc={"status":"error","msg":"No user found"}
                                    res.send(doc)
                                }
                                else
                                {
                                    var doc={"status":"success","msg":"Updated successfully","data":result.value}
                                    res.send(doc)

                                }
                            }
                            else
                            {
                                console.log(error)
                                var doc={"status":"error","msg":"Oops something went wrong"}
                                res.send(doc)
                            }

                        })



                    }
                })
            }
        });
    }}
module.exports = setuserdetail;