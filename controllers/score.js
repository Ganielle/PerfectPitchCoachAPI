const { default: mongoose } = require("mongoose")
const Scores = require("../models/Score")

exports.savescore = async (req, res) => {
    const {id, username} = req.user

    const {song, score} = req.body

    await Scores.create({owner: new mongoose.Types.ObjectId(id), song: song, amount: score})
    .catch(err => {
        console.log(`There's a problem saving the score for ${username}. Error: ${err}`)
    })

    return res.json({message: "success"})
}

exports.getscore = async (req, res) => {
    const {id, username} = req.user

    const {song} = req.query

    if (!song){
        return res.status(400).json({message: "failed", data: "Select a valid song!"})
    }

    const result = await Scores.find({owner: new mongoose.Types.ObjectId(id), song: song})
    .sort({ amount: -1 })
    .limit(1) 

    return res.json({message: "success", data: result.length <= 0 ? 0 : result[0].amount})
}