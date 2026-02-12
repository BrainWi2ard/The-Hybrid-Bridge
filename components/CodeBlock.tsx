
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'powershell' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg bg-slate-900 border border-slate-700 my-4">
      <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700 bg-slate-800/50 rounded-t-lg">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-blue-600 transition-colors text-slate-200"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm mono text-emerald-400">
        <code>{code}</code>
      </pre>
    </div>
  );
};
