import 'twitterFetcher';

var options = {
    "id": '387029811605929984',
    "domId": 'latestTweet',
    "maxTweets": 3,
    "enableLinks": true,
    "showUser": true,
    "showTime": true,
    "lang": 'en'
};
twitterFetcher.fetch(options);
