const { default: mongoose } = require("mongoose")
const Scores = require("../models/Score")

exports.savescore = async (req, res) => {
    const {id, username} = req.user

    const {score} = req.body

    await Scores.create({owner: new mongoose.Types.ObjectId(id), amount: score})
    .catch(err => {
        console.log(`There's a problem saving the score for ${username}. Error: ${err}`)
    })

    return res.json({message: "success"})
}

exports.getscore = async (req, res) => {
    const {id, username} = req.user

    const result = await Scores.find({owner: new mongoose.Types.ObjectId(id)})
    .sort({ createdAt: -1})
    .limit(1)

    return res.json({message: "succes", data: result})
}