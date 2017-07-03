var tools = require("../../tools/tools.js");

module.exports = function(bot, admin) {
  return function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    var userCount = global.userCount;
    var ids = Object.keys(userCount);
    var text = "";

    if (tools.existInArray(admin, chat_id)) {
      return;
    }

    if (global.debug) console.log("msg is ", msg, ids);

    for (var i = 0; i < ids.length; i++) {
      if (ids[i] === "on") continue;
      text = text + userCount[ids[i]]["username"] + "\t[" + ids[i] + "]\t" + userCount[ids[i]]["count"] + "\n";
    }
    return bot.sendMessage(chat_id, "USERCOUNT:\n" + text, {reply: reply, parse: "Markdown"});
  };
};
