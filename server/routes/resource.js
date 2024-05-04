const express = require('express');
const resourceController = require('../controllers/resource');
const { uploadResourceMiddleware } = require('../middleware/uploadFile');

const router = express.Router();

router.get('/', resourceController.getAllResources);

router.get('/:id', resourceController.getResource, (req, res) => {
    res.json(res.resource);
});

router.post('/',uploadResourceMiddleware,resourceController.createResource);

router.patch('/:id', resourceController.getResource, resourceController.updateResource);

router.delete('/:id', resourceController.getResource, resourceController.deleteResource);

router.post('/addComment', resourceController.addCommentToResource)

module.exports = router;