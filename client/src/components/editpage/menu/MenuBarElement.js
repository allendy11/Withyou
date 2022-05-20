import React from "react";

export default function MenuBarElement({
  id,
  className,
  imgId,
  imgClassName,
  imgAlt,
  src,
  handleClick,
}) {
  return (
    <div id={id} className={className} onClick={() => handleClick(imgId)}>
      {<img id={imgId} className={imgClassName} alt={imgAlt} src={src} />}
    </div>
  );
}
