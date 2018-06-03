global.debug = true;
global.userCount = {
  on: true
};
global.maintenance = {
  on: false,
  msg: "*<<Notice>>*Sorry for the inconvenience, we are now in the maintenance due to unknown error: We're in trouble shooting. Please wait for the finish. Thank you.\n\n*<<공지>>*현재 문제 해결중이며 빠른 시간 내에 정상화하도록 하겠습니다. 감사합니다."
};

var tokenBot = require("../account/bot.js");
// tokenBot should be the Telegram bot token
var tokenSN = require("../account/saucenao.js");
var admin = require("../account/admin.js");

var TeleBot = require("telebot");

var SETTINGS = require("../settings/settings.js");
var MESSAGE = SETTINGS.msg;
/* moduleSwitch's property indicates whether to turn on/off the module */
var moduleSwitch = SETTINGS.moduleSwitch;
var reportOpt = SETTINGS.report;
/* overwrite reportOpt.receiver_id with your telegram user id(numtype) in array form*/
reportOpt.receiver_id = require("../account/receiverId.js");
var flooderOpt = SETTINGS.flooder;
var reportToOwner = require("./reportToOwner.js");

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
  /* Switch on/off the modules according to preset in moduleSwitch above */
  /* On/off settings of modules are at settings/settings.js */
  var modules = Object.keys(moduleSwitch);
  for (var i = 0; i < modules.length; i ++) {
    if (moduleSwitch[modules[i]]) {
      bot.use(require("../modules/" + modules[i] + ".js"));
    }
  }

  var onExceptions = require("./ons/exceptions.js");
  var maintenance = require("./ons/maintenance.js")(bot, MESSAGE, admin);
  var helpstart = require("./ons/helpstart.js")(bot, MESSAGE);
  var usercount = require("./ons/usercount.js")(bot, admin);
  var leavechat = require("./ons/leavechat.js")(bot, MESSAGE);
  var sendphotobyurl = require("./ons/sendphotobyurl.js")(bot, tokenBot, admin);
  var all = require("./ons/all.js")(bot, MESSAGE, reportToOwner, tokenSN, onExceptions);

  bot.on(["/maintenance"], maintenance);
  bot.on(["/usercount"], usercount);
  bot.on(["/leave"], leavechat);
  bot.on(["/help", "/start"], helpstart);
  bot.on('callbackQuery', sendphotobyurl);
  bot.on(["*"], all);

  bot.connect();
  console.log("bot: connected");
};
