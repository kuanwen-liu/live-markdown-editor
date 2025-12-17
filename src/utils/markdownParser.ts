import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked options
marked.setOptions({
  gfm: true,           // GitHub Flavored Markdown
  breaks: true,        // Convert \n to <br>
});

// Custom renderer for syntax highlighting
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);

renderer.code = function(code: string, language: string | undefined) {
  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(code, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    } catch (err) {
      console.error('Highlight error:', err);
    }
  }

  // Auto-detect language if not specified
  try {
    const highlighted = hljs.highlightAuto(code).value;
    return `<pre><code class="hljs">${highlighted}</code></pre>`;
  } catch (err) {
    console.error('Auto-highlight error:', err);
  }

  // Fallback to original renderer
  return originalCodeRenderer(code, language);
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
