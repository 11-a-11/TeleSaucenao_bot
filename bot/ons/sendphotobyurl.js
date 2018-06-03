var tools = require("../../tools/tools.js");

module.exports = function(bot, tokenBot, admin) {
    
    return function(msg) {
        
        var chat_id = msg.from.id;
        var reply = msg.message_id;
        
        if (!tools.existInArray(admin, chat_id)) {
          return;
        }
        
        if (msg.data.indexOf("sendphotobyurl") === 0) {
            if (global.debug) console.log("see inlinebtn @ sendphotobyurl.js:", chat_id);
            
            var q = msg.data.slice(15).split("//");
            var photo = q[0];
            var reply = q[1] || "";
            
            var photoUrl = "https://api.telegram.org/file/bot" + tokenBot + "/" + photo;
            bot.sendPhoto(chat_id, photoUrl, {reply: reply})
            .then(function(result) {
                if (global.debug) console.log("sendphotobyurl result @ sendphotobyurl.js:", result);
            });
            
        }
    }
}