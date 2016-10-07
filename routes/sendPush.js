var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');
var config=require('../config')
var cloud = require('../../test')

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'a13I11ET23';

function encrypt(buffer){
    // return buffer;
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
var push = {
    sendpush: function (req, res) {
        Db = mongo.Db,
            BSON = mongo.BSONPure;
        var host = config.development.database.host
        var port = config.development.database.port
        var dbname = config.development.database.db


        MongoClient.connect(host, function (err, db) {

            if (!err) {


                console.log("Connected to 'signup' database");
                db.collection('otp', {strict: true}, function (err, collection) {
                    if (err) {

                        console.log("The otp collection doesn't exist. Creating it with sample data...");

                    }
                    else {
                        var collectionPush = db.collection('pushNotifications')
                        var msg, msgType
                        msg = req.body.msg
                        msgType = req.body.msgType
                        var stuId=req.body.stuIds

                        var collectionStudent=db.collection('digo')
                        var stuIdsobject=[]
                        for(var i=0;i<stuId.length;i++)
                        {
                            var ObjectId = mongo.ObjectId
                            var _id = new ObjectId(stuId[i].toString())
                            stuIdsobject.push(_id)
                        }
                        var findRegtokens=collectionStudent.find({_id:{$in:stuIdsobject}})
                        findRegtokens.each(function (error, item)
                        {
                            if(item!==null)
                            {
                                var docinsert={'msg':msg,'msgType':msgType,'stuId':item._id}
                                collectionPush.insert(docinsert,function (errin,resin) {
                                    if(errin===null)
                                    {
                                        var userS=[]
                                        for (var i = 0; i < item.regTokens.length; i++)
                                            userS.push(item.regTokens[i])
                                        cloud.send(userS,msg,4,0)

                                    }

                                })
                            }

                        })



                    }
                })
            }
        })
    }}
    module.exports=push