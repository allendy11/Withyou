import React from "react";
import "../../../../css/editpage/canvas/modals/Elements.css";
import samples from "../../../../images/elements/AllElements";

export default function Elements({ addToItems, makeId }) {
  return (
    <div id="elements-modal">
      <div id="elements-modal-nav" className="edit--menu-title">
        <div id="title">이것저것</div>
        <div id="content">원하는 것들을 선택해주세요.</div>
      </div>

      <div id="elements-modal-upload">
        {samples.map((el) => (
          <img
            key={makeId()}
            src={el.src}
            alt={el.src}
            onClick={() => {
              addToItems(el.src, "image");
            }}
          />
        ))}
      </div>
    </div>
  );
}
