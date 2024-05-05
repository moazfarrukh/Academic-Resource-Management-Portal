const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    authorName:{
        type:String
    }
  });

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: String, required: true },
    category: { type: String, required: true },
    file_path: { type: String},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    usersWhoGaveRating: {type:[String]},
    rating_score: {
      type: Number,
      default: 0
  },
    comments:[commentSchema]
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
