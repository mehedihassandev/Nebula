import fs from 'fs';
import path from 'path';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SyntaxHighlighterAny = SyntaxHighlighter as any;

export default async function FileViewerPage({
  params
}: {
  params: Promise<{ name: string[] }>;
}) {
  const resolvedParams = await params;
  const filename = resolvedParams.name ? resolvedParams.name.join('/') : '';

  // Protect against directory traversal
  const safePath = path.normalize(filename).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(process.cwd(), safePath);

  let fileContent = '';
  let fileExists = true;

  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    fileExists = false;
    fileContent = `Error: File '${safePath}' not found.`;
  }

  // Determine language for syntax highlighting
  const ext = path.extname(safePath).toLowerCase();
  let language = 'text';
  if (ext === '.json') language = 'json';
  if (ext === '.ts' || ext === '.tsx') language = 'typescript';
  if (ext === '.js' || ext === '.jsx') language = 'javascript';
  if (ext === '.css') language = 'css';
  if (ext === '.html') language = 'html';

  return (
    <div className="flex-1 w-full h-full overflow-auto custom-scrollbar bg-[#1e1e1e]">
      {ext === '.md' ? (
        <div className="p-8 prose prose-invert max-w-4xl prose-headings:font-display prose-a:text-accent hover:prose-a:text-accent/80 prose-code:text-secondary prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-pre:bg-white/5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {fileContent}
          </ReactMarkdown>
        </div>
      ) : (
        <SyntaxHighlighterAny
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '24px',
            background: 'transparent',
            fontSize: '13px',
            lineHeight: '1.6',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
          }}
        >
          {fileContent}
        </SyntaxHighlighterAny>
      )}
    </div>
  );
}
