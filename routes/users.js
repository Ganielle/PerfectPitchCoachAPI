const router = require("express").Router()
const { createuser } = require("../controllers/user")
const { protectplayer } = require("../middleware/middleware")

router
    .post("/createuser", createuser)

module.exports = router;
