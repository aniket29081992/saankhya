var AWS= require('aws-sdk');
var router= require('./routes/index');
var fs = require('fs');

var S3FS = require('s3fs');

var s3fsImpl = new S3FS('bbqmobileimages/images/banners',{
    accessKeyId:'AKIAID424XIJM7YQ4L6A',
    secretAccessKey:'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'
});

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

router.use(multipartyMiddleware);

router.post('/api/v1/backoffice/upload/image',function(req,res){

    console.log(JSON.stringify(req.files));

});