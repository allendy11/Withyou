import React, { useState } from "react";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";

export default function TextColor({ textColor, modifyTextColor, clientWidth }) {
  const [onColorPicker, setOnColorPicker] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState(textColor);
  const styles = reactCSS({
    default: {
      swatch: {
        width: `${clientWidth >= 900 ? "5vw" : "7vw"}`,
        height: `${clientWidth >= 900 ? "2.7vh" : "2.7vh"}`,
        background: currentTextColor,
        borderRadius: "0.5rem",
        display: "inline-block",
        cursor: "pointer",
      },
      palette: {
        position: "absolute",
        top: clientWidth >= 900 ? "60vh" : "30vh",
        left: "20vw",
        zIndex: "1000",
      },
      selected: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const mobileStyle = reactCSS({
    default: {
      swatch: {
        width: "10vw",
        height: "2vh",
        background: currentTextColor,
        borderRadius: "0.5rem",
        display: "inline-block",
        cursor: "pointer",
      },
      palette: {
        position: "fixed",
        top: `48vh`,
        left: `20vw`,
        zIndex: "2",
      },
    },
  });

  return (
    <div id="control-color">
      <div>색상</div>
      <div className="object-button-area">
        <div
          style={window.outerWidth >= 450 ? styles.swatch : mobileStyle.swatch}
          onClick={(e) => {
            setOnColorPicker(!onColorPicker);
          }}
        ></div>
        {onColorPicker && (
          <div
            style={
              window.outerWidth >= 450 ? styles.palette : mobileStyle.palette
            }
          >
            <div
              style={styles.selected}
              onClick={() => setOnColorPicker(!onColorPicker)}
            />
            <ChromePicker
              disableAlpha={true}
              color={currentTextColor}
              onChange={(color) => {
                setCurrentTextColor(color.hex);
                modifyTextColor(color.hex);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
