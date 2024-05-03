const express = require('express');
const router = express.Router();

const ptpController = require("../controllers/ptp")


router.post("/addNewTopic", ptpController.createTopic)
router.post("/addCommentToTopic", ptpController.addCommentToTopic)
router.get("/getAllTopics", ptpController.getTopics)

module.exports = router;