const express = require('express');
const router =  express.Router();
let tweet_count = 1;
// Tweet Model
const Tweet = require('../../models/Tweets');

router.post('/', (req, res) => {
    const newTweet = new Tweet({
        _id: req.params.id ,
        text_field: req.params.text,
        retweets: req.params.retweets,
        likes: req.params.favorites
    });

    newTweet.save()
        .then(tweet => res.json(tweet));
});

module.exports = router;

//:id/:text/:retweets/:favorites