'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VscTerminal, VscCheck } from 'react-icons/vsc';
import { FiGitBranch } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { SHORTCUTS, checkShortcut } from '@constants/shortcuts';

export const GhostTerminal = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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
  }, [history, output, isOpen]);

  // Keyboard shortcut to toggle terminal (Cmd+J / Ctrl+J)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (checkShortcut(e, SHORTCUTS.TERMINAL)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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
    } else if (cmd === 'matrix') {
      newOutput = 'Wake up, Neo...';
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
        <span className="text-[#ff9e64] font-bold">
          ~/portfolio{pathname === '/' ? '/home.tsx' : `${pathname}`}
        </span>
        <span className="text-[#7dcfff] flex items-center gap-1.5">
          <FiGitBranch size={14} /> develop
        </span>
        <span className="text-[#9ece6a] font-bold flex items-center">
          <VscCheck size={16} strokeWidth={1} />
        </span>
      </div>
      <div className="text-[#565f89] text-[11px] uppercase tracking-widest hidden sm:block">
        via{' '}
        <span className="text-[#bb9af7] font-bold ml-1 text-[12px] tracking-normal">
          ⬢ v25.3.0
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 right-6 z-[9999999999999999999] p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-white/40 hover:text-secondary hover:border-secondary/30 shadow-lg transition-all"
        title="Ghost Terminal (Cmd/Ctrl + J)"
      >
        <VscTerminal size={20} />
      </button>

      {/* Full Screen Overlay to catch clicks outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[9999] bg-black/50 backdrop-blur-md flex items-center justify-center p-4 lg:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-[850px] min-w-[600px] max-w-[95vw] max-h-[85vh] bg-[#0f111a]/85 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] flex flex-col font-mono"
            >
              <div className="flex-1 overflow-auto p-5 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/10 text-[13px]">
                {/* Intro / Description */}
                <div className="mb-8 text-[#a9b1d6] leading-relaxed">
                  <div className="text-[#7aa2f7] font-bold text-[14px] mb-2 tracking-wide">
                    Portfolio Shell v1.0.0
                  </div>
                  <div className="mb-3">
                    A fully interactive terminal environment built directly into
                    my portfolio.
                  </div>
                  <ul className="list-none space-y-1.5 ml-1 mb-4 text-[#9ece6a]/90">
                    <li className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px]">▶</span> Run
                      standard shell commands (ls, pwd, clear)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px]">▶</span>{' '}
                      Explore my skills and contact info (skills, contact)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px]">▶</span>{' '}
                      Live-parse JSON, JWT, or Base64 simply by pasting
                    </li>
                  </ul>
                  <div>
                    Type{' '}
                    <span className="text-[#ff9e64] font-semibold">help</span>{' '}
                    to see all available commands.
                  </div>
                  <div className="text-[#565f89] mt-3 uppercase tracking-widest text-[11px] font-semibold">
                    Shortcut: Cmd+J / Ctrl+J
                  </div>
                </div>

                {/* System Info */}
                <div className="flex flex-col gap-2 mb-6 text-[#a9b1d6] leading-relaxed">
                  {systemInfo.map((info, i) => (
                    <div key={i} className="flex">
                      <span className="w-32 text-[#7aa2f7] font-semibold tracking-wide">
                        {info.label}
                      </span>
                      <span className="text-white/30 mr-4">→</span>
                      <span className="flex-1 text-[#c0caf5]">
                        {info.label === 'Local Time' ? currentTime : info.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Command History */}
                {history.map((item) => (
                  <div key={item.id} className="mb-4">
                    <PromptLine isHistory />
                    <div className="relative flex items-center mt-1">
                      <span className="absolute left-2 text-xl opacity-70">
                        🚀
                      </span>
                      <div className="text-[#c0caf5] text-[13px] pl-10 pr-4 py-0.5">
                        {item.command}
                      </div>
                    </div>
                    {item.output && (
                      <div className="pl-10 pr-4 mt-1 text-[#a9b1d6] whitespace-pre-wrap overflow-x-auto text-[13px] leading-snug">
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
                  className="relative flex items-center group mt-1"
                >
                  <span className="absolute left-2 text-xl group-focus-within:animate-pulse transition-all opacity-80 group-focus-within:opacity-100">
                    🚀
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type 'help' for commands, or paste JSON/JWT/Base64..."
                    className="w-full bg-transparent border-none outline-none text-[#c0caf5] text-[13px] pl-10 pr-4 py-0.5 placeholder-white/20 transition-colors"
                    spellCheck="false"
                    autoComplete="off"
                  />
                </form>

                {/* Live Output Area */}
                <AnimatePresence>
                  {output && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden pl-10 pr-4"
                    >
                      <div className="text-[#a9b1d6] whitespace-pre-wrap overflow-x-auto text-[13px] leading-snug">
                        {output}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dummy div to scroll to bottom */}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
