var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto'); 
var bodyParser = require('body-parser'); 
var plivo = require('plivo'); 
var config = require('../config')
var config = require('../config')  var crypto = require('crypto'), 
    algorithm = 'aes-256-ctr', 
    password = 'a13I11ET23';  function encrypt(buffer)
{     return buffer;     //
// var cipher = crypto.createCipher(algorithm,password) 
// var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]); 
// return crypted; }  function decrypt(buffer) {     return buffer     // var decipher = crypto.createDecipher(algorithm,password) 
// var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]); 
// return dec; 
}  var jsonParser = bodyParser.json();
var report = { 
    msgreported: function (req, res) { 
    var Server = mongo.Server, 
    Db = mongo.Db,             BSON = mongo.BSONPure;  
    var host = config.development.database.host 
    var port = config.development.database.port 
    var dbname = config.development.database.db  
    var server = new Server(host, port, {auto_reconnect: true}); 
    db = new Db(dbname, server); 
    var api = plivo.RestAPI({   authId: 'MAYJVLZGU4Y2JMODVLNJ', 
        authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',         });
        MongoClient.connect(host,function (err, db) {  
        if (!err) {console.log("Connected to 'signup' database"); 
            db.collection('otp', {strict: true}, function (err, collection) { 
                if (err) {                              console.log("The otp collection doesn't exist. Creating it with sample data...");                          } 

                else {  
                    var collectionreport = db.collection('reports') 
                    var reportedAt=new Date().getTime().toString() 
                         userId=req.body.userId 
                    reportedBy=req.body.reportedBy 
                    var msg=' '
                    msgId=req.body.msgId 
                   if(req.body.msg===undefined||req.body.msg===null)
                       msg=' '
                    else
                    msg=req.body.msg

                    reportedMsg=req.body.reportedMsg 
                    response=req.body.response


                    collectionreport.findOne({"msgId":msgId},function (errorfnd,resfind) { 
                        if(errorfnd===null) 
                        { 
                            if(resfind===null) 
                            { 
                                var docinsert={"userId":userId,"msg":msg,"reportedAt":reportedAt,"reportedBy":reportedBy,"msgId":msgId, 
                                    "reportedMsg":reportedMsg,
                                    "response":response} 
                                    collectionreport.insert(docinsert,function (err,dc) { 
                                        if(err===null) 
                                        { 
                                            res.send({"status":"success","msg":"Inserted Successfully"})  
                                        } 
                                            else 
                        { 
                            res.send({"status":"error","msg":"Problem in reporting.Please try again."})
                        }  
                                    })                                         } 
                                    else                                         { 
                                        var docup={"response":response} 
                                        collectionreport.update({"msgId":msgId},{$set:docup},{upsert:false},function (error1,result1) { 
                                            if(err===null) 
                                            { 
                                                res.send({"status":"success","msg":"Updated Successfully"})  
                                            } 
                                            else 
                                                {
                                                     
                                                    res.send({"status":"error","msg":"Problem in respondng.Please try again."})
                                                                                                 }                                               }) 
                                    }                                     }                                     else 
                                        {                                         res.send({"status":"error","msg":"Oops something went wrong."})                                     }  
                    })                             }   
            }) 
        } 
    } 
    ) 
 } ,

    viewreports: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,             BSON = mongo.BSONPure;
        var host = config.development.database.host
        var port = config.development.database.port
        var dbname = config.development.database.db
        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        var api = plivo.RestAPI({   authId: 'MAYJVLZGU4Y2JMODVLNJ',
            authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',         });
        MongoClient.connect(host,function (err, db) {
            if (!err) {console.log("Connected to 'signup' database");
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {  
                        console.log("The otp collection doesn't exist. Creating it with sample data...");  
                    }
                   else {
                       var noDocs=[]
                       var reportscollection=db.collection('reports')
                        var countreports=0
                        var cursorfind=reportscollection.find({"userId":req.query.userid},{"msg":1,"response":1,"_id":1,"reportedMsg":1})
                        cursorfind.each(function (err,item11) {
                            if(err===null)
                            {
                                countreports++
                                if(item11!=null)
                                {
                                    noDocs.push(item11)
                                }
                                else
                                {
                                    if(countreports===1)
                                        res.send({"status":"error","msg":"No reports found."})
                                    else
                                    res.send({"status":"success","data":noDocs})
                                }
                            }
                                else
                            {
                                res.send({"status":"error","msg":"Something went wrong."})
                            }

                        })

                  //
                    } })}})}}
module.exports = report
