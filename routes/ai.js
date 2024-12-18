const router = require("express").Router()
const { getrecommendation, preassessment } = require("../controllers/ai")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getrecommendation", protectplayer, getrecommendation)
    .get("/preassessment", protectplayer, preassessment)

module.exports = router;
