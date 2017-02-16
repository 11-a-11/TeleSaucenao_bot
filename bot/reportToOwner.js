var receiver_id = require("../account/receiverId.js");
var reportToOwnerSwitch = require("../settings/settings.js").reportToOwnerSwitch;

module.exports = {
  reportLimitsOfSaucenao: function(header, bot) {
    if (!reportToOwnerSwitch.reportLimitsOfSaucenao) {
      return;
    }

    var longLimit = header.long_limit.toString();
    var shortLimit = header.short_limit.toString();
    var longRemaining = header.long_remaining.toString();
    var shortRemaining = header.short_remaining.toString();

    var textArray = [
      "⏰ <b>Saucenao Req Limitation: (Remain/Limit)</b>\n",
      "<b>Short(30s):</b>", shortRemaining, "/", shortLimit + "\n",
      "<b>Long(24h):</b>", longRemaining, "/", longLimit
    ];

    var text = textArray.join(" ");
    bot.sendMessage(receiver_id[0], text, {parse: "html"});
  },
  reportRequestError: function(errorObj, bot) {
    if (!reportToOwnerSwitch.reportRequestError) {
      return;
    }

    errorObj = errorObj || {};
    var response = errorObj.response || {};
    var params = errorObj.config.params;

    var textArray = [
      "⚠ *Error:*" + "\n",
      "*Type:*", "Request error" + "\n",
      "*Params:*", JSON.stringify(params) || "", "\n",
      "*Response.status:*", response.status, "|", response.statustext, "\n",
      "*Response.data:*", JSON.stringify(response.data) || ""
    ];

    var text = textArray.join(" ");
    for (var i = 0; i < receiver_id.length; i++) {

      bot.sendMessage(receiver_id[i], text, {parse: "Markdown"});
    }
  }
};
