var fs=require('fs')
var xlsjs = require('excel');
xlsjs('/Users/aniketverma/Desktop/Schools/cbse/Lists Final 1 ok.xls',function (err,res)
{
    console.log(err)
    console.log(res.length)
})