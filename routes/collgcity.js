var mongo = require('mongodb');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var plivo = require('plivo');

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
var collct = {
    college: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

        var server = new Server('52.66.137.38', 27017, {auto_reconnect: true});
        db = new Db('test', server);
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

                        var college=db.collection("college");
                        var n=college.cid;
                        console.log(n)
                        var newdoc=[];
                        var cursor = db.collection('school').find();
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

        var server = new Server('52.66.137.38', 27017, {auto_reconnect: true});
        db = new Db('test', server);
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
                })}})}}
    module.exports = collct;