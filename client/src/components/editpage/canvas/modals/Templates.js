import React from "react";
import "../../../../css/editpage/canvas/modals/Templates.css";
import samples from "../../../../images/templates/AllTemplate";
import { loadingOn, loadingOff } from "../../../loading/Loading";
const data = samples;

export default function Templates({
  itemStates,
  addToItems,
  makeId,
  setItemStates,
}) {
  const templateIndex = itemStates.findIndex(
    (el) => el.style.type === "templates"
  );
  return (
    <div id="templates-modal">
      <div id="templates-modal-nav" className="edit--menu-title">
        <div id="title">템플릿</div>
        <div id="content">원하는 템플릿을 선택해주세요.</div>
      </div>
      <div id="templates-modal-upload">
        {data.map((el) => (
          <img
            key={makeId()}
            src={el.src}
            alt={el.src}
            onClick={() => {
              if (templateIndex >= 0) {
                const nextState = [...itemStates];
                nextState[templateIndex].src = el.src;
                setItemStates(nextState);
              } else {
                addToItems(el.src, "templates");
              }
            }}
          />
        ))}
      </div>
      <div id="size-box"></div>
    </div>
  );
}
