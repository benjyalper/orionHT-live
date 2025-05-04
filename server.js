// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

// Verify key is loaded
console.log('🔑 OPENAI_API_KEY loaded?', !!process.env.OPENAI_API_KEY);

// Instantiate the v4 client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get('/health', (_req, res) => {
    res.json({ apiKeyLoaded: !!process.env.OPENAI_API_KEY });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are OrionHT, an AI assistant with a unique style…' },
                { role: 'user', content: message },
            ],
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error('❌ OpenAI error:', err);
        res.status(500).json({ error: err.message || String(err) });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
