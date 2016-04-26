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
      }, function (resFB) {
        if(!resFB || resFB.error) {
            return res.send(!resFB ? "error occurred" : resFB.error);
        }

        var accessToken = resFB.access_token;
        var expires = resFB.expires ? resFB.expires : 0;

        FB.api(objectId, { fields: ["fan_count"], access_token: accessToken }, function (res) {
            return res.send(res["fan_count"]+" fans");
        });
    });
  });
};
