interface EditorToolbarProps {
  onSample: () => void;
  onDownload: () => void;
}

export const EditorToolbar = ({ onSample, onDownload }: EditorToolbarProps) => {
  return (
    <div className="editor-toolbar">
      <button onClick={onSample} className="toolbar-button">
        Sample
      </button>
      <button onClick={onDownload} className="toolbar-button">
        Download HTML
      </button>
    </div>
  );
};
