import React from "react";
import "../../../../css/editpage/canvas/modals/Message.css";
export default function ServerErrorMessage({ setIsServerError, setIsMessage }) {
  return (
    <div id="message-contaniner">
      <div id="message-modal">
        죄송합니다. 오류가 발생했어요.
        <br />
        문제를 수정중이에요.
        <div id="message-modal-container">
          <button
            className="close-message-modal"
            onClick={() => {
              setIsMessage(false);
              setIsServerError(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
