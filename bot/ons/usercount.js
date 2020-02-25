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
        // ��θ� ../../log_usercount/outfile.txt�� �� ���, nodemon���� �������� ���� ��Ȯ�ϰ� ��θ� �������,
        //forever�� ������ ���, ��θ� ã�� ����. forever�� �����ϴ� ����ΰ� �޶��ε�.
    });
    
    //for (var i = 0; i < ids.length; i++) {
    //  if (ids[i] === "on") continue;
    //  text = text + userCount[ids[i]]["username"] + "\t[" + ids[i] + "]\t" + userCount[ids[i]]["count"] + "\n";
    //}
    //return bot.sendMessage(chat_id, "USERCOUNT:\n" + text, {reply: reply, parse: "Markdown"});
  };
};

