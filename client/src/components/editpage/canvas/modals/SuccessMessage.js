import React from "react";
import "../../../../css/editpage/canvas/modals/Message.css";
export default function SuccessMessage({ setIsSuccessMessage, setIsMessage }) {
  return (
    <div id="message-contaniner">
      <div id="message-modal">
        서버에 저장하였습니다.
        <br /> MyPage에서 확인해주세요.
        <br />
        <div id="message-modal-container">
          <button
            className="close-message-modal"
            onClick={() => {
              setIsMessage(false);
              setIsSuccessMessage(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
