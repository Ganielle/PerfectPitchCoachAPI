const router = require("express").Router()
const { savescore, getscore, getleaderboard, getscorehistory } = require("../controllers/score")
const { savescoreuploadedsongs, getuploadedscorehistory, getuploadedscore } = require("../controllers/songs") 
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getscore", protectplayer, getscore)
    .get("/getuploadedscore", protectplayer, getuploadedscore)
    .get("/getleaderboard", protectplayer, getleaderboard)
    .get("/getscorehistory", protectplayer, getscorehistory)
    .get("/getuploadedscorehistory", protectplayer, getuploadedscorehistory)
    .post("/savescore", protectplayer, savescore)
    .post("/savescoreuploadedsongs", protectplayer, savescoreuploadedsongs)

module.exports = router;
