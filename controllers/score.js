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

exports.getleaderboard = async (req, res) => {
    const {id, username} = req.user

    const {song} = req.query

    if (!song){
        return res.status(400).json({message: "failed", data: "Select a valid song!"})
    }

    const result = await Scores.aggregate([
        { $match: { song: song } }, // Filter by song
        { 
            $sort: { amount: -1 } // Sort by score (amount) in descending order
        },
        {
            $group: {
                _id: "$owner", // Group by the `owner` field (unique user)
                maxAmount: { $first: "$amount" }, // Take the highest score for each user
            }
        },
        {
            $lookup: {
                from: "users", // Assume `users` is the collection for user details
                localField: "_id",
                foreignField: "_id",
                as: "ownerDetails"
            }
        },
        {
            $unwind: "$ownerDetails" // Flatten the joined owner details
        },
        {
            $project: {
                username: "$ownerDetails.username",
                amount: "$maxAmount"
            }
        },
        {
            $sort: { amount: -1 } // Sort again to ensure proper order after grouping
        },
        { $limit: 10 } // Limit to top 10 results
    ]);

    return res.json({ message: "success", data: result });
}