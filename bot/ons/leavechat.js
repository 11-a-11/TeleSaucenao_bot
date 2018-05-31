module.exports = function(bot, MESSAGE) {
  return function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    var target_id = msg.text.slice(msg.text.split(" ")[0].length).trim();

    bot.sendMessage(chat_id, "ING: leaveChat@" + target_id, {reply: reply, parse: "Markdown"});

    return bot.leaveChat(target_id)
    .then(function(result) {
      if (global.debug) console.log("success leaveChat for", target_id, "@ leaveChat.js:", result);
      if (result) return bot.sendMessage(chat_id, "DONE: leaveChat@" + target_id + "\n" + JSON.stringify(result, null, 2), {reply: reply, parse: "Markdown"});
    }, function(err) {
      if (err) {
        if (global.debug) console.log("fail leaveChat for", target_id, "@ leaveChat.js:", err);
        return bot.sendMessage(chat_id, "FAIL: leaveChat for" + target_id + "\n" + JSON.stringify(err, null, 2), {reply: reply, parse: "Markdown"});

      }
    });

  };
};
