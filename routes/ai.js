const router = require("express").Router()
const { getrecommendation } = require("../controllers/ai")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getrecommendation", protectplayer, getrecommendation)

module.exports = router;
