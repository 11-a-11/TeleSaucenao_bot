var urlbase = require("../settings/settings.js").url;
var MESSAGE = require("../settings/settings.js").msg;

var sendMsg = function(results, bot, msg) {
  results = results || [];
  var chat_id = msg.from.id;
  var reply = msg.message_id;
  if (!results.length) {
    // console.log("Processing: nokori 0");
    return;
  } else {
    // console.log("Processing: nokori ", results.length);
  }

  var element = results[0];
  var header = element.header;
  var data = element.data;
  var textarray = [];
  var text = "";
  var buttons = [];
  var innerbuttons = [];
  var innerbuttonsContainer = [];
  var markup;

  if (data.pixiv_id !== undefined) {
    // 픽시브일 경우
    textarray = [
      "Similarity:", header.similarity, "|",
      data.title, "|",
      "by", data.member_name, "|",
      header.thumbnail
    ];
    text = textarray.join(" ");
    buttons = [
      [
        bot.inlineButton("Pixiv Link", {
          url: urlbase.pixiv + data.pixiv_id
        })
      ]
    ];
  } else if (data.danbooru_id || data.gelbooru_id || data.sankaku_id || data["anime-pictures_id"]) {
    // 단부루, 겔부루, 산카쿠
    textarray = [
      "Similarity:", header.similarity, "|",
      "by", data.creator, "|",
      header.thumbnail
    ];
    text = textarray.join(" ");

    if (data.danbooru_id) {
      innerbuttonsContainer.push(
        bot.inlineButton("Danbooru Link", {
          url: urlbase.danbooru + data.danbooru_id
        })
      );
    }
    if (data.gelbooru_id) {
      innerbuttonsContainer.push(
        bot.inlineButton("Gelbooru Link", {
          url: urlbase.gelbooru + data.gelbooru_id
        })
      );
    }
    if (data.sankaku_id) {
      innerbuttonsContainer.push(
        bot.inlineButton("Sankaku Link", {
          url: urlbase.sankaku + data.sankaku_id
        })
      );
    }
    if (data["anime-pictures_id"]) {
      innerbuttonsContainer.push(
        bot.inlineButton("Anime-Pictures Link", {
          url: urlbase.animePictures + data["anime-pictures_id"]
        })
      );
    }

    for (var i = 0; i < innerbuttonsContainer.length; i++) {
      if (innerbuttons.length < 2){
        innerbuttons.push(innerbuttonsContainer[i]);
      } else {
        var target = innerbuttons;
        innerbuttons = [];
        buttons.push(target);
      }
      if (i === innerbuttonsContainer.length - 1) {
        buttons.push(innerbuttons);
      }
    }
  } else {
    textarray = [
      "Similarity:", header.similarity, "|",
      "by", data.creator, "|",
      header.thumbnail
    ];
    text = textarray.join(" ");
  }

  markup = bot.inlineKeyboard(buttons);

  return bot.sendMessage(chat_id, text, {reply: reply, markup: markup})
  .then(function() {
    console.log('inner then');
    return sendMsg(results.slice(1), bot, msg);
  });

};

module.exports = sendMsg;
