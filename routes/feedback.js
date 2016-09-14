var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var config = require('../config')

  var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';  function encrypt(buffer)
{     return buffer;     //
// var cipher = crypto.createCipher(algorithm,password) 
// var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]); 
// return crypted; }  function decrypt(buffer) {     return buffer     // var decipher = crypto.createDecipher(algorithm,password) 
// var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]); 
// return dec; 
}  var jsonParser = bodyParser.json();
var feedback1 = {
    feedbackm: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,             BSON = mongo.BSONPure;
        var host = config.development.database.host
        var port = config.development.database.port
        var dbname = config.development.database.db
        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        var api = plivo.RestAPI({   authId: 'MAYJVLZGU4Y2JMODVLNJ',
            authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',         });
        db.open(function (err, db) {
                if (!err) {console.log("Connected to 'signup' database");
                    db.collection('otp', {strict: true}, function (err, collection) {
                        if (err) {                              console.log("The otp collection doesn't exist. Creating it with sample data...");                          }

                        else {
                            var collectionfeedback = db.collection('feedbacks')
                            var feedbackedAt = new Date().getTime().toString()
                                userId = req.body.userId
                                feedback = req.body.feedback
                                response = req.body.response
                                rating=req.body.rating
                                appversion=req.body.app



                            var docinsert = {
                                "userId": userId,

                                "feedbackedAt": feedbackedAt,
                                "rating":rating,
                                "appversion":appversion,

                                "feedback": feedback,
                                "response": response
                            }
                            collectionfeedback.insert(docinsert, function (err, dc) {
                                if (err === null) {
                                    res.send({"status": "success", "msg": "Inserted Successfully"})
                                }
                                else {
                                    res.send({"status": "error", "msg": "Problem in feedbacking.Please try again."})
                                }
                            })
                        }



                    })
                }
            }
        )
    } ,

    viewfeedbacks: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,             BSON = mongo.BSONPure;
        var host = config.development.database.host
        var port = config.development.database.port
        var dbname = config.development.database.db
        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
        var api = plivo.RestAPI({   authId: 'MAYJVLZGU4Y2JMODVLNJ',
            authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',         });
        db.open(function (err, db) {
            if (!err) {console.log("Connected to 'signup' database");
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {
                        console.log("The otp collection doesn't exist. Creating it with sample data...");
                    }
                    else {
                        var noDocs=[]
                        var feedbackscollection=db.collection('feedbacks')
                        var countfeedbacks=0
                        var cursorfind=feedbackscollection.find({"userId":req.query.userid})
                        cursorfind.each(function (err,item11) {
                            if(err===null)
                            {
                                countfeedbacks++
                                if(item11!=null)
                                {
                                    noDocs.push(item11)
                                }
                                else
                                {
                                    if(countfeedbacks===1)
                                        res.send({"status":"error","msg":"No feedbacks found."})
                                    else
                                        res.send({"status":"success","data":noDocs})
                                }
                            }
                            else
                            {
                                res.send({"status":"error","msg":"Oops something went wrong."})
                            }

                        })

                        //
                    } })}})}}
module.exports = feedback1
