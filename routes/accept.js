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
var accept = {
    checkandaccept: function (req, res) {
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
                        var message = db.collection("message");
                        var interactionId=req.body.interId
                        var doc={"intId":interactionId,"iStatus":"active"}
                        message.findOne(doc,function (error,result) {
                            if(error===null)
                            {
                                if(result!=null)
                                {
                                    var doc={"status":"error","msg":"Already accepted"}
                                    res.send(doc)
                                }
                                else
                                {
                                    var teachId=req.body.teachId
                                    message.updateMany({"intId":interactionId,"iStatus":"unassigned"},{ $set:{"teachId":teachId,"iStatus":"active"}},function (errr,resss) {
                                        if(errr!==null)
                                        {
                                            res.send({"status":"error"})

                                        }
                                        var teachDb=db.collection("teacherDetails");
                                        teachDb.update({"teachId":teachId,"availStatus":"active"},{ $set:{"teachId":teachId,"availStatus":"inactive"}},function (error1,result1) {
                                            if(error1===null)
                                            {
                                                console.log(result1)
                                            }


                                        })

                                    })

                                    console.log()

                                }

                            }

                        })








                    }})}})}}
                    module.exports=accept