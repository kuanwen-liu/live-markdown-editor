import { useState, useEffect } from 'react';
import { TextArea } from './TextArea';
import { Preview } from './Preview';
import { EditorToolbar } from './EditorToolbar';
import { parseMarkdown } from '../utils/markdownParser';
import { sanitizeHtml } from '../utils/sanitizer';
import { SAMPLE_MARKDOWN } from '../utils/sampleMarkdown';
import '../styles/MarkdownEditor.css';

type Theme = 'light' | 'dark';

const useTheme = () => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem('markdown-editor-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('markdown-editor-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('markdown-editor-theme', newTheme);
  };

  return { theme, toggleTheme };
};

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const { theme, toggleTheme } = useTheme();

  // Real-time parsing: markdown -> HTML -> sanitized HTML
  useEffect(() => {
    const parsed = parseMarkdown(markdown);
    const sanitized = sanitizeHtml(parsed);
    setHtml(sanitized);
  }, [markdown]);

  // Dynamic highlight.js theme loading
  useEffect(() => {
    const themeFile = theme === 'light' ? 'github.css' : 'github-dark.css';
    const existingLink = document.querySelector('link[data-highlight-theme]');
    if (existingLink) existingLink.remove();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/${themeFile}`;
    link.setAttribute('data-highlight-theme', 'true');
    document.head.appendChild(link);

    return () => {
      const linkToRemove = document.querySelector('link[data-highlight-theme]');
      if (linkToRemove) linkToRemove.remove();
    };
  }, [theme]);

  // Sample button handler: Replace all content with sample markdown
  const handleSample = () => {
    setMarkdown(SAMPLE_MARKDOWN);
  };

  // Download HTML button handler: Create and download complete HTML file
  const handleDownload = () => {
    // Theme-specific styles
    const lightTheme = {
      highlightCss: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/github.min.css',
      bodyColor: '#333',
      bodyBg: '#ffffff',
      codeBg: '#f6f8fa',
      thBg: '#f6f8fa',
      borderColor: '#ddd',
      blockquoteBorder: '#ddd',
      blockquoteColor: '#666',
      h1Border: '#eee',
      linkColor: '#0366d6'
    };

    const darkTheme = {
      highlightCss: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/github-dark.min.css',
      bodyColor: '#c9d1d9',
      bodyBg: '#0d1117',
      codeBg: '#161b22',
      thBg: '#161b22',
      borderColor: '#30363d',
      blockquoteBorder: '#30363d',
      blockquoteColor: '#8b949e',
      h1Border: '#21262d',
      linkColor: '#58a6ff'
    };

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <link rel="stylesheet" href="${currentTheme.highlightCss}">
  <style>
    body {
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: ${currentTheme.bodyColor};
      background-color: ${currentTheme.bodyBg};
    }
    pre {
      background: ${currentTheme.codeBg};
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      background: ${currentTheme.codeBg};
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
    }
    pre code {
      background: none;
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid ${currentTheme.borderColor};
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: ${currentTheme.thBg};
      font-weight: 600;
    }
    blockquote {
      border-left: 4px solid ${currentTheme.blockquoteBorder};
      margin: 1em 0;
      padding-left: 1em;
      color: ${currentTheme.blockquoteColor};
    }
    img {
      max-width: 100%;
      height: auto;
    }
    h1 {
      border-bottom: 1px solid ${currentTheme.h1Border};
      padding-bottom: 0.3em;
    }
    a {
      color: ${currentTheme.linkColor};
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `markdown-export-${theme}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="markdown-editor">
      <EditorToolbar
        onSample={handleSample}
        onDownload={handleDownload}
        onThemeToggle={toggleTheme}
        currentTheme={theme}
      />
      <div className="editor-content">
        <TextArea value={markdown} onChange={setMarkdown} />
        <Preview html={html} />
      </div>
    </div>
  );
};
