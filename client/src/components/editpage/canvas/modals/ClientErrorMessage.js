import React from "react";
import "../../../../css/editpage/canvas/modals/Message.css";
export default function ClientErrorMessage({ setIsClientError, setIsMessage }) {
  return (
    <div id="message-contaniner">
      <div id="message-modal">
        로그인 후 이용해주세요
        <div id="message-modal-container">
          <button
            className="close-message-modal"
            onClick={() => {
              setIsMessage(false);
              setIsClientError(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
