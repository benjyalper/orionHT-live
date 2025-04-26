import React, { useState } from 'react';
import { Send, Mic, Image } from 'lucide-react';

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t dark:border-gray-800 p-4 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Upload image"
        >
          <Image className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask OrionHT anything..."
          className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Voice input"
        >
          <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <button 
          type="submit" 
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
          aria-label="Send message"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;