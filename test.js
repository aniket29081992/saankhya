var FCM = require('fcm-node');
// var serverKey = 'AIzaSyBqv0cIOyCdnPsVUN6O5PTcHvLmeq5vOWg';
var serverKey= 'AIzaSyCZT_dv27Q2-QMOqVg0agHf_dXVwOWrr6A';
var fcm = new FCM(serverKey);
// Create a message
// ... with default values
//
var cloud= {
    send: function (registrationTokens,msg,check,who) {


// ... or some given values
// var registrationTokens=[]
// registrationTokens.push('cUUp7RHne6o:APA91bHn-yVY8BrwEJ0H89hrt745Qe-xfGQCEIYZLvkZEPQq0HfVtpB_Y2HVl1pMEDBdMV8suJOQXn8OwbayJTvWJAe8Qu-nb4UrMHbdBpa4bKJS3plx6vhJRXb8SOCaAPn7g2XTUGb3')

// cloud.send(userS)




            var message = {
                "registration_ids":  registrationTokens,

                data: {
                    Key1: check,
                    Key2:msg
                }
            }

// Change the message data
// ... as key-value
// message.addData('key1','message1');
// message.addData('key2','message2');
//
// // ... or as a data object (overwrites previous data object)
// message.addData({
//     key1: 'message1',
//     key2: 'message2'
// });

// Set up the sender with you API key
// var sender = new gcm.Sender('AIzaSyCRVHWU8VdP21QUbd3KsmYPgZSsc204_L4');AIzaSyCRVHWU8VdP21QUbd3KsmYPgZSsc204_L4

// Add the registration tokens of the devices you want to send to


// Send the message
// ... trying only once
// sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
//     if(err) console.error(err);
//     else    console.log(response);
// });

        var serverKey;
        //0 is for teacher
        //1 is for  student
        //rest anything is for admin

        if(who===0)
            serverKey = 'AIzaSyCZT_dv27Q2-QMOqVg0agHf_dXVwOWrr6A'
        else
            if(who===1)
            serverKey =   'AIzaSyCtcsrfSHOqWdNUk_F7gygejPAJmyAKLOI'
        else
            if(who===3)
          serverKey='AIzaSyANRnr9drptTlJCV-DPHddLvCGcTz1r124'
        var fcm = new FCM(serverKey);

// ... or retrying
            fcm.send(message, function (err, response) {
                if (err) console.error(err);
                // else
                //     console.log(response);
            });

// ... or retrying a specific number of times (10)
// sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
//     if(err) console.error(err);
//     else    console.log(response);
// });

}}
module.exports=cloud