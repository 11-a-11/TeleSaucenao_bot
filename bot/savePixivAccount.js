/* Passport Signup Handler */
var model = require("../db/models");

var savePixivAccount = function(user, q, body, res) {
  new model.User({
    chat_id: body.chat_id,
    pixiv_password: body.pixiv_password,
    pixiv_id: body.pixiv_id
  }).save()
  .then(function(user) {
    console.log(user);
    var result = true;

    if (!user) {
      result = false;
    }

    return res.status(200).send({success: result});

  })
  .catch(function(err) {
    console.error("Error: error in saving pixivaccount in db in savePixivAccount.js", err);
    return res.status(200).send({success: false});

  });
};

module.exports = savePixivAccount;
