var tokenBot = require("../account/bot.js");
// tokenBot should be the Telegram bot token
var tokenSN = require("../account/saucenao.js");

var TeleBot = require("telebot");
var axios = require("axios");
var request = require("./request.js");

var tools = require("../tools/tools.js");
var MESSAGE = require("../settings/settings.js").msg;
var bot = new TeleBot(tokenBot);
// console.log("bot obj is ", bot);

module.exports = function() {

  bot.on(["/help", "/start"], function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    console.log("msg is ", msg);

    bot.sendMessage(chat_id, MESSAGE.help, {reply: reply});
  });

  bot.on(["*"], function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    // console.log("msg is ", msg);

    if (msg.text && msg.text !== "/help" && msg.text !== "/start") {
      if (tools.urlDetector(msg.text)) {
        var url = msg.text;
        request(url, bot, tokenBot, msg);
      } else {
        bot.sendMessage(chat_id, MESSAGE.invalidUrl, {reply: reply});
      }
    }
    if (msg.photo) {
      bot.getFile(msg.photo[msg.photo.length-1].file_id)
      .then(function(file) {
        console.log("file is", file);
        bot.sendMessage(chat_id, MESSAGE.loading, {reply: reply});

        var url = "https://api.telegram.org/file/bot" + tokenBot + "/" + file.file_path;
        request(url, bot, tokenBot, msg);
      });

    }
  });

  bot.connect();
  console.log("bot: connected");

};
