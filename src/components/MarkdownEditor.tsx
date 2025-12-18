import { useState, useEffect } from 'react';
import { TextArea } from './TextArea';
import { Preview } from './Preview';
import { EditorToolbar } from './EditorToolbar';
import { parseMarkdown } from '../utils/markdownParser';
import { sanitizeHtml } from '../utils/sanitizer';
import { SAMPLE_MARKDOWN } from '../utils/sampleMarkdown';
import 'highlight.js/styles/github.css';
import '../styles/MarkdownEditor.css';

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [html, setHtml] = useState<string>('');

  // Real-time parsing: markdown -> HTML -> sanitized HTML
  useEffect(() => {
    const parsed = parseMarkdown(markdown);
    const sanitized = sanitizeHtml(parsed);
    setHtml(sanitized);
  }, [markdown]);

  // Sample button handler: Replace all content with sample markdown
  const handleSample = () => {
    setMarkdown(SAMPLE_MARKDOWN);
  };

  // Download HTML button handler: Create and download complete HTML file
  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/github.min.css">
  <style>
    body {
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    pre {
      background: #f6f8fa;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      background: #f6f8fa;
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
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f6f8fa;
      font-weight: 600;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 1em 0;
      padding-left: 1em;
      color: #666;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    h1 {
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3em;
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
    a.download = `markdown-export-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="markdown-editor">
      <EditorToolbar onSample={handleSample} onDownload={handleDownload} />
      <div className="editor-content">
        <TextArea value={markdown} onChange={setMarkdown} />
        <Preview html={html} />
      </div>
    </div>
  );
};
