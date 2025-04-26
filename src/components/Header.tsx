import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';

type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b transition-colors duration-300 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center space-x-2">
        <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">
          OrionHT
        </h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-purple-600" />
        )}
      </button>
    </header>
  );
};

export default Header;