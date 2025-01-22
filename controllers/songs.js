const { default: mongoose } = require("mongoose")
const Songs = require("../models/Songs")
const Uploadscore = require("../models/Uploadscore")

exports.uploadsong = async (req, res) => {
    const {id} = req.user
    const {songname, notes, noteletter, speed} = req.body

    console.log(`spawn time: ${notes}`)
    console.log(`letters: ${noteletter}`);

    let songfile = ""

    console.log(notes)

    if (!songname){
        return res.status(400).json({ message: "failed", 
            data: "Please enter the song name" })
    }
    else if (!speed){
        return res.status(400).json({ message: "failed", 
            data: "Please enter the song speed" })
    }
    else if (!Array.isArray(notes)) {
        return res.status(400).json({ message: "failed", data: "The notes are invalid!" });
    }
    else if (notes.length <= 0){
        return res.status(400).json({ message: "failed", data: "Please enter the song notes before saving" });
    }
    else if (!Array.isArray(noteletter)) {
        return res.status(400).json({ message: "failed", data: "The notes are invalid!" });
    }
    else if (noteletter.length <= 0){
        return res.status(400).json({ message: "failed", data: "Please enter the song notes before saving" });
    }
    else if (req.file){
        songfile = req.file.path
    }
    else {
        return res.status(400).json({ message: "failed", 
            data: "Select your song you want to upload and try again" })
    }

    const formattedNotes = notes.map((note) => ({ notevalue: note }));
    const formattedNoteLetters = noteletter.map((note) => ({ notelettervalue: note }));

    await Songs.create({owner: new mongoose.Types.ObjectId(id), songname: songname, songfile: songfile, notes: formattedNotes, noteletter: formattedNoteLetters, speed: speed})
    .catch(err => {
        console.log(`There's a problem uploading songs for ${id}, songname: ${songname}. Error ${err}`)

        return res.status(400).json({ message: "failed", data: "There's a problem with the server. Please try again later" });
    })

    return res.json({message: "success"})
}

exports.getuploadedsongs = async (req, res) => {
    const {id} = req.user

    const song = await Songs.find({owner: new mongoose.Types.ObjectId(id)})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting the songs for ${id}. Error: ${err}`)
    })

    return res.json({message: "success", data: song})
}

exports.savescoreuploadedsongs = async (req, res) => {
    const {id} = req.user

    const {songid, score} = req.body

    await Uploadscore.create({owner: new mongoose.Types.ObjectId(id), song: new mongoose.Types.ObjectId(songid), amount: score})
    .catch(err => {
        console.log(`There's a problem saving the songs for ${id} songid: ${songid}. Error: ${err}`)
    })

    return res.json({message: "success"})
}

exports.getuploadedscorehistory = async (req, res) => {
    const {id} = req.user

    const {songid} = req.query

    const scorehistorydata = await Uploadscore.find({owner: new mongoose.Types.ObjectId(id), songid: new mongoose.Types.ObjectId(songid)})
    .limit(10)
    .then(data => data)

    return res.json({message: "success", data: scorehistorydata})
}

exports.getuploadedscore = async (req, res) => {
    const {id, username} = req.user

    const {songid} = req.query

    await Uploadscore.find({owner: new mongoose.Types.ObjectId(id), songid: new mongoose.Types.ObjectId(songid)})
    .sort({ amount: -1 })
    .limit(1) 

    return res.json({message: "success", data: result.length <= 0 ? 0 : result[0].amount})
}