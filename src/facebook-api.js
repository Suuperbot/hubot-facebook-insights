// Description
//   A facebook api script for hubot
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot hello - <what the respond trigger does>
//   orly - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Adriano Godoy <godoy.ccp@gmail.com>

module.exports = function(robot) {
  robot.respond(/hello/, function(res) {
    return res.reply("hello!");
  });
  return robot.hear(/orly/, function() {
    return res.send("yarly");
  });
};
