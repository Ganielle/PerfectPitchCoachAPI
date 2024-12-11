const router = require("express").Router()
const { savescore, getscore, getleaderboard } = require("../controllers/score")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getscore", protectplayer, getscore)
    .get("/getleaderboard", protectplayer, getleaderboard)
    .post("/savescore", protectplayer, savescore)

module.exports = router;
