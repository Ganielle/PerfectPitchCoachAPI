const router = require("express").Router()
const { uploadsong, getuploadedsongs } = require("../controllers/songs")
const { protectplayer } = require("../middleware/middleware")
const recordingupload = require("../middleware/uploadrecordings")

const song = recordingupload.single("song")


router
    .get("/getuploadedsongs", protectplayer, getuploadedsongs)
    .post("/uploadsong", protectplayer, function (req, res, next){
        song(req, res, function(err) {
            if (err){
                return res.status(400).send({ message: "failed", data: err.message })
            }

            next()
        })
    }, uploadsong)

module.exports = router;
