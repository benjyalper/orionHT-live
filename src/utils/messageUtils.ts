import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '../components/Message';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const createMessage = (text: string, isUser: boolean): MessageType => {
  return {
    id: uuidv4(),
    text,
    isUser,
    timestamp: new Date(),
  };
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are OrionHT, an AI assistant with a unique style. You're helpful, creative, and provide accurate responses while maintaining a slightly different approach from other AI assistants. You're direct and concise in your responses."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I apologize, but I encountered an error while processing your request. Please try again.";
  }
};