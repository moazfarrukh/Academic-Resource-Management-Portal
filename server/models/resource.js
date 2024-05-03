const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: String, required: true },
    category: { type: String, required: true },
    file_path: { type: String},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
