module.exports = {
  urlDetector: function(text) {
    var urlR = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(urlR);
    var url= text.match(regex);
    if (url) {
      return true;
    }
    return false;
  }
};
