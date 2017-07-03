var axios = require("axios");
var request = require("../request.js");

var tools = require("../../tools/tools.js");

module.exports = function(bot, MESSAGE, reportToOwner, tokenSN, onExceptions) {
  tokenBot = bot.token;

  return function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;

    if (global.debug) console.log("msg is ", msg);
    if (global.maintenance.on) {
      return bot.sendMessage(chat_id, global.maintenance.msg, {parse: "Markdown"});
    }

    if (tools.existInArray_include(onExceptions, msg.text)) {
      return;
    } else if (msg.text) {
      if (tools.urlDetector(msg.text)) {
        var url = msg.text;
        request(url, bot, tokenSN, msg);
      } else {
        bot.sendMessage(chat_id, MESSAGE.invalidUrl, {reply: reply, parse: "Markdown"});
      }
    } else if (msg.photo && msg.photo.length > 0) {
      bot.getFile(msg.photo[msg.photo.length-1].file_id)
      .then(function(file) {
        if (global.debug) console.log("file is", file);

        reportToOwner.reportFileUrl(file, tokenBot, bot);

        bot.sendMessage(chat_id, MESSAGE.loading, {reply: reply, parse: "Markdown"});

        var url = "https://api.telegram.org/file/bot" + tokenBot + "/" + file.file_path;
        request(url, bot, tokenSN, msg);
      });
    } else {
      bot.sendMessage(chat_id, MESSAGE.invalidForm, {reply: reply, parse: "Markdown"});
    }
  };
};
