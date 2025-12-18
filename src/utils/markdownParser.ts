import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked options
marked.setOptions({
  gfm: true,           // GitHub Flavored Markdown
  breaks: true,        // Convert \n to <br>
});

// Custom renderer for syntax highlighting
const renderer = new marked.Renderer();

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const highlighted = hljs.highlight(text, { language: lang }).value;
      return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
    } catch (err) {
      console.error('Highlight error:', err);
    }
  }

  // Auto-detect language if not specified
  try {
    const highlighted = hljs.highlightAuto(text).value;
    return `<pre><code class="hljs">${highlighted}</code></pre>`;
  } catch (err) {
    console.error('Auto-highlight error:', err);
  }

  // Fallback to default rendering
  return `<pre><code>${text}</code></pre>`;
};

marked.setOptions({ renderer });

/**
 * Parse markdown string to HTML
 * @param markdown - The markdown string to parse
 * @returns Parsed HTML string
 */
export const parseMarkdown = (markdown: string): string => {
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return '<p>Error parsing markdown</p>';
  }
};
