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
                        var collection=db.collection('interaction')
                        var cursor=collection.find()
                        cursor.each(function (err, item) {
                            var collection1=db.collection('mycollection')
                            if(item!=null){
                                // var subStringname = item.firstName.substr(0, 4).toUpperCase();
                                // var number = Math.floor(Math.random() * 1000) + 100
                                // var uniqueCode = subStringname + number
                                var doc={}
                                // doc['grade']=item.grade
                                // doc['school']=item.school
                                doc['userId']=item._id


                         collection1.update({"phone":item.phone},{$set:doc},function(err,res){console.log(res)})}

                        })


                    }
                })
            }
        })
