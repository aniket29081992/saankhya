var mongo = require('mongodb');
var MongoClient=mongo.MongoClient
var crypto = require('crypto');
var bodyParser = require('body-parser');
var config=require('../config')
var plivo = require('plivo');
var AWS= require('aws-sdk');

var fs = require('fs');

var S3FS = require('s3fs');

var s3fsImpl = new S3FS('bbqmobileimages/images/banners',{
    accessKeyId:'AKIAID424XIJM7YQ4L6A',
    secretAccessKey:'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'
});
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
var ch =
{
    check111: function (req, res)
    {
        var file = req.files;
        console.log("file",JSON.stringify(file))
        console.log("original name:- "+file.fileUpload.originalFilename);
        console.log("Path:- ",file.fileUpload.path);
        var stream = fs.createReadStream(file.fileUpload.path);
        return s3fsImpl.writeFile(file.fileUpload.originalFilename, stream, {"ContentType":"image/jpg"}).then(function(){
            fs.unlink(file.fileUpload.path, function(err){
                console.error(err);
            })
            console.log("Sucessfully uploaded to Amazon S3 server");
            });
    }
}
    module.exports=ch