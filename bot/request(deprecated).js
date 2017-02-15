var axios = require("axios");
var urlbase = require("../settings/settings.js").url;
var MESSAGE = require("../settings/settings.js").msg;

module.exports = function(url, bot, tokenSN, msg) {
  var chat_id = msg.from.id;
  var reply = msg.message_id;

  return axios.get(urlbase.sauceNao, {
    params: {
      db: 999,
      output_type: 2,
      testmode: 1,
      numres: 16,
      url: url,
      api_key: tokenSN
    }
  })
  .then(function(res) {
    console.log("get request to saucenao completed");
    // console.log("result is", res.data);

    // res.data가 string으로 반환되며, 앞에 <!-- 175.196.43 --> 가 붙어서
    // 오는 경우가 있어서 처리
    if (res.data.includes("<!--") && res.data.includes("-->")) {
      res.data = JSON.parse(res.data.slice(res.data.indexOf("-->")+3).trim());
    }


    var result = res.data.results || [];

    //initialize for "for loop"
    var element;
    var header;
    var data;
    var textarray = [];
    var text = "";
    var buttons = [];
    var innerbuttons =[];
    var markup;
    for (var i = 0; i < result.length; i++) {
      element = result[i];
      header = element.header;
      data = element.data;
      text = "";


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
        buttons = [];
        innerbuttons = [];
        if (data.danbooru_id) {
          innerbuttons.push(
            bot.inlineButton("Danbooru Link", {
              url: urlbase.danbooru + data.danbooru_id
            })
          )
        }
        if (data.gelbooru_id) {
          innerbuttons.push(
            bot.inlineButton("Gelbooru Link", {
              url: urlbase.gelbooru + data.gelbooru_id
            })
          )
        }
        if (data.sankaku_id) {
          innerbuttons.push(
            bot.inlineButton("Sankaku Link", {
              url: urlbase.sankaku + data.sankaku_id
            })
          )
        }
        if (data["anime-pictures_id"]) {
          innerbuttons.push(
            bot.inlineButton("Anime-Pictures Link", {
              url: urlbase.animePictures + data["anime-pictures_id"]
            })
          )
        }

        buttons.push(innerbuttons);

      }

      markup = bot.inlineKeyboard(buttons);

      bot.sendMessage(chat_id, text, {reply: reply, markup: markup})
    }
  })
  .catch(function(err) {
    console.log("Error: error in get request to saucenao", err);

  });
}
