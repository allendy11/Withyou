export default function TemplateOnCanvas({ id, src, style, setObjectStyle }) {
  return (
    <img
      key={id}
      id={id}
      className="image-element"
      draggable={false}
      src={src}
      style={setObjectStyle(style)}
    />
  );
}
