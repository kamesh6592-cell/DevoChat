import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-wrapper">
      <button
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            <span className="icon">
              {isDark ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
