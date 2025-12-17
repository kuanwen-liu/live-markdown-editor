import DOMPurify from 'dompurify';

/**
 * Sanitize HTML to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      // Headers
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Text formatting
      'p', 'br', 'strong', 'em', 'u', 'del', 'span',
      // Links and media
      'a', 'img',
      // Code
      'code', 'pre',
      // Lists
      'ul', 'ol', 'li',
      // Other
      'blockquote', 'hr',
      // Tables
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      // Divs for structure
      'div',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id',
    ],
    ALLOW_DATA_ATTR: false,
    // Ensure links are safe
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
};
