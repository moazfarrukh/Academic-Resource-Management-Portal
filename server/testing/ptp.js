const Topic = require('../models/peertopeer')

exports.createTopic = async (req, res)=>{
    const {title} = req.body
    try {
        const newTopic = new Topic({
          title: title,
          comments: []
        });
    
        const savedTopic = await newTopic.save();
        res.status(200).json({ message: 'Topic saved successfully', topic:savedTopic });
      } catch (error) {
        console.error('Error creating topic:', error);
        throw error;
      }
} 

exports.addCommentToTopic = async (req, res)=>{
    const {id, commentTitle, author} = req.body;
    try {
        const topic = await Topic.findById(id);
        if (!topic) {
            return res.status(404).send({ error: 'Topic not found' });
          }

        topic.comments.push({ text: commentTitle, authorName:author });
        const updatedTopic = await topic.save();
        res.status(200).send(updatedTopic);
        
    } catch (error) {
        console.log(error)
    }
}

exports.getTopics = async(req, res)=>{
    try {
        const topics = await Topic.find();
        res.status(200).send(topics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).send({ error: 'Internal server error' });
      }
}
