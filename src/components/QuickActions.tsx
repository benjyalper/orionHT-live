import React from 'react';
import { Code, FileText, MapPin, HelpCircle } from 'lucide-react';

type QuickActionsProps = {
  onActionClick: (prompt: string) => void;
};

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { 
      icon: <Code className="h-4 w-4" />, 
      label: 'Write code', 
      prompt: 'Write a function that calculates the Fibonacci sequence in JavaScript.' 
    },
    { 
      icon: <FileText className="h-4 w-4" />, 
      label: 'Summarize text', 
      prompt: 'Can you help me summarize a long article?' 
    },
    { 
      icon: <MapPin className="h-4 w-4" />, 
      label: 'Plan trip', 
      prompt: 'I need help planning a weekend trip to a nearby city.' 
    },
    { 
      icon: <HelpCircle className="h-4 w-4" />, 
      label: 'Ask anything', 
      prompt: 'What makes you different from other AI assistants?' 
    },
  ];

  return (
    <div className="flex justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick(action.prompt)}
          className="flex items-center px-3 py-2 text-xs rounded-full 
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors duration-200"
        >
          <span className="mr-1.5">{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;