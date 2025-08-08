import React, { useState, useEffect } from 'react';
import { FaPalette, FaMoon, FaSun, FaDesktop, FaCheck, FaTimes } from 'react-icons/fa';

const ACCENT_COLORS = [
  { name: 'Purple', value: '#a21caf' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#059669' },
  { name: 'Orange', value: '#f59e42' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Teal', value: '#14b8a6' },
];

const GRADIENTS = [
  { name: 'Purple-Blue', value: 'from-purple-600 via-blue-600 to-pink-600' },
  { name: 'Green-Teal', value: 'from-green-500 via-teal-400 to-blue-500' },
  { name: 'Orange-Pink', value: 'from-orange-400 via-pink-500 to-red-500' },
  { name: 'Blue-Gray', value: 'from-blue-900 via-gray-800 to-blue-700' },
  { name: 'Indigo-Lime', value: 'from-indigo-500 via-lime-400 to-green-500' },
];

const BUBBLE_STYLES = [
  { name: 'Rounded', value: 'rounded-2xl' },
  { name: 'Square', value: 'rounded-md' },
  { name: 'Glass', value: 'backdrop-blur-lg bg-white/10 border border-white/20' },
  { name: 'Minimal', value: 'border border-gray-400 bg-transparent' },
];

const FONTS = [
  { name: 'Inter', value: 'font-sans' },
  { name: 'Roboto', value: 'font-roboto' },
  { name: 'Nunito', value: 'font-nunito' },
];

const THEME_OPTIONS = [
  { name: 'Dark', value: 'dark', icon: <FaMoon /> },
  { name: 'Light', value: 'light', icon: <FaSun /> },
  { name: 'Auto', value: 'auto', icon: <FaDesktop /> },
];

const defaultPrefs = {
  theme: 'auto',
  accent: ACCENT_COLORS[0].value,
  gradient: GRADIENTS[0].value,
  bubble: BUBBLE_STYLES[0].value,
  font: FONTS[0].value,
};

const ThemeCustomizer = ({ open, onClose, onChange }) => {
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    const saved = localStorage.getItem('themePrefs');
    if (saved) setPrefs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('themePrefs', JSON.stringify(prefs));
    if (onChange) onChange(prefs);
  }, [prefs, onChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"><FaTimes /></button>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaPalette /> Theme & Customization</h2>
        {/* Theme */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Theme</h3>
          <div className="flex gap-3">
            {THEME_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPrefs(p => ({ ...p, theme: opt.value }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${prefs.theme === opt.value ? 'bg-purple-600 text-white border-purple-400' : 'bg-gray-800 text-gray-300 border-gray-700'}`}
              >
                {opt.icon} {opt.name}
              </button>
            ))}
          </div>
        </div>
        {/* Accent Color */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Accent Color</h3>
          <div className="flex gap-3">
            {ACCENT_COLORS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPrefs(p => ({ ...p, accent: opt.value }))}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${prefs.accent === opt.value ? 'border-4 border-white scale-110' : 'border-gray-500'}`}
                style={{ background: opt.value }}
                title={opt.name}
              >
                {prefs.accent === opt.value && <FaCheck className="text-white" />}
              </button>
            ))}
          </div>
        </div>
        {/* Gradient */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Gradient Style</h3>
          <div className="flex gap-3">
            {GRADIENTS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPrefs(p => ({ ...p, gradient: opt.value }))}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${prefs.gradient === opt.value ? 'border-4 border-white scale-105' : 'border-gray-500'}`}
              >
                <div className={`w-20 h-6 rounded ${opt.value} bg-gradient-to-r`} />
                <span className="ml-2 text-sm">{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Bubble Style */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Chat Bubble Style</h3>
          <div className="flex gap-3">
            {BUBBLE_STYLES.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPrefs(p => ({ ...p, bubble: opt.value }))}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${prefs.bubble === opt.value ? 'bg-purple-600 text-white border-purple-400' : 'bg-gray-800 text-gray-300 border-gray-700'}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
        {/* Font Family */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Font Family</h3>
          <div className="flex gap-3">
            {FONTS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPrefs(p => ({ ...p, font: opt.value }))}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${prefs.font === opt.value ? 'bg-purple-600 text-white border-purple-400' : 'bg-gray-800 text-gray-300 border-gray-700'}`}
                style={{ fontFamily: opt.name }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
        {/* Live Preview */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Live Preview</h3>
          <div className={`p-4 ${prefs.gradient} bg-gradient-to-r ${prefs.font}`} style={{ borderRadius: '1rem' }}>
            <div className={`inline-block px-4 py-2 mb-2 text-white ${prefs.bubble} ${prefs.bubble.includes('Glass') ? 'backdrop-blur-lg bg-white/10 border border-white/20' : ''}`}
              style={{ background: prefs.bubble === 'Minimal' ? 'transparent' : prefs.accent }}>
              This is a chat bubble preview!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer; 