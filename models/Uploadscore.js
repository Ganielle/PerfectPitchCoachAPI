const mongoose = require("mongoose");

const UploadscoreSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            index: true // Automatically creates an index on 'amount'
        },
        song: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Songs",
            index: true // Automatically creates an index on 'amount'
        },
        amount: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Uploadscore = mongoose.model("Uploadscore", UploadscoreSchema)
module.exports = Uploadscore