const Users = require("../models/Users")

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

    await Users.create({username: username, password: password})
    .catch(err => {
        console.log(`There's a problem getting the list of users. Error ${err}`)

        return res.status(400).json({message: "bad-request", data: "There's a problem with the server! Please contact customer support."})
    })

    return res.json({message: "success"})
}