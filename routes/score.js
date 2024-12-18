const router = require("express").Router()
const { savescore, getscore, getleaderboard, getscorehistory } = require("../controllers/score")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getscore", protectplayer, getscore)
    .get("/getleaderboard", protectplayer, getleaderboard)
    .get("/getscorehistory", protectplayer, getscorehistory)
    .post("/savescore", protectplayer, savescore)

module.exports = router;
