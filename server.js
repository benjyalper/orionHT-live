// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the Vite build output
const staticPath = path.join(process.cwd(), 'dist');
app.use(express.static(staticPath));

// Verify key is loaded at startup
console.log('🔑 OPENAI_API_KEY loaded?', !!process.env.OPENAI_API_KEY);

// Instantiate the OpenAI client (v4 SDK)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ apiKeyLoaded: !!process.env.OPENAI_API_KEY });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are OrionHT, an AI assistant with a unique style—helpful, creative, direct, and concise.',
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
        });
        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error('❌ OpenAI error:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(500).json({ error: errorMessage });
    }
});

// Fallback to index.html for any other route (for SPA client‐side routing)
app.get('*', (_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
