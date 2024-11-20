const router = require("express").Router()
const { savescore, getscore } = require("../controllers/score")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getscore", protectplayer, getscore)
    .post("/savescore", protectplayer, savescore)

module.exports = router;
