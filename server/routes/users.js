var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
/* GET users listing. */

router.get('/:id',userController.getUserController);
router.post('/getUserResources', userController.getUserUploadedResources)

module.exports = router;
