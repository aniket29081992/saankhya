// Skip to content
// AKIAID424XIJM7YQ4L6A
// hK2jAEWnaW2Eh9xFW1hlx9pOLb2nFIttljFpMyO4
var AWS = require('aws-sdk');
var fs=require('fs')
AWS.config.region = 'ap-south-1';
AWS.config.accessKeyId= 'AKIAID424XIJM7YQ4L6A';
AWS.config.secretAccessKey = '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';
var image= {
    upload: function (key,name) {

        var s3bucket = new AWS.S3({params: {Bucket: 'myimageping'}})

            var fileName = name
            var fileBuffer = fs.readFileSync(fileName);

            var params = {Key: key, Body: fileBuffer, ACL: 'public-read'};
            s3bucket.putObject(params, function (err, data) {
                if (err) {
                    console.log("Error uploading data: ", err);
                } else {

                    console.log(data);
                }
            });


// var Upload = require('s3-uploader');
//
// var client = new Upload('myimageping', {
//     aws: {
//         path: 'images/',
//         region: 'ap-south-1',
//         acl: 'public-read',
//         accessKeyId:'AKIAID424XIJM7YQ4L6A',
//         secretAccessKey:'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'
//
//     },
//
//     cleanup: {
//         versions: true,
//         original: false
//     },
//
//     original: {
//         awsImageAcl: 'private'
//     }
// });
// client.upload('', {}, function(err, versions, meta) {
//     if (err) {
//         throw err; }
//
//     versions.forEach(function(image) {
//         console.log("check")
//         console.log(image.width, image.height, image.url);
//
//         // 1024 760 https://my-bucket.s3.amazonaws.com/path/110ec58a-a0f2-4ac4-8393-c866d813b8d1.jpg
//     });
// });
    }}
module.exports=image
// Contact GitHub API Training Shop Blog Aboutp