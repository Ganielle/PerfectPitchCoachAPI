const router = require("express").Router()
const { createuser, getsongs, getfinalassessmentstats } = require("../controllers/user")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getsongs", protectplayer, getsongs)
    .get("/getfinalassessmentstats", protectplayer, getfinalassessmentstats)
    .post("/createuser", createuser)

module.exports = router;

//https://perfectpitchcoachapi.onrender.com