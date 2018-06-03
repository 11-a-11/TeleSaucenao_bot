var tools = require("../../tools/tools.js");

module.exports = function(bot, tokenBot, admin) {
    
    return function(msg) {
        
        var chat_id = msg.from.id;
        var reply = msg.message_id;
        
        if (!tools.existInArray(admin, chat_id)) {
          return;
        }
        
        if (msg.data.indexOf("sendphotobyurl") === 0) {
            if (global.debug) console.log("next inlinebtn @ sendphotobyurl.js:", chat_id);
            
            var photo = msg.data.slice(15);
            
            var photoUrl = "https://api.telegram.org/file/bot" + tokenBot + "/" + photo.file_path
            bot.sendPhoto(chat_id, photoUrl, {reply: reply});
            
        }
    }
}