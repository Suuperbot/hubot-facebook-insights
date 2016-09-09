// Description
//   A hubot script for some facebook insights
//
// Configuration:
//   FB_CLIENT_ID
//   FB_CLIENT_SECRET
//
// Commands:
//   fb help - Returns a list of commands for this plugin
//   fb fans "Page Name or FB ID" - Get fans count from page/object with name 'pageNameOrFBid'
//   fb checkins "Page Name or FB ID" - Get checkins number from page/object with name 'pageNameOrFBid'
//   fb talking(||talking about) "Page Name or FB ID" - Get talking about count from page/object with name 'pageNameOrFBid'
//   fb posts(||lastest posts) "Page Name or FB ID" limit - Get 'limit' lastest posts from page/object with name 'pageNameOrFBid'. Default value 'limit': 1
//
// Author:
//   Adriano Godoy <godoy.ccp@gmail.com>

var FB = require("fb");

module.exports = function(robot) {

  robot.hear(/fb help/i, function(res)
  {
    var helpTxt = "\nfb help - Returns a list of commands for this plugin\n" +
    "fb fans \"Page Name or FB ID\" - Get fans count from page/object with name 'pageNameOrFBid'\n" +
    "fb checkins \"Page Name or FB ID\" - Get checkins number from page/object with name 'pageNameOrFBid'\n" +
    "fb talking(||talking about) \"Page Name or FB ID\" - Get talking about count from page/object with name 'pageNameOrFBid'\n" +
    "fb posts(||lastest posts) \"Page Name or FB ID\" limit - Get 'limit' lastest posts from page/object with name 'pageNameOrFBid'. Default value 'limit': 1\n";

    return res.send(helpTxt);
  });

  robot.hear(/fb fans?\s+("[\w .\-\[\]]+")/i, function(res) {
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

  robot.hear(/fb checkins?\s+("[\w .\-\[\]]+")/i, function(res) {
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

        FB.api(objectId, { fields: ["checkins"], access_token: accessToken }, function (response) {
          return res.send(response["checkins"]+" checkins");
        });
    });
  });


  robot.hear(/fb (talking|talking about)\s(?!about\s)+("[\w .\-\[\]]+")/i, function(res) {
    var objectId = res.match[2];

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

        FB.api(objectId, { fields: ["about","checkins","talking_about_count","website","fan_count","start_info","new_like_count"], access_token: accessToken }, function (response) {
          return res.send(response["talking_about_count"]+" talking about");
        });
    });
  });


  robot.hear(/fb (posts|latest posts)\s(?!posts\s)+("[\w .\-\[\]]+")\s?(\d+)?/i, function(res) {
    var objectId = res.match[2];
    var limit = res.match[3] || 1;

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

        FB.api(objectId, { fields: ["posts.limit("+limit+")"], access_token: accessToken }, function (response) {
          var result = response.posts.data.map(function(item) {
            return item.created_time+"\n"+item.message;
          }).join("\n-----\n\n");

          return res.send(result);
        });
    });
  });

};
