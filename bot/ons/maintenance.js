var tools = require("../../tools/tools.js");

module.exports = function(bot, MESSAGE, admin) {
  return function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    var optionText = msg.text.slice(msg.text.split(" ")[0].length).trim();
    var msg2 = "";
    if (tools.existInArray(admin, chat_id)) {
      return;
    }

    if (global.debug) console.log("msg is ", msg);

    if (optionText === "status") {
      return bot.sendMessage(chat_id, "STATUS: switch " + global.maintenance.on + "\nMsg: " + global.maintenance.msg, {parse: "Markdown"});
    }

    global.maintenance.on = !global.maintenance.on;

    if (global.maintenance.on && optionText.length) {
      global.maintenance.msg = optionText;
      msg2 += "\nMsg: " + global.maintenance.msg;
    }
    return bot.sendMessage(chat_id, "DONE: switch " + global.maintenance.on + msg2, {parse: "Markdown"});
  };
};
