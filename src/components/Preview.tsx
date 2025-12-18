interface PreviewProps {
  html: string;
}

export const Preview = ({ html }: PreviewProps) => {
  return (
    <div
      className="editor-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
