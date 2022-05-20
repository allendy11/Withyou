import React from "react";
import "../../../../css/editpage/canvas/modals/Message.css";
export default function ConfirmMessage({
  setItemStates,
  setIsConfirmMessage,
  setIsMessage,
}) {
  return (
    <div id="message-contaniner">
      <div id="message-modal">
        정말 삭제하시겠어요?
        <div id="message-modal-container">
          <button
            className="close-message-modal"
            onClick={() => {
              setIsMessage(false);
              setIsConfirmMessage(false);
            }}
          >
            아니요
          </button>
          <button
            className="close-message-modal"
            onClick={() => {
              setItemStates([]);
              setIsMessage(false);
              setIsConfirmMessage(false);
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
