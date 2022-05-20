import React from "react";
import "../../../css/editpage/menu/EditMenuBar.css";
import templateImg from "../../../images/template.png";
import elementsImg from "../../../images/elements.png";
import imageImg from "../../../images/image.png";
import textImg from "../../../images/text.png";
import MenuBarElement from "./MenuBarElement";

export default function EditMenuBar({ setMenuBtnStatus, setSelectState }) {
  const handleClick = (id) => {
    setMenuBtnStatus(id);
    setSelectState(false);
  };

  const content = [
    { name: "templates", src: templateImg },
    { name: "elements", src: elementsImg },
    { name: "image", src: imageImg },
    { name: "text", src: textImg },
  ];

  const menus = content.map((el) => {
    return {
      id: `menuBar-${el.name}-box`,
      imgId: `menuBar-${el.name}`,
      imgAlt: `${el.name}Img`,
      src: el.src,
    };
  });
  const className = "menubar-btn";
  const imgClassName = "edit-button";

  return (
    <div id="menuBar-container">
      {menus.map((el, index) => (
        <MenuBarElement
          id={el.id}
          key={index}
          className={className}
          imgId={el.imgId}
          imgClassName={imgClassName}
          imgAlt={el.imgAlt}
          src={el.src}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
