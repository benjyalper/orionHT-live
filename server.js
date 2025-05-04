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

// 1) Serve your Vite build output
const staticPath = path.join(process.cwd(), 'dist');
app.use(express.static(staticPath));

// 2) Verify key is loaded
console.log('🔑 OPENAI_API_KEY loaded?', !!process.env.OPENAI_API_KEY);

// 3) Instantiate OpenAI (v4 SDK)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 4) Health check
app.get('/health', (_req, res) => {
    res.json({ apiKeyLoaded: !!process.env.OPENAI_API_KEY });
});

// 5) Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are OrionHT, an AI assistant with a unique style—helpful, creative, direct, and concise.',
                },
                { role: 'user', content: message },
            ],
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error('❌ OpenAI error:', err);
        const msg = err instanceof Error ? err.message : String(err);
        res.status(500).json({ error: msg });
    }
});

// 6) SPA fallback (no '*' string)
//    Only for GET requests not hitting '/api/*', serve index.html:
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(path.join(staticPath, 'index.html'));
    }
    next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
