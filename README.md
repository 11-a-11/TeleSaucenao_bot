# TeleSaucenao_bot
Search the origin of image through Telegram bot using SauceNao api(by Xamayon, https://saucenao.com).

# Preparation
1. Install node modules in package.json.
2. Get your own tokens from telegram bot and SauceNao(by Xamayon).
3. Make a directory "account" in the same depth with server.js and make 2 files "bot.js", and "saucenao.js" which contain each of tokens. Each file should be "module.exports = YOURTOKEN".


# How to start
## Settings
- settings/settings.js
  - You can set below
  - 1. Messages for each stage of process which will be printed at the chat room.
  - 2. SauceNao api parameters. Please refer documents at SauceNao webpage.
  - 3. Prefix for each homepages. This will added to the id-s obtained from response of SauceNao Api.

## Run server.js
- This will connect to the telegram server and let your own telegram bot work along the code.

## /start && /help

- In the chat room, you can access help desk with "/start" and "/help" command.

## Search
- Send a photo and you will get 7(default setting) candidates of the origin.
- You can also do that with image url.

## Tools
- tools/tools.js
  - regex for detecting url among text.
  
## structure
- CASE1. Send photo.
  - The photo will be sent to the telegram server and your bot will get the url of the photo from telegram server. Then bot will send request to SauceNao with the url. Finally, the results gotten from Saucenao will be printed as the message to the chat room.
- CASE2. Send image url.
  - Same as CASE1 except sending photo to the telegram server to get the url of it.

## Aware
- SauceNao api has limitations on search frequency per day. Consider pay for upgrade your account at SauceNao.

## No ES6
-This codes do not have any ES6.
