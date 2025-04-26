import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import Message, { MessageType } from './Message';

type ChatAreaProps = {
  messages: MessageType[];
  loading: boolean;
};

const ChatArea: React.FC<ChatAreaProps> = ({ messages, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative">
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="stars-sm" />
        <div className="stars-md" />
        <div className="stars-lg" />
      </div>

      {/* Welcome message when no messages */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-teal-400 flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Welcome to OrionHT
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            I'm your AI assistant with a slightly different style. Ask me anything, and I'll provide helpful, concise answers.
          </p>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {/* Loading indicator */}
      {loading && (
        <div className="flex mb-4">
          <div className="mr-2 flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex-shrink-0">
            <Bot className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="p-3 rounded-lg rounded-tl-none bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <div className="flex space-x-1 items-center">
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-200" />
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatArea;