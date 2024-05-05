const mongoose = require("mongoose")

const BookmarksSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    bookmarks: {
        type: [String],
        default: [],
    }

})


const Bookmarks = mongoose.model('Bookmarks', BookmarksSchema);

module.exports = Bookmarks;