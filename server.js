import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Put your OpenAI key in Railway secrets
}));

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: completion.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating response");
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
