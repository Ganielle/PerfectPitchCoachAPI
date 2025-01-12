const {OpenAI} = require('openai')
const Scores = require("../models/Score");
const { default: mongoose } = require('mongoose');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});


exports.getrecommendation = async (req, res) => {
    const {id, username} = req.user

    const {score, maxscore, songname} = req.query

    const myscore = await Scores.find({owner: new mongoose.Types.ObjectId(id), song: songname})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting the score of the user! Error: ${err}`)

        return res.status(400).json({message: "bad-request", data: "There's a problem with the server .Please try again later"})
    })

    var content = `my score from the app that test my singing skills is ${score} / ${maxscore}, the song is ${songname}, give me a recommendation on how to improve my skills and make it brief. Also don't recomment me to use another app and go to coach since I'm creating an app for this I just want you to create a recommendation.`

    if (myscore.length > 0){
        const tempscore = []

        myscore.forEach(tempdata => {
            const {amount} = tempdata

            tempscore.push({
                amount: amount
            })
        })

        content += `\n\n Here's the user's score history, make a recommendation based on the current score vs the score history:\n${JSON.stringify(tempscore)}`;
    }

    console.log(`Question to AI: ${content}`)

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: content,
            },
        ],
    });
    
    return res.json({message: "success", data: {
        content: completion.choices[0].message.content
        }
    })
}

exports.preassessment = async (req, res) => {
    const {id, username} = req.user

    const {question, songname} = req.query

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `This is the user question: ${question}"`,
            },
        ],
    });
    
    return res.json({message: "success", data: {
        content: completion.choices[0].message.content
        }
    })
}