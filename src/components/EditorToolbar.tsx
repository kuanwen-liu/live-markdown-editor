interface EditorToolbarProps {
  onSample: () => void;
  onDownload: () => void;
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

export const EditorToolbar = ({
  onSample,
  onDownload,
  onThemeToggle,
  currentTheme
}: EditorToolbarProps) => {
  return (
    <div className="editor-toolbar">
      <button onClick={onSample} className="toolbar-button">
        Sample
      </button>
      <button onClick={onDownload} className="toolbar-button">
        Download HTML
      </button>
      <button
        onClick={onThemeToggle}
        className="toolbar-button theme-toggle"
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {currentTheme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};
