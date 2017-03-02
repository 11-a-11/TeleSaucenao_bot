var settings = {
  url: {
    sauceNao: "https://saucenao.com/search.php",
    sauceNaoParams: {
      db: 999,
      output_type: 2,
      testmode: 1,
      numres: 7
    },
    pixiv_id: "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=",
    danbooru_id: "https://danbooru.donmai.us/post/show/",
    gelbooru_id: "https://gelbooru.com/index.php?page=post&s=view&id=",
    sankaku_id: "https://chan.sankakucomplex.com/post/show/",
    "anime-pictures_id": "https://anime-pictures.net/pictures/view_post/",
    imdb_id: "https://www.imdb.com/title/"
  },
  id_buttonName: {
    pixiv_id: "Pixiv Link",
    danbooru_id: "Danbooru Link",
    gelbooru_id: "Gelbooru Link",
    sankaku_id: "Sankaku Link",
    "anime-pictures_id": "Anime-Pictures Link",
    imdb_id: "IMDb Link"
  },
  msg: {
    invalidUrl: "*<<Error>>*\nInvalid url. Please check your url.",
    invalidForm: "*<<Error>>*\nInvalid form. Please check if you sent a non-photo file or your photo is sent as file.",
    loading: "*<<Loading>>*\nImage is now in processing...",
    zeroResult: "*<<Result>>*\nNo results.",
    startResult: "*<<Result>>*\nPrint start.",
    endResult: "*<<Result>>*\nPrint End.",
    help: "*<<help>>*\nSend me an image which you want to search or a url to the image.\n\n1. Send me a photo.\n    OR\n2. Send me a url of the image.",
    tooManyRequests: "*<<Error>>*\nToo many requests. Please send one by one and take a time between requests.",
    reachLimitation: "*<<Error>>*\nThe request limitation has been reached. Please wait for a moment and if the same error occurs, contact us.",
    unknownError: "*<<Error>>*\nUnknown error occured. Please contact us if the same error appears repeatedly.",
    requestRating: "*★★Did you satisfied with the result?*\nIf so, please give us _5 stars_!\nIt takes only few seconds and will help us a lot to give you more developed services!\n\n" + "[☞Rate telesaucenaoBot(click)](https://telegram.me/storebot?start=telesaucenao_bot)" + "\n\nIf you already rated, please ignore the message! Thank you so much:)"
  },
  moduleSwitch: {
    report: {on: true, notify: false},
    flooder: {on: true, notify: true}
  },
  report: {
    condition: [
      "*", "reconnect", "reconnected", "disconneced", "error"
    ],
    receiver_id: "YOU_SHOULD_OVERWRITE_WITH_YOUR_OWN_TELEGRAM_ID(NUM_TYPE)"
  },
  flooder: {
    msg: "DO NOT EDIT IN THIS PROPERTY. GOTO settings.msg.tooManyRequests",
    interval: 2
  },
  reportToOwnerSwitch: {
    reportLimitsOfSaucenao: {on: true, notify: false},
    reportRequestError: {on: true, notify: true},
    reportFileUrl: {on: true, notify: false}
  }
};

settings.flooder.msg = settings.msg.tooManyRequests;
module.exports = settings;
