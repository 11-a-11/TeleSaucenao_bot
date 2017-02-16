// source: https://github.com/kosmodrey/telebot/
// modified by Frank Kim for compatibility under es6
// and to filter photo flooder as well as text.
/*
  Name: Flooder
  Description: Simple flood protection module.
  Module options: {
    flood: {
      interval: 1, // In seconds
      message: 'Flood message.' // Message
    }
  }
  NOTE: Received Telegram message time accuracy is one second!
*/

// Store users
var userList = {};

// Export bot module
module.exports = function(bot, cfg) {
  // Load config data
  var opt = cfg.flooder || {};
  var interval = Number(opt.interval) || 1;
  var text = opt.message === undefined ?
    'Too many messages from you. Please, try later...' :
      opt.message;

  // Create message modifier
  bot.mod('message', function(data) {

    var msg = data.msg;
    var id = msg.from.id;
    var user = userList[id];
    var now = new Date(msg.date);

    if (user) {
      var diff = now - user.lastTime;
      user.lastTime = now;
      if (diff <= interval) {
        if (!user.flood) {
          if (text) bot.sendMessage(id, text);
          user.flood = true;
        }
        data.msg = {};
        data.photo = undefined;
      } else {
        user.flood = false;
      }
    } else {
      userList[id] = { lastTime: now };
    }

    return data;

  });

};
