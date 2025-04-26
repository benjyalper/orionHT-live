import React from 'react';
import { User, Bot } from 'lucide-react';

export type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

type MessageProps = {
  message: MessageType;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`flex max-w-[75%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div 
          className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
            message.isUser ? 'ml-2 bg-purple-100 dark:bg-purple-900' : 'mr-2 bg-teal-100 dark:bg-teal-900'
          }`}
        >
          {message.isUser ? (
            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          ) : (
            <Bot className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          )}
        </div>
        
        <div 
          className={`relative p-3 rounded-lg ${
            message.isUser 
              ? 'bg-purple-600 text-white rounded-tr-none' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
          <span 
            className={`text-xs block mt-1 ${
              message.isUser ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;