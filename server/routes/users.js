var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
const bookmarkController = require('../controllers/bookmarks')
/* GET users listing. */

router.get('/:id',userController.getUserController);
router.post('/getUserResources', userController.getUserUploadedResources)
router.post('/getAllBookmarks', bookmarkController.getAllBookmarks)

router.patch('/updateUser', userController.updateUserDetails)

module.exports = router;
