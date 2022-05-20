import React from "react";
import html2canvse from "html2canvas";

export default function DownLoad({
  deSelectObject,
  setIsClientError,
  setIsMessage,
}) {
  async function download() {
    await deSelectObject();
    try {
      await html2canvse(document.querySelector("#canvas-paper"))
        .then((canvas) => {
          const myImage = canvas.toDataURL("image/png");
          if (document.body.clientWidth < 900) {
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
          }
          let el = document.createElement("a");
          el.href = myImage;
          el.download = "My Card.png";
          el.click();
          el.remove();
        })
        .catch((err) => {
          setIsMessage(true);
          setIsClientError(true);
        });
    } catch {
      setIsMessage(true);
      setIsClientError(true);
    }
  }
  return (
    <div id="download" onClick={() => download()}>
      다운로드
    </div>
  );
}
