module.exports = function(bot, MESSAGE) {
  return function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    if (global.debug) console.log("msg is ", msg);

    bot.sendMessage(chat_id, MESSAGE.help, {reply: reply, parse: "Markdown"});
  };
};
