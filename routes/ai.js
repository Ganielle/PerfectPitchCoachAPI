const router = require("express").Router()
const { getrecommendation, preassessment, getfinalassessment } = require("../controllers/ai")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getrecommendation", protectplayer, getrecommendation)
    .get("/preassessment", protectplayer, preassessment)
    .get("/getfinalassessment", protectplayer, getfinalassessment)

module.exports = router;
