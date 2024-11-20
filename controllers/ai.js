const {OpenAI} = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});


exports.getrecommendation = async (req, res) => {
    const {id, username} = req.user

    const {score, maxscore, songname} = req.query

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `my score from the app that test my singing skills is ${score} / ${maxscore}, the song is ${songname}, give me a recommendation on how to improve my skills and make it brief`,
            },
        ],
    });
    
    return res.json({message: "success", data: {
        content: completion.choices[0].message.content
        }
    })
}