module.exports = {
  url: {
    sauceNao: "https://saucenao.com/search.php",
    sauceNaoParams: {
      db: 999,
      output_type: 2,
      testmode: 1,
      numres: 7
    },
    pixiv: "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=",
    danbooru: "https://danbooru.donmai.us/post/show/",
    gelbooru: "https://gelbooru.com/index.php?page=post&s=view&id=",
    sankaku: "https://chan.sankakucomplex.com/post/show/",
    animePictures: "https://anime-pictures.net/pictures/view_post/"
  },
  msg: {
    invalidUrl: "<<Error>>\nInvalid url. Please check your url.",
    loading: "<<Loading>>\nImage is now in processing...",
    zeroResult: "<<Result>>\nNo results.",
    startResult: "<<Result>>\nPrint start.",
    endResult: "<<Result>>\nPrint End.",
    help: "<<help>>\nSend me an image which you want to search or a url to the image.\n\n1. Send me a photo.\n    OR\n2. Send me a url of the image."
  }
};
