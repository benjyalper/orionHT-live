// src/utils/messageUtils.ts

import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '../components/Message';

/**
 * Factory for a chat message object
 */
export const createMessage = (text: string, isUser: boolean): MessageType => {
  return {
    id: uuidv4(),
    text,
    isUser,
    timestamp: new Date(),
  };
};

/**
 * Send the user’s message to your Express backend
 * which holds the OPENAI_API_KEY, and return the AI’s reply.
 */
export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`API Error ${res.status}: ${errText}`);
    }

    const { reply } = (await res.json()) as { reply: string };
    return reply;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I’m sorry, I ran into a problem. Please try again.";
  }
};
