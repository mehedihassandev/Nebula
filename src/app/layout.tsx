import './globals.css';
import '../App.css';
import { Layout } from '@components/ClientLayout';
import { Providers } from './providers';
import { Inter, Outfit, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  title: 'Md. Mehedi Hassan | Frontend Engineer',
  description:
    'Portfolio of Md. Mehedi Hassan, an experienced Frontend Engineer specializing in React, React Native, and building robust enterprise software.',
  openGraph: {
    title: 'Md. Mehedi Hassan | Software Engineer',
    description:
      'Portfolio of Md. Mehedi Hassan, an experienced Frontend Engineer specializing in React, React Native, and building robust enterprise software.',
    siteName: 'Md. Mehedi Hassan Portfolio',
    type: 'website'
  }
};

/**
 * RootLayout acts as the global wrapper for the entire Next.js application.
 * We use this to inject global providers, overarching layout components,
 * and standard HTML boilerplate necessary for rendering the app.
 *
 * @param children - The page components rendered within the layout context.
 * @returns The root HTML document containing the app structure.
 */
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${firaCode.variable} font-sans antialiased`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
