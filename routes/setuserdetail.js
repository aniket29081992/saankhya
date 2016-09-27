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


        MongoClient.connect(host,function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {

                        var pass = db.collection("digo");


                        // var docins={"grade":grade,"school":school,"city":city,"target":target,"after10":after10};

                        var userId=req.body.userId
                        var ObjectId=mongo.ObjectId
                        var _id = new ObjectId(userId)

console.log(_id)
                        // var encrypasss=encrypt(new Buffer(passwordd, "utf8")).toString('utf-8');
                       // var encryphone=encrypt(new Buffer(phone, "utf8")).toString('utf-8');
                        pass.findOne({ "_id": _id },function (error,result) {
                            if(error===null)
                            {
                                if(result===null)
                                {
                                    var doc={"status":"error","msg":"No user found"}
                                    res.send(doc)
                                }
                                else
                                {
                                    var grade=req.body.grade
                                    var school=req.body.school;
                                    var city=req.body.city;

                                    var target=req.body.target;
                                    var after10=req.body.after10;
                                    var firstName=req.body.firstName
                                    var lastName=req.body.secondName
                                    var dp=req.body.dp
                                    var schoolid=req.body.schoolid
                                    var dob=req.body.dob
                                    var docins={}

                                    if(grade!==null&&grade!==undefined)
                                        docins['grade']=grade
                                    if(dob!==null&&dob!==undefined)
                                        docins['dob']=dob
                                    if(school!==null&&school!==undefined)
                                    {
                                        docins['school'] = school
                                    }
                                    if(city!==null&&city!==undefined)
                                        docins['city']=city
                                    if(target!==null&&target!==undefined)
                                    {
                                        docins['target']=target}
                                    if(after10!==null&&after10!==undefined)
                                    {
                                        docins['after10']=after10}
                                    if(dp!==null&&dp!==undefined)
                                        docins['dp']=dp
                                    if(firstName!==null&&firstName!==undefined)
                                        docins['firstName']=firstName
                                    if(lastName!==null&&lastName!==undefined)
                                        docins['secondName']=lastName
                                    if(schoolid!==null&&schoolid!==undefined)
                                        docins['schoolid']=schoolid


                                    console.log(result)
                                    var newcoins=parseInt(result.coins)
                                    newupdatedcoins=newcoins
                                    if((result.school===null||result.school===undefined)&&((req.body.school!=null)))
                                    {

                                        newupdatedcoins=newupdatedcoins+1000
                                            docins['coins']=newupdatedcoins



                                    }
                                    if((result.target===null||result.target===undefined)&&((req.body.target!=null)))
                                {

                                    newupdatedcoins=newupdatedcoins+500
                                    docins['coins']=newupdatedcoins



                                }
                                    if((result.after10===null||result.after10===undefined)&&((req.body.after10!=null)))
                                    {

                                        newupdatedcoins=newupdatedcoins+500
                                        docins['coins']=newupdatedcoins



                                    }
                                  pass.findAndModify({"_id": _id },[],{$set:docins},function(errorupdated,resultupdated)
                                    {
                                        if(errorupdated===null)
                                        {
                                            if(resultupdated.value===null)
                                                res.send({"status":"error","msg":"No user found."})
                                            else
                                            {
                                                var doc={"status":"success","msg":"Updated successfully","data":resultupdated.value}
                                            res.send(doc)
                                            }



                                        }
                                        else
                                        {
                                            res.send({"status":"error","msg":"Something went wrong"})
                                        }


                                    })

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