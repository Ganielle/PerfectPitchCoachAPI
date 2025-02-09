const { default: mongoose } = require("mongoose")
const Users = require("../models/Users")
const Unlock = require("../models/Unlock")
const Finalassessment = require("../models/Finalassessment")

exports.createuser = async (req, res) => {
    const {username, password} = req.body

    if (!username){
        return res.status(400).json({message: "failed", data: "Please enter your username first"})
    }
    else if (!password){
        return res.status(400).json({message: "failed", data: "Please enter your password first"})
    }

    const existing = await Users.find({username: { $regex: new RegExp('^' + username + '$', 'i') }})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting the list of users. Error ${err}`)

        return res.status(400).json({message: "bad-request", data: "There's a problem with the server! Please contact customer support."})
    })

    if (existing.length > 0){
        return res.status(400).json({message: "failed", data: "User already exists"})
    }

    const userdata = await Users.create({username: username, password: password})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting the list of users. Error ${err}`)

        return res.status(400).json({message: "bad-request", data: "There's a problem with the server! Please contact customer support."})
    })

    const songs = [
        {
            owner: new mongoose.Types.ObjectId(userdata._id),
            song: "Scales and Triads",
            locked: 0
        },
        {
            owner: new mongoose.Types.ObjectId(userdata._id),
            song: "Arpeggio",
            locked: 1
        },
        {
            owner: new mongoose.Types.ObjectId(userdata._id),
            song: "Circular 5th Major",
            locked: 1
        },
        {
            owner: new mongoose.Types.ObjectId(userdata._id),
            song: "Circular 9th Major",
            locked: 1
        },
        {
            owner: new mongoose.Types.ObjectId(userdata._id),
            song: "Looper 1",
            locked: 1
        },
        {
            owner: new mongoose.Types.ObjectId(userdata._id),
            song: "Looper 2",
            locked: 1
        }
    ]

    await Unlock.bulkWrite(
        songs.map((songdata) => ({
            insertOne: { document: songdata },
        }))
    )
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem creating song locked data ${err}`)
        return res.status(400).json({message: "failed", data: "There's a problem creating user account. Please contact customer support for more details"})
    })

    await Finalassessment.create({owner: new mongoose.Types.ObjectId(userdata._id), unlock: 0})

    return res.json({message: "success"})
}

exports.getsongs = async (req, res) => {
    const {id, username} = req.user

    const songdata = await Unlock.find({owner: new mongoose.Types.ObjectId(id)})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem with getting the song data for ${username}. Error: ${err}`)

        return res.status(400).json({message: "failed", data: "There's a problem with the server. Please contact customer support for more details"})
    })

    const data = {}

    songdata.forEach(tempdata => {
        const {_id, owner, song, locked} = tempdata

        data[song] = {
            id: _id,
            owner: owner,
            locked: locked
        }
    })

    return res.json({message: "success", data: data})
}

exports.getfinalassessmentstats = async (req, res) => {
    const {id} = req.user

    const assessment = await Finalassessment.findOne({owner: new mongoose.Types.ObjectId(id)})

    return res.json({message: "success", data: assessment.unlock})
}