# Live Markdown Editor

A real-time markdown editor built with React, TypeScript, and Vite. Features a split-screen interface with instant preview, syntax highlighting, dark mode support, and HTML export functionality.

## Features

### Core Functionality
- **Real-time Preview**: See your markdown rendered as you type
- **Split-Screen Layout**: Textarea on the left (50%), rendered preview on the right (50%)
- **Syntax Highlighting**: Code blocks are highlighted with language-specific colors using highlight.js
- **Sample Content**: Quick-load a markdown syntax cheatsheet with one click
- **HTML Export**: Download your rendered markdown as a standalone HTML file

### Dark Mode
- **Auto-Detection**: Automatically detects and applies your system's dark mode preference
- **Manual Toggle**: Switch between light and dark themes with the 🌙/☀️ button
- **Persistence**: Manual theme choice is saved and restored across sessions
- **Theme-Aware Export**: Downloaded HTML files respect the current theme

### Security
- **XSS Protection**: All HTML is sanitized with DOMPurify before rendering
- **Safe Markdown Parsing**: Uses marked.js with security-focused configuration

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **marked.js** - Markdown to HTML conversion
- **DOMPurify** - HTML sanitization
- **highlight.js** - Syntax highlighting

## Getting Started

### Prerequisites
- Node.js (v20 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd live-markdown-editor

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Usage

1. **Write Markdown**: Type your markdown content in the left pane
2. **See Results**: The right pane shows the rendered HTML in real-time
3. **Toggle Theme**: Click the 🌙 (moon) or ☀️ (sun) icon to switch between light and dark modes
4. **Load Sample**: Click "Sample" to populate the editor with a markdown syntax cheatsheet
5. **Export HTML**: Click "Download HTML" to save the rendered content as an `.html` file

## Supported Markdown Features

- Headers (H1-H6)
- Text formatting (bold, italic, strikethrough)
- Lists (ordered, unordered, nested)
- Links and images
- Inline code and code blocks
- Tables
- Blockquotes
- Horizontal rules
- GitHub Flavored Markdown (GFM)

## Project Structure

```
src/
├── components/
│   ├── MarkdownEditor.tsx    # Main editor component with theme management
│   ├── EditorToolbar.tsx     # Toolbar with Sample, Download, and Theme toggle
│   ├── TextArea.tsx          # Left pane markdown input
│   └── Preview.tsx           # Right pane HTML preview
├── utils/
│   ├── markdownParser.ts     # marked.js configuration
│   ├── sanitizer.ts          # DOMPurify configuration
│   └── sampleMarkdown.ts     # Sample markdown content
├── styles/
│   └── MarkdownEditor.css    # Theme variables and component styles
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## Theme System

The app uses CSS custom properties for theming:

- Light theme: GitHub-inspired colors
- Dark theme: GitHub Dark colors
- System preference detection via `prefers-color-scheme`
- Manual override with localStorage persistence

## Development

```bash
# Run dev server with HMR
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npm run build
```

## License

MIT
