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
                        var d='ANKI1099'
                        var emailEncrypted2 = encrypt(new Buffer(d, "utf8")).toString('utf-8')
                        console.log(emailEncrypted2)

                       //  var collection=db.collection('signup')
                       // var stuId= '57ea06fa9b9aea60497b44d2'
                       //  var ObjectId=mongo.ObjectId
                       //  var _id = new ObjectId(stuId)
                       //  // var nn = encrypt(new Buffer('aa', "utf8"));
                       //
                       //  // console.log(decrypt(nn).toString('utf-8'))
                       //  collection.findOne({'userId':_id},function (err,res) {
                       //      // console.log(res.phonedecrypt.toString())
                       //      var nn = encrypt(new Buffer('cc', "utf8"));
                       //
                       //      console.log(res.phone)
                       //      var x=decrypt(res.phone).toString('utf-8')
                       //      console.log(x)
                       //
                       //
                       //
                       //
                       //
                       //  })

                        // var collection=db.collection('sendmessagepass')
                        // var stringd=['57e97fea7ba7c35800186723','57e97fea7ba7c35800186723']
                        // var ObjectId=mongo.ObjectId
                        // var _id=[]
                        //
                        //   var d=  new ObjectId(stringd)
                        //     console.log(d)
                        //
                        // console.log(_id)




                        // var cursor=collection.find({})
                        // cursor.each(function (err, item) {

                            // if(item!=null){
                                // var subStringname = item.firstName.substr(0, 4).toUpperCase();
                                // var number = Math.floor(Math.random() * 1000) + 100
                                // var uniqueCode = subStringname + number
                                var doc={}

                                var api1 = plivo.RestAPI({
                                    authId: 'MAYJVLZGU4Y2JMODVLNJ',
                                    authToken: 'ODEyZjFiZTE1ZGExMDJiOWFiNDgyNGIzZGEzN2Zj',
                                });
                                var newmsg="Hi Ankit the issue has been resolved.You can login to the new Pinglearn app using only your mobile number and this Password ANKI1099."
                                // var m="Hello, "+item.firstName+"! The pinglearn app has been Upgraded to a newer and awesome version. Update the app by clicking here bit.ly/pinglearn. Use your registered phone number and "+item.uniqueCode+ " as the password to log in, cheers and keep pinging!"
                                api1.send_message(
                                    {
                                    'src': '+16314462144',
                                    'dst': "+91882d7068454",
                                    'text': newmsg,
                                    'url': "https://api.plivo.com/v1/Account/" + 'MAYJVLZGU4Y2JMODVLNJ' + "/Message/", // The URL to which with the status of the message is sent
                                    'method': "POST"
                                     }, function (status, response) {
                                    console.log(response)
                                    }
                                )
                               // console.log(item._id.toString())
                                // doc['grade']=item.grade
                                // doc['school']=item.school

{
    // console.log(item.uniqueCode)

}
                                   // }

                        // })


                    }
                })
            }
        })
