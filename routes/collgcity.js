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
var collct = {
    college: function (req, res) {
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
// console.log(config.development.database)
                        var college=db.collection("college");

                        var newdoc=[];
                        var city=req.query.cityid;
                        console.log(city)
                        var cursor = db.collection('school').find({
                            cityId:parseInt(city)
                            }
                        );
                    cursor.each(function (err,item) {
                            if(err===null)
                            {

                                if(item!==null)
                                {

                                    newdoc.push(item)
                                    console.log(newdoc);
                                }
                                else
                                {
                                    res.send({"data":newdoc})
                                }

                                    // res.send({
                                    //     "data": ress
                                    // });

                            }


                        })


                    }
                })}})},
    city: function (req, res) {
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
var time=new Date()
                        // console.log(new Date(new Date().getTime()+new Date().getTimezoneOffset()*60000 ))
                        // console.log(new Date().getTime()+new Date().getTimezoneOffset()*60000)
                        // console.log(time.toLocaleTimeString())
                        var timeee='12:44:16 AM'
                        var newww=0
                        console.log(time.toLocaleTimeString())
                       var n= time.toLocaleTimeString()
                        var startEnd= '12:30:00 PM'
                        var endEnd=  '03:00:00 PM'

                        console.log(typeof encrypt(new Buffer(startEnd, "utf8")))

                        // console.log(startEnd)
                        console.log()
                        console.log(typeof (parseInt(time.getHours())))
                        console.log(time.getMinutes())


                       if(Date.parse(n)<Date.parse(endEnd))
                           console.log("ccc")

                        // var match=10:0
                        var college=db.collection("city");
                        var n=college.cid;
                        console.log(n)
                        var newdoc=[];
                        var cursor = db.collection('city').find();
                        cursor.each(function (err,item) {
                            if(err===null)
                            {

                                if(item!==null)
                                {

                                    newdoc.push(item)
                                    //console.log(newdoc);
                                }
                                else
                                {
                                    res.send({"data":newdoc})
                                }

                                // res.send({
                                //     "data": ress
                                // });

                            }


                        })


                    }
                })}})}}
    module.exports = collct;