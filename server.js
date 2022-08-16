const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const axios = require('axios');
const fs = require('fs');

//DB Config
const db = require('./config/keys').mongoURI;
const bearer = require('./config/keys').bearerToken;
const tweets = require('./routes/api/tweets');
const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
    .connect(db)
    .then (()=>(console.log("MongoDB Connected...")))
    .catch(err => (console.log(err)));

// Routes
app.use('/api/tweets', tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on " + port));

let client = new Twitter({
    consumer_key:'',
    consumer_secret:'',
    bearer_token: bearer
});

let count = 0;

let getTweets = () => {
    client.get('search/tweets', {q: 'fortnite AND -filter:retweets', tweet_mode:'extended', lang:'en'}, function(error, tweets, response) {
        for(let i = 0; i < tweets.statuses.length; i++){
    
            console.log(tweets.statuses[i]['full_text'] + " " + tweets.statuses[i]['retweet_count'] + " " + tweets.statuses[i]['favorite_count']);
            
            if(tweets.statuses[i]['metadata']["iso_language_code"] === 'en'){
                let write_tweet = {
                    "text": tweets.statuses[i]['full_text'],
                    "retweets": tweets.statuses[i]['retweet_count'],
                    "favorites": tweets.statuses[i]['favorite_count']
                }
                fs.writeFileSync("./data/tweets/tweets_".concat(count, ".json"), JSON.stringify(write_tweet));
                fs.writeFileSync("./data/txt_tweets/tweets_".concat(count, ".txt"), JSON.stringify(write_tweet));
                fs.writeFileSync("./data/raw_tweets/raw_tweets_".concat(count, ".json"), JSON.stringify(tweets.statuses[i]));
                count++;
            }
        }
    });
}

let increaseCount = () => {
    console.log(count);
    count++;
}

const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

getTweets();
setInterval(getTweets, 60000);
