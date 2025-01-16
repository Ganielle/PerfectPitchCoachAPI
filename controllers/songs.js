const { default: mongoose } = require("mongoose")
const Songs = require("../models/Songs")

exports.uploadsong = async (req, res) => {
    const {id} = req.user
    const {songname, notes} = req.body

    let songfile = ""

    console.log(notes)

    if (!songname){
        return res.status(400).json({ message: "failed", 
            data: "Please enter the song name" })
    }
    else if (!Array.isArray(notes)) {
        return res.status(400).json({ message: "failed", data: "The notes are invalid!" });
    }
    else if (notes.length <= 0){
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

    await Songs.create({owner: new mongoose.Types.ObjectId(id), songname: songname, songfile: songfile, notes: formattedNotes})
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