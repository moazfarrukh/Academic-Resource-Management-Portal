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

  if (req.body.resource) {
    if (req.body.file) {
      file_path = req.body.file.path
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
