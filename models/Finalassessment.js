const mongoose = require("mongoose");

const FinalassessmentSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            index: true // Automatically creates an index on 'amount'
        },
        unlock: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Finalassessment = mongoose.model("Finalassessment", FinalassessmentSchema)
module.exports = Finalassessment