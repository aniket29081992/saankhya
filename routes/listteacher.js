var mongo = require('mongodb');
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
var list = {
    listteacher: function (req, res) {
        var Server = mongo.Server,
            Db = mongo.Db,
            BSON = mongo.BSONPure;

        var host = config.development.database.host
        var port = config.development.database.port
        var dbname = config.development.database.db

        var server = new Server(host, port, {auto_reconnect: true});
        db = new Db(dbname, server);
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
                        var countreports=0;
                        var noDocs=[]
                        var dbcollection = db.collection('teacherDetails')
                        var checksubid=req.query.subid
                        teachercursor = dbcollection.find({subIds: { "$in" : [checksubid]} })
                        teachercursor.each(function (err, item11) {
                                if (err === null)
                                {
                                    countreports++
                                    if (item11 != null) {
                                        console.log(item11)
                                        noDocs.push(item11)
                                    }
                                    else {
                                        if(countreports==1)
                                            res.send({"status":"error","msg":"No data"})
                                        else
                                        res.send({"status": "success", "data": noDocs})

                                    }}})}})}})}


}
module.exports=list