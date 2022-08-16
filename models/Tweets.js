const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    _id:{
        type:Number,
        default: 0,
        require: true
    },
    text_field:{
        type:String,
        require: true
    },
    retweets:{
        type:Number,
        require: true
    },
    likes:{
        type: Number,
        require: true
    }
});

module.exports = Tweet = mongoose.model('tweet', TweetSchema, 'Tweet');