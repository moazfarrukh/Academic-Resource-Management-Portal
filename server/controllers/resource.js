const Resource = require('../models/resource')

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
    res.json(resources)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getResource = async (req, res, next) => {
  let resource
  try {
    resource = await Resource.findById(req.params.id)
    if (resource == null) {
      return res.status(404).json({ message: 'Resource not found' })
    }
    res.status(200).json(resource)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.resource = resource
  next()
}

exports.createResource = async (req, res) => {
  let file_path = null
  let media = null
  let user_id = null
  console.log(req.body)
  if (req.body.resource) {
    if (req.body.file) {
      file_path = "uploads/" + req.body.file.filename
      if (req.body.file.mimetype.startsWith('image/')) {
        media = 'image'
      } else if (req.body.file.mimetype.startsWith('video/')) {
        media = 'video'
      } else if (req.body.file.mimetype.startsWith('audio/')) {
        media = 'audio'
      } else {
        media = 'document'
      }
      if (req.body.resource.user_id) {
        user_id = req.body.resource.user_id
      }
    }
    const resource = new Resource({
      title: req.body.resource.title,
      description: req.body.resource.description,
      media: media,
      category: req.body.resource.category,
      file_path: file_path,
      user_id: user_id,
    })

    try {
      const newResource = await resource.save()
      res.status(201).json(newResource)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: 'Resource is required' })
  }
}

exports.updateResource = async (req, res) => {
  if (req.body.title != null) {
    res.resource.title = req.body.title
  }
  if (req.body.description != null) {
    res.resource.description = req.body.description
  }
  if (req.body.media != null) {
    res.resource.media = req.body.media
  }
  if (req.body.category != null) {
    res.resource.category = req.body.category
  }
  if (req.body.file != null) {
    res.resource.file = req.body.file
    uploadResult = await handleSingleUploadFile(req, res)
    res.resource.file_path = uploadResult.filename
  }

  try {
    const updatedResource = await res.resource.save()
    res.json(updatedResource)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteResource = async (req, res) => {
  try {
    await res.resource.remove()
    res.json({ message: 'Resource deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.addCommentToResource = async(req, res)=>{
  const {id, commentTitle, author} = req.body;
    try {
        const topic = await Resource.findById(id);
        if (!topic) {
            return res.status(404).send({ error: 'Resource not found' });
          }

        topic.comments.push({ text: commentTitle, authorName:author });
        const updatedTopic = await topic.save();
        res.status(200).send(updatedTopic);
        
    } catch (error) {
        console.log(error)
    }
}


exports.addResourceRating = async(req, res)=>{
  const { userID, resourceID, rating } = req.body;
  console.log("-> ",rating)
  try {
    const resource = await Resource.findById(resourceID);
    if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found.' });
    }

    if (resource.usersWhoGaveRating.includes(userID.toString())) {
        return res.status(400).json({ success: false, message: 'You have already rated this resource.' });
    }

    resource.usersWhoGaveRating.push(userID.toString());

    const totalUsers = resource.usersWhoGaveRating.length;
    const previousRatingScore = resource.rating_score * (totalUsers - 1);
    const newRatingScore = (previousRatingScore + rating) / totalUsers;
    resource.rating_score = newRatingScore;

    await resource.save();
    console.log(resource)
    res.status(200).json(resource);
  } catch (error) {
      console.error('Error submitting rating:', error);
      res.status(500).json({ success: false, message: 'Failed to submit rating.' });
  }
}
