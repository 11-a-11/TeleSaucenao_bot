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
    invalidForm: "*<<Error>>*\nInvalid form. Please check if you sent a non-photo file or your photo is sent as file.\n혹시 사진을 파일로 보내지 않으셨나요? 사진보내기로 하셨는지 확인해주세요\nイメージ以外はしょりできませんから。",
    loading: "*<<Loading>>*\nImage is now in processing...\n이미지 처리중입니다.\nイメージ処理中…",
    zeroResult: "*<<Result>>*\nNo results.\n결과가 없습니다.\n検索結果がありませんわ。",
    startResult: "*<<Result>>*\nPrint start.\n결과출력을 시작합니다.\n結果を出歴するから。",
    endResult: "*<<Result>>*\nPrint End.\n출력이 종료되었습니다.\n出歴終了！",
    help: "*<<help>>*\nSend me an image which you want to search or a url to the image.\n1. Send me a photo.\n    OR\n2. Send me a url of the image.\n\n검색하고 싶은 이미지 혹은 이미지의 주소를 보내주세요\n1. 이미지를 보내주세요\n    OR\n2. 이미지의 url을 보내주세요.\n\n" ＋ "検索したいイメージ及びイメージのurlを送ってください。\n1. イメージを転送する。\n2. イメージのurlを転送する。",
    tooManyRequests: "*<<Error>>*\nToo many requests. Please send one by one and take a time between requests.\n너무 많은 요청을 보내셨네요. 한번에 한 장씩 보내주세요.\n一回にあんなに多い処理はできないわ。一回に一枚づつ、ね？",
    reachLimitation: "*<<Error>>*\nThe request limitation has been reached. Please wait for a moment and if the same error occurs, contact us.\n일일 요청한도를 초과하였습니다. 잠시 기다려주시고, 동일한 오류가 발생하면 연락주세요.\n一日要請限度を超えました。しばらくお待ちください。",
    unknownError: "*<<Error>>*\nUnknown error occured. Please contact us if the same error appears repeatedly.\n알 수없는 오류가 발생하였습니다. 동일한 오류가 지속적으로 발생할 경우 연락주세요.\n何らかのエラーで処理できません。連絡お願いします。",
    requestRating: "*★★Did you satisfied with the result?*\nIf so, please give us _5 stars_!\nIt takes only few seconds and will help us a lot to give you more developed services!\n" + "[☞Rate telesaucenaoBot(click)](https://telegram.me/storebot?start=telesaucenao_bot)" + "\nIf you already rated, please ignore the message! Thank you so much:)\n\n" + "★★서비스에 만족하셨나요? 만족하셨다면 별 5개 부탁드립니다! 아래 url을 통해 바로 점수를 주실 수 있으며, 지속적인 서비스 개선에 큰 도움을 주실 수 있습니다.\n" + "[☞별점주기](https://telegram.me/storebot?start=telesaucenao_bot)" + "\n이미 별점을 주셨다면 정말 감사합니다! 이 메시지는 무시해주세요:)\n\n" + "サービスにご満足しましたか？下のurlでレーティングできます。よろしくお願いします。\n" + "[☞click](https://telegram.me/storebot?start=telesaucenao_bot)"
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
