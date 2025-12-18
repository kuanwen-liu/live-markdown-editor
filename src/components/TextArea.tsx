interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextArea = ({ value, onChange }: TextAreaProps) => {
  return (
    <textarea
      className="editor-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing your markdown here..."
      spellCheck={false}
    />
  );
};
