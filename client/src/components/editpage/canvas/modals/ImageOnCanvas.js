export default function ImageOnCanvas({
  id,
  src,
  style,
  isSelected,
  isDragging,
  onMove,
  setOnMove,
  setObjectStyle,
  onClickObjcet,
  setMouseInitLocation,
  onDragAndDrop,
  controlCursorStyle,
  onDragEnd,
  onDragAndDropMobile,
  opacityOnObject,
}) {
  const { width, height } = style;
  // const newWitdh = width >= height ? width : height;
  const newWitdh = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * 0.8;
  const newStyle = {
    ...style,
    width: newWitdh,
    height: newWitdh,
    display: "flex",
    alignItems: "center",
  };
  return (
    <div
      style={setObjectStyle(newStyle, isSelected)}
      onMouseDown={(e) => {
        setOnMove(true);
        onClickObjcet(e);
        setMouseInitLocation(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const target = e.touches[0];
        onClickObjcet(e);
        setMouseInitLocation(target.clientX, target.clientY);
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          onDragAndDrop(e);
        }
      }}
      onMouseUp={(e) => {
        setOnMove(false);
        controlCursorStyle(e, "grab");
        onDragEnd();
      }}
      onTouchEnd={(e) => {
        controlCursorStyle(e, "grab");
        onDragEnd();
        document.body.style.overflow = null;
      }}
      onTouchMove={(e) => {
        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;
        if (isDragging) {
          onDragAndDropMobile(e.touches[0]);
        }
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
        opacityOnObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        opacityOnObject(e, 1);
        if (onMove) {
          onDragAndDrop(e);
        }
      }}
    >
      <img
        key={id}
        id={id}
        className="image-element"
        draggable={false}
        src={src}
        style={{
          width: style.width,
          height: style.height,
          transform: style.transform,
        }}
      />
    </div>
  );
}
