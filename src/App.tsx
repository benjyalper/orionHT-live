import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import QuickActions from './components/QuickActions';
import { MessageType } from './components/Message';
import { createMessage, generateAIResponse } from './utils/messageUtils';
import { Bot } from 'lucide-react';
import './styles/animations.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage = createMessage(text, true);
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    
    try {
      const response = await generateAIResponse(text);
      const aiMessage = createMessage(response, false);
      
      // Add a slight delay to make the response feel more natural
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = createMessage(
        "I'm sorry, I encountered an error processing your request. Please try again.",
        false
      );
      setMessages(prev => [...prev, errorMessage]);
      setLoading(false);
    }
  };
  
  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatArea messages={messages} loading={loading} />
        <QuickActions onActionClick={handleQuickAction} />
        <MessageInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}

export default App;