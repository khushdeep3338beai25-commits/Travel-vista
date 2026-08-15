import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-2 border-0 shadow-sm"
      style={{
        width: '38px',
        height: '38px',
        backgroundColor: theme === 'dark' ? '#1e293b' : '#e0f2fe',
        color: theme === 'dark' ? '#f59e0b' : '#0284c7',
        transition: 'all 0.3s ease'
      }}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Theme toggle"
    >
      <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'} fs-6`}></i>
    </button>
  );
}
