// Description
//   A facebook api script for hubot
//
// Configuration:
//   FB_CLIENT_ID
//   FB_CLIENT_SECRET
//
// Commands:
//   fb fans pageNameOrFBid - Get fans count from page/object with name 'pageNameOrFBid'
//
// Author:
//   Adriano Godoy <godoy.ccp@gmail.com>

var FB = require("fb");

module.exports = function(robot) {
  return robot.hear(/fb fans\s+(\w+)/i, function(res) {
    var objectId = res.match[1];

    FB.api("oauth/access_token", {
        client_id: process.env.FB_CLIENT_ID,
        client_secret: process.env.FB_CLIENT_SECRET,
        grant_type: "client_credentials"
      }, function (responseToken) {

        if(!responseToken || responseToken.error) {
          return res.send(!responseToken ? "error occurred" : responseToken.error.message);
        }

        var accessToken = responseToken.access_token;
        var expires = responseToken.expires ? responseToken.expires : 0;

        FB.api(objectId, { fields: ["fan_count"], access_token: accessToken }, function (response) {
          return res.send(response["fan_count"]+" fans");
        });
    });
  });
};
