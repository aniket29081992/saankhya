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
    //return buffer
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
}

var jsonParser = bodyParser.json();
var end = {
    endchat: function (req, res) {
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
                db.collection('otp', {strict: true}, function (err, collection)
                {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                              }
                    else
                        {
                        var message=db.collection('message')
                        var teacherId=req.body.teachId
                        var interId=req.body.interId
                        var checkFind={"stuId":req.body.stuId,"intId":interId}
                        var docc={}
                        docc['iStatus']='inactive'
                            docc['iStatus']='inactive'
                            docc['endType']=req.body.endType.toString()

                        message.updateMany(checkFind,{ $set:docc},function (error11,result11)
                        {
                            if(error11===null)
                            {
                                 console.log(result11.result.nModified)
                                if(result11.result.nModified!=0)
                                {
                                   console.log(result11)
                                    var teach=db.collection('teacherDetails')
                                    teach.update({"teachId":teacherId},{ $set:{"availStatus":"active"}},function (error111,result111)
                                    {
                                        if(error111===null)
                                        {
                                            console.log(result111.result.nModified)
                                            // if(result111.result.nModified!=0)
                                            {
                                                var doc={"status":"success","msg":"Updated successfully"}
                                                res.send(doc)
                                            }
                                            // else
                                            // {
                                            //     var doc={"status":"error","msg":"Teacher not found"}
                                            //     res.send(doc)
                                            //
                                            // }
                                        }
                                        else
                                        {
                                            var doc={"status":"error","msg":"Oops something went wrong"}
                                            res.send(doc)
                                        }

                                    })
                                }
                                else
                                {
                                    var doc={"status":"error","msg":"Not found"}
                                    res.send(doc)
                                }
                            }
                            else
                            {var doc={"status":"error","msg":"Oops something went wrong"}
                                res.send(doc)}

                        })






                    }})}})}}
                    module.exports=end