const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    text: {
      type: String,
      required: true
    },
    authorName:{
        type:String
    }
    // You might want to include more fields like author, timestamp, etc.
  });

const topicScheme = new Schema({
    title: {
        type: String,
        required: true
      },
      comments: [commentSchema]
})

const Topic = mongoose.model("Topic", topicScheme);

module.exports = Topic;