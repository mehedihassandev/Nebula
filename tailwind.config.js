/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        panel: "var(--bg-secondary)",
        surface: "var(--bg-surface)",
        hover: "var(--bg-hover)",
        border: "var(--border-primary)",
        textColor: "var(--text-primary)",
        textMuted: "var(--text-secondary)",
        textActive: "var(--text-active)",
        secondary: "var(--accent)",
        accent: "var(--accent)",
        accentGreen: "var(--accent-green)",
        accentPurple: "var(--accent-purple)",
        accentRed: "var(--accent-red)",
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        // Fallbacks for transition, will be removed later
        saira: ['var(--font-sans)', 'sans-serif'],
        syne: ['var(--font-display)', 'sans-serif'],
        poppins: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
