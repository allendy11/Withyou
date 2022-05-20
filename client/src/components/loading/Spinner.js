import React, { useRef } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "../../css/loading/Spinner.css";
const Spinner = () => {
  const spinnerRef = useRef();
  return (
    <div className="spinner-container">
      <div className="spinner-box" ref={spinnerRef}>
        <SyncLoader size="15px" margin="5px" color="salmon" />
      </div>
    </div>
  );
};

export default Spinner;
