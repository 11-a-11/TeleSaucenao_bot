var tools = require("../../tools/tools.js");
var fs = require('fs');

module.exports = function(bot, admin) {
  return function(msg) {
    var chat_id = msg.from.id;
    var reply = msg.message_id;
    var userCount = global.userCount;
    var ids = Object.keys(userCount);
    var text = "";

    if (!tools.existInArray(admin, chat_id)) {
      return;
    }

    if (global.debug) console.log("msg is ", msg, ids);

    fs.writeFile("outfile_saucenaobot_usercount.txt", JSON.stringify(userCount, null, 1), function(err) {
      if (err) {
        if (global.debug) console.log("Error write file @ usercount.js:". err);
      }
        return bot.sendDocument(chat_id, "outfile_saucenaobot_usercount.txt", { reply: reply, parse: "Markdown" });
        // 경로를 ../../log_usercount/outfile.txt로 한 결과, nodemon으로 실행했을 때는 정확하게 경로를 잡았으나,
        //forever로 실행한 경우, 경로를 찾지 못함. forever가 참조하는 상대경로가 달라서인듯.
    });
    
    //for (var i = 0; i < ids.length; i++) {
    //  if (ids[i] === "on") continue;
    //  text = text + userCount[ids[i]]["username"] + "\t[" + ids[i] + "]\t" + userCount[ids[i]]["count"] + "\n";
    //}
    //return bot.sendMessage(chat_id, "USERCOUNT:\n" + text, {reply: reply, parse: "Markdown"});
  };
};

