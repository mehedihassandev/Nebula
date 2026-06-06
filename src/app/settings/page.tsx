'use client';

import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/settingsStore';

export default function SettingsJsonPage() {
  const { fontSize, animationsEnabled, wordWrap, updateSettingsFromJson } = useSettingsStore();
  const [jsonText, setJsonText] = useState('');

  // Initialize with current state on mount
  useEffect(() => {
    const config = {
      "editor.fontSize": fontSize,
      "workbench.animations": animationsEnabled,
      "editor.wordWrap": wordWrap,
    };
    setJsonText(JSON.stringify(config, null, 2));
  }, [fontSize, animationsEnabled, wordWrap]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonText(val);
    updateSettingsFromJson(val);
  };

  return (
    <div className="w-full h-full flex flex-col font-mono">
      <div className="text-textMuted text-sm mb-4 italic select-none">
        // Edit the configuration below to customize the portfolio globally.
      </div>
      <textarea
        value={jsonText}
        onChange={handleChange}
        spellCheck="false"
        className="flex-1 w-full bg-transparent text-[#9ece6a] outline-none resize-none scrollbar-thin scrollbar-thumb-white/10"
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  );
}
