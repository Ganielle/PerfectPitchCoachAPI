const router = require("express").Router()
const { createuser, getsongs } = require("../controllers/user")
const { protectplayer } = require("../middleware/middleware")

router
    .get("/getsongs", protectplayer, getsongs)
    .post("/createuser", createuser)

module.exports = router;

//https://perfectpitchcoachapi.onrender.com