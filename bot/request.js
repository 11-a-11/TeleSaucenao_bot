var axios = require("axios");
var urlbase = require("../settings/settings.js").url;
var MESSAGE = require("../settings/settings.js").msg;
var sendMsg = require("./sendMsg.js");

module.exports = function(url, bot, tokenSN, msg) {
  var chat_id = msg.from.id;
  var reply = msg.message_id;
  var params = urlbase.sauceNaoParams;
  params.url = url;
  params.api_key = tokenSN;

  return axios.get(urlbase.sauceNao, {
    params: params
  })
  .then(function(res) {
    console.log("get request to saucenao completed");
    // console.log("result is", res.data);

    // res.data가 string으로 반환되며, 앞에 <!-- 175.196.43 --> 가 붙어서
    // 오는 경우가 있어서 처리
    if (res.data.includes("<!--") && res.data.includes("-->")) {
      res.data = JSON.parse(res.data.slice(res.data.indexOf("-->")+3).trim());
    }

    var results = res.data.results || [];

    if (results.length < 1) {
      return bot.sendMessage(chat_id, MESSAGE.zeroResult, {reply: reply});
    }

    bot.sendMessage(chat_id, MESSAGE.startResult, {reply: reply})
    .then(function() {
      return sendMsg(results, bot, msg);
    });
  })
  .catch(function(err) {
    console.log("Error: error in get request to saucenao", err);

  });
};
