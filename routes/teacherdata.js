var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var cloud = require('../test')
var config=require('../config')
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
var teachSignup = {
    signup: function (req, res) {
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
                        var teacher = db.collection("teacherDetails")
                        teacher.findOne({
                            "teachId": req.body.teachId,

                        }, function (err, res1) {
                            if (err === null) {
                                if(res1!=null)
                                {
                                    var doc={"status":"error","msg":"Userid already taken."}
                                    res.send(doc)
                                }
                                else
                                {
                                    var teacher = db.collection("teacherDetails")
                                    //teach id name
                                    teacher.findOne({"teachId":req.body.teachId},function(error2,result2)
                                    {
                                        if(error2===null)
                                        {
                                            if(result2===null)
                                            {
                                                var regTokens=[]
                                                var doc={"firstName":req.body.firstName,"lastName":req.body.lastName,
                                                    "teachId":req.body.teachId,"teachPass":req.body.teachPass,"subIds":req.body.subIds,
                                                    "availStatus":"active","blockingStatus":false}
                                                teacher.insert(doc,function (error,resultss)
                                                {
                                                    if(error==null)
                                                    {
                                                        var doc1={"status":"success","msg":"teacher details updated"};
                                                        res.send(doc1)
                                                    }
                                                    else
                                                    {
                                                        var doc={"status":"error","msg":"Oops something went wrong."}
                                                        res.send(doc)
                                                    }

                                                })

                                            }
                                            else
                                            {
                                                var doc={"status":"error","msg":"Id already taken"}
                                                res.send(doc)
                                            }
                                        }
                                        else
                                        {
                                            var doc={"status":"error","msg":"Oops something went wrong."}
                                            res.send(doc)

                                        }

                                    })


                                }

                            }
                        }
                        )}
                })
            }
        })},

    update: function (req, res) {
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
                        var teach=db.collection('teacherDetails')
                        var sub='',tid='',pass='';
                        tid=req.body.teachId
                        var doc1={}
                        doc={}

                        var doc2={}
                        if(req.body.pass!==undefined&&req.body.pass!==null)
                        {
                            pass = req.body.pass
                            var epass=encrypt(new Buffer(pass, "utf8")).toString('utf-8')
                            doc2['teachPass']=epass
                            doc['$set']=doc2

                        }

                        teach.findOne({"teachId":tid},function (errordoc,resultdoc) {
                            if(errordoc===null)
                            {
                                if(resultdoc===null)
                                    res.send({"status":"error","msg":"Teacher not found"})
                                else
                                {var ares=[]
                                    ares=resultdoc.subIds
                                    if((req.body.sub!==undefined&&req.body.sub!==null&&!(ares.includes(req.body.sub)))||((req.body.pass!==undefined&&req.body.pass!==null)))
                                    {
                                        if((req.body.sub!==undefined&&req.body.sub!==null&&!(ares.includes(req.body.sub))))
                                        {
                                            sub = req.body.sub
                                        doc1['subIds']=sub
                                        doc['$push']=doc1
                                        }
                                        // doc1=  { $push: { subIds: "89" } }
                                        // doc['subIds'].push(sub);



                                    teach.update({"teachId":tid},doc,function (errors,results) {
                                        if(errors===null)
                                        {
                                            res.send({"status":"success","msg":"Updated"})
                                        }
                                        else
                                        {
                                            res.send({"status":"error","msg":"Oops something went wrong"})
                                        }

                                    })}


                                }

                            }
                            else
                            {
                                res.send({"status":"error","msg":"Oops something went wrong"})
                            }


                        })







                    }})}})}



                    }
                            module.exports=teachSignup