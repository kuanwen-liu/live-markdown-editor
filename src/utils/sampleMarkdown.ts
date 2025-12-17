export const SAMPLE_MARKDOWN = `# Markdown Cheatsheet

Welcome to the Live Markdown Editor! This cheatsheet demonstrates all the supported markdown syntax.

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Text Formatting

**Bold text** or __bold text__

*Italic text* or _italic text_

***Bold and italic*** or ___bold and italic___

~~Strikethrough text~~

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deep nested item 2.2.1
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item
   1. Nested item 3.1
   2. Nested item 3.2
4. Fourth item

### Task List
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Links and Images

[Link to Google](https://www.google.com)

[Link with title](https://www.github.com "GitHub")

![Placeholder Image](https://via.placeholder.com/400x200)

## Code

Inline \`code\` looks like this.

### Code Blocks with Syntax Highlighting

JavaScript:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

greet('World');
\`\`\`

Python:
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

HTML:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
\`\`\`

CSS:
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
\`\`\`

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✓ | H1-H6 |
| Lists | ✓ | Ordered & Unordered |
| Code | ✓ | Syntax Highlighting |
| Tables | ✓ | GitHub Flavored |
| Images | ✓ | External URLs |

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also supported.

## Horizontal Rule

You can create a horizontal rule with three or more hyphens, asterisks, or underscores:

---

## Emphasis

You can combine **bold and _italic_** text.

You can also use ~~strikethrough with **bold**~~ text.

## Escaping

You can escape special characters with a backslash: \\* \\_ \\# \\[ \\]

---

**Try editing this text to see the live preview in action!**
`;
