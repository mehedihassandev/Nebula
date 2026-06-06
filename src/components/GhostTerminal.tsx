'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscTerminal, VscCheck } from 'react-icons/vsc';
import { FiGitBranch } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useAchievementsStore } from '../store/achievementsStore';
import { SHORTCUTS, checkShortcut } from '@constants/shortcuts';

export const GhostTerminal = () => {
  const pathname = usePathname();
  const { unlockBadge } = useAchievementsStore();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<
    { id: number; command: string; output: React.ReactNode }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, output]);



  useEffect(() => {
    const val = input.trim();
    if (!val) {
      setOutput('');
      return;
    }

    // 1. JWT Detection
    if (val.startsWith('ey') && val.split('.').length === 3) {
      try {
        const parts = val.split('.');
        const header = JSON.parse(
          atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))
        );
        const payload = JSON.parse(
          atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
        );
        setOutput(
          `[JWT Header]\n${JSON.stringify(header, null, 2)}\n\n[JWT Payload]\n${JSON.stringify(payload, null, 2)}`
        );
        return;
      } catch (e) {}
    }

    // 2. JSON Detection
    if (
      (val.startsWith('{') && val.endsWith('}')) ||
      (val.startsWith('[') && val.endsWith(']'))
    ) {
      try {
        const obj = JSON.parse(val);
        setOutput(JSON.stringify(obj, null, 2));
        return;
      } catch (e) {}
    }

    // 3. Base64 Detection
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (base64Regex.test(val) && val.length > 20 && !val.includes(' ')) {
      try {
        const decoded = atob(val);
        if (/^[\x20-\x7E\n\r\t]+$/.test(decoded)) {
          setOutput(decoded);
          return;
        }
      } catch (e) {}
    }

    // If we can't parse it reliably, show nothing
    setOutput('');
  }, [input]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  const [systemInfo, setSystemInfo] = useState<{ label: string; value: any }[]>(
    []
  );
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Initial time set
    setCurrentTime(new Date().toLocaleTimeString());

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Parse OS
    const ua = navigator.userAgent;
    let os = 'Unknown OS';
    if (ua.indexOf('Win') !== -1) os = 'Windows';
    if (ua.indexOf('Mac') !== -1) os = 'macOS';
    if (ua.indexOf('X11') !== -1) os = 'UNIX';
    if (ua.indexOf('Linux') !== -1) os = 'Linux';
    if (/Android/.test(ua)) os = 'Android';
    if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

    // Parse Browser
    let browser = 'Unknown Browser';
    if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('Edg') !== -1) browser = 'Edge';
    else if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';

    const display = `${window.screen.width}x${window.screen.height} @ ${window.devicePixelRatio}x`;

    setSystemInfo([
      { label: 'OS', value: os },
      { label: 'Host Browser', value: browser },
      { label: 'Local Time', value: 'dynamic' },
      { label: 'Language', value: navigator.language },
      { label: 'Display', value: display },
      { label: 'Theme', value: 'Liquid Glass (Dynamic)' }
    ]);

    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdStr = input.trim();
    const cmd = cmdStr.toLowerCase();

    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      setOutput('');
      return;
    }

    let newOutput: React.ReactNode = '';

    if (cmd === 'ls') {
      newOutput =
        'home.tsx   about.tsx   projects.tsx   contact.tsx   experience.tsx   README.md';
    } else if (cmd === 'pwd') {
      newOutput = `/Users/visitor/portfolio${pathname === '/' ? '' : pathname}`;
    } else if (cmd === 'whoami') {
      newOutput = 'visitor';
    } else if (cmd === 'date') {
      newOutput = new Date().toString();
    } else if (cmd === 'help') {
      newOutput =
        'Available commands:\n  clear    Clear terminal\n  ls       List directory contents\n  pwd      Print working directory\n  whoami   Print effective userid\n  date     Print system date and time\n  echo     Write arguments to the standard output\n  skills   List my technical skills\n  contact  Show my contact information\n  repo     Open my GitHub profile\n\nLive Parsing Available For:\n  - JSON (Paste valid JSON)\n  - JWT (Paste JWT token)\n  - Base64 (Paste base64 string)';
    } else if (cmd === 'skills') {
      newOutput =
        'Languages: TypeScript, JavaScript, Python, Go\nFrontend: React, Next.js, TailwindCSS\nBackend: Node.js, Express, NestJS\nDatabase: PostgreSQL, MongoDB, Redis';
    } else if (cmd === 'contact') {
      newOutput =
        'Email: mdmehedihassan.shohag@gmail.com\nGitHub: github.com/mdmehedihassan\nLinkedIn: linkedin.com/in/mdmehedihassan';
    } else if (cmd === 'sudo') {
      newOutput =
        'visitor is not in the sudoers file. This incident will be reported.';
      unlockBadge('HACKER_MAN');
    } else if (cmd === 'matrix') {
      newOutput = 'Wake up, Neo...';
      unlockBadge('THE_ONE');
    } else if (cmd === 'repo') {
      newOutput = 'Opening repository in a new tab...';
      window.open('https://github.com/mdmehedihassan', '_blank');
    } else if (cmd.startsWith('echo ')) {
      newOutput = cmdStr.substring(5);
    } else if (output) {
      // It was live-parsed by useEffect
      newOutput = output;
    } else {
      newOutput = `command not found: ${cmd.split(' ')[0]}`;
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now(), command: cmdStr, output: newOutput }
    ]);
    setInput('');
    setOutput('');
  };

  const PromptLine = ({ isHistory = false }: { isHistory?: boolean }) => (
    <div
      className={`flex justify-between items-center text-[13px] ${isHistory ? 'opacity-70 mb-0.5' : 'mb-1'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-accent font-bold">
          ~/portfolio{pathname === '/' ? '/home.tsx' : `${pathname}`}
        </span>
        <span className="text-secondary flex items-center gap-1.5">
          <FiGitBranch size={14} /> develop
        </span>
        <span className="text-secondary font-bold flex items-center">
          <VscCheck size={16} strokeWidth={1} />
        </span>
      </div>
      <div className="text-textMuted text-[11px] uppercase tracking-widest hidden sm:block">
        via{' '}
        <span className="text-accent font-bold ml-1 text-[12px] tracking-normal">
          ⬢ v25.3.0
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-primary flex flex-col font-mono text-textColor">
      <div className="flex-1 overflow-auto p-4 scrollbar-thin scrollbar-thumb-white/10 text-[13px]">
        {/* Intro / Description */}
        <div className="mb-6 text-textMuted leading-relaxed">
          <div className="text-secondary font-bold text-[14px] mb-2 tracking-wide">
            Portfolio Shell v1.0.0
          </div>
          <div className="mb-2">
            A fully interactive terminal environment.
          </div>
          <ul className="list-none space-y-1 ml-1 mb-3 text-secondary/90">
            <li className="flex items-center gap-2">
              <span className="text-textMuted/50 text-[10px]">▶</span> Run
              standard shell commands (ls, pwd, clear)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-textMuted/50 text-[10px]">▶</span>{' '}
              Explore my skills and contact info (skills, contact)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-textMuted/50 text-[10px]">▶</span>{' '}
              Live-parse JSON, JWT, or Base64 simply by pasting
            </li>
          </ul>
          <div>
            Type{' '}
            <span className="text-accent font-semibold">help</span>{' '}
            to see all available commands.
          </div>
        </div>

        {/* System Info */}
        <div className="flex flex-col gap-1.5 mb-6 text-textMuted leading-relaxed">
          {systemInfo.map((info, i) => (
            <div key={i} className="flex">
              <span className="w-32 text-secondary font-semibold tracking-wide">
                {info.label}
              </span>
              <span className="text-textMuted/50 mr-4">→</span>
              <span className="flex-1 text-textColor">
                {info.label === 'Local Time' ? currentTime : info.value}
              </span>
            </div>
          ))}
        </div>

        {/* Command History */}
        {history.map((item) => (
          <div key={item.id} className="mb-3">
            <PromptLine isHistory />
            <div className="relative flex items-center mt-0.5">
              <span className="absolute left-2 text-lg opacity-70">
                🚀
              </span>
              <div className="text-textColor text-[13px] pl-10 pr-4 py-0.5">
                {item.command}
              </div>
            </div>
            {item.output && (
              <div className="pl-10 pr-4 mt-1 text-textMuted whitespace-pre-wrap overflow-x-auto text-[13px] leading-snug">
                {item.output}
              </div>
            )}
          </div>
        ))}

        {/* Current Prompt */}
        <PromptLine />

        {/* Input Area */}
        <form
          onSubmit={handleCommand}
          className="relative flex items-center group mt-0.5"
        >
          <span className="absolute left-2 text-lg group-focus-within:animate-pulse transition-all opacity-80 group-focus-within:opacity-100">
            🚀
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' for commands, or paste JSON/JWT/Base64..."
            className="w-full bg-transparent border-none outline-none text-textColor text-[13px] pl-10 pr-4 py-0.5 placeholder-textMuted/50 transition-colors"
            spellCheck="false"
            autoComplete="off"
          />
        </form>

        {/* Live Output Area */}
        {output && (
          <div className="overflow-hidden pl-10 pr-4 mt-2">
            <div className="text-textMuted whitespace-pre-wrap overflow-x-auto text-[13px] leading-snug">
              {output}
            </div>
          </div>
        )}

        {/* Dummy div to scroll to bottom */}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};
