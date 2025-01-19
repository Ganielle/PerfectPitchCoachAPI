const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            index: true // Automatically creates an index on 'amount'
        },
        songname: {
            type: String
        },
        songfile: {
            type: String
        },
        speed: {
            type: Number
        },
        notes: [{
            notevalue: {
                type: String
            }
        }],
        noteletter: [{
            notelettervalue: {
                type: String
            }
        }]
    },
    {
        timestamps: true
    }
)

const Songs = mongoose.model("Songs", SongSchema)
module.exports = Songs