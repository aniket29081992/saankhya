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

                        // var emailEncrypted2 = encrypt(new Buffer(d, "utf8")).toString('utf-8')


                        var collection=db.collection('signup')
                       var stuId= '57ea06fa9b9aea60497b44d2'
                        var ObjectId=mongo.ObjectId
                        var _id = new ObjectId(stuId)

                        collection.findOne({userId:_id},function (error,result)
                        {
                            // console.log(result)
                            console.log(decrypt(result.emaildecrypt.buffer).toString('utf-8'))
                            console.log(decrypt(result.phonedecrypt.buffer).toString('utf-8'))
                        })

                        // var nn = encrypt(new Buffer('aa', "utf8"));
                       //
                    }
                })
            }
        })
