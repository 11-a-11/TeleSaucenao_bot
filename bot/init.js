var tokenBot = require("../account/bot.js");
// tokenBot should be the Telegram bot token
var tokenSN = require("../account/saucenao.js");

var TeleBot = require("telebot");
var axios = require("axios");
var request = require("./request.js");

var tools = require("../tools/tools.js");

var SETTINGS = require("../settings/settings.js");
var MESSAGE = SETTINGS.msg;
var reportOpt = SETTINGS.report;
/* overwrite reportOpt.receiver_id with your telegram user id(numtype) in array form*/
reportOpt.receiver_id = require("../account/receiverId.js");
var flooderOpt = SETTINGS.flooder;

var bot = new TeleBot({
  token: tokenBot,
  modules: {
    flooder: {
      interval: flooderOpt.interval,
      message: flooderOpt.msg
    },
    report: {
      events: reportOpt.condition,
      to: reportOpt.receiver_id
    }
  }
});
// console.log("bot obj is ", bot);

module.exports = function() {
  bot.use(require("../modules/report.js"));
  bot.use(require("../modules/flooder.js"));

  bot.on(["/help", "/start"], function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    console.log("msg is ", msg);

    bot.sendMessage(chat_id, MESSAGE.help, {reply: reply});
  });

  bot.on(["*"], function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    console.log("msg is ", msg);

    if (msg.text && msg.text !== "/help" && msg.text !== "/start") {
      if (tools.urlDetector(msg.text)) {
        var url = msg.text;
        request(url, bot, tokenBot, msg);
      } else {
        bot.sendMessage(chat_id, MESSAGE.invalidUrl, {reply: reply});
      }
    } else if (msg.photo) {
      bot.getFile(msg.photo[msg.photo.length-1].file_id)
      .then(function(file) {
        console.log("file is", file);
        bot.sendMessage(chat_id, MESSAGE.loading, {reply: reply});

        var url = "https://api.telegram.org/file/bot" + tokenBot + "/" + file.file_path;
        request(url, bot, tokenBot, msg);
      });
    } else {
      bot.sendMessage(chat_id, MESSAGE.invalidForm, {reply: reply});
    }
  });

  bot.connect();
  console.log("bot: connected");

};
