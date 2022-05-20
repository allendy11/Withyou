import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/mypage/Mycard.css";
import Footer from "../Footer";
import addPage from "../../images/Add NewImg.png";
import axios from "axios";
import { loadingOn, loadingOff } from "../loading/Loading";
import dotenv from "dotenv";
dotenv.config();
axios.default.withCredentials = true;

const Mycard = ({ setLoading }) => {
  const accessToken = sessionStorage.getItem("accessTokenSession");
  const [cards, setCards] = useState([]);

  useEffect(async () => {
    if (accessToken) {
      try {
        await loadingOn(setLoading);
        const card = await axios.get(
          `${process.env.REACT_APP_SERVER_LOCAL_URL}/mycard`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const cardImage = card.data;
        setCards([...cardImage]);
        await loadingOff(setLoading);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const deleteCard = (card) => {
    axios.get(
      `${process.env.REACT_APP_SERVER_LOCAL_URL}/mycard/delete/${card.id}`
    );
    setCards(cards.filter((el) => el.id !== card.id));
  };
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  const handleClick = (idx, cardUrl) => {
    toDataURL(cardUrl, function (dataUrl) {
      let blobBin = atob(dataUrl.split(",")[1]);
      let array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "My card";
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };
  return (
    <div>
      <div className="mypage-title">⭐️ My Card</div>

      <div className="card-box-container">
        <div className="card-container">
          <Link to="/editpage">
            <img
              id="move-to-editpage"
              src={addPage}
              alt="card"
              download="card.png"
            />
          </Link>
        </div>
        {cards.map((el, idx) => (
          <div key={idx} className="card-container">
            <div id={`downloadImg${idx}`}>
              <img
                id={`myCard${idx}`}
                src={el.card}
                className="cardImg"
                alt="card"
                download="card.png"
              />
            </div>
            <div id="card-menu">
              <div
                className="card-download"
                onClick={() => handleClick(idx, el.card)}
              >
                다운로드
              </div>
              <div className="card-delete">
                <div
                  className="deleteCard"
                  key={idx}
                  onClick={() => {
                    deleteCard(el);
                  }}
                >
                  삭제
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Mycard;
