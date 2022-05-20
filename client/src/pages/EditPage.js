import React, { useState, useEffect } from "react";
import "../css/EditPage.css";
import PrintOnCanvas from "../components/editpage/canvas/modals/PrintOnCanvas";
import EditMenu from "../components/editpage/menu/EditMenu";
import EditMenuBar from "../components/editpage/menu/EditMenuBar";
import TopMenu from "../components/editpage/menu/TopMenu";
import PrintProperty from "../components/editpage/canvas/modals/PrintProperty";
export default function EditPage({
  setLandingOn,
  isLogin,
  setLoading,
  setIsMessage,
  setIsClientError,
  setIsSuccessMessage,
  setIsServerError,
  setIsConfirmMessage,
  itemStates,
  setItemStates,
}) {
  const [selectState, setSelectState] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [menuBtnStatus, setMenuBtnStatus] = useState("menuBar-templates");
  const [contemporaryZIndex, setcontemporaryZIndex] = useState(0);
  const [initLocation, setInitLocation] = useState({ x: 0, y: 0 });
  const [currentLocation, setCurrentLocation] = useState({ x: 0, y: 0 });
  const [currentId, setCurrentId] = useState({ id: "" });
  const [currentCanvasColor, setCurrentCanvasColor] = useState({
    hex: "#ffffff",
  });
  const { clientWidth } = document.body;
  const { outerWidth } = window;

  function onSelect(index) {
    setSelectState(true);
    const nextState = [...itemStates];
    nextState[index].isSelected = true;
    setcontemporaryZIndex(nextState[index].style.zIndex);
    setCurrentId(nextState[index].id);
    nextState[index].style.zIndex = 1000;
    setItemStates(nextState);
    getSelectedItemInfo();
  }

  function onDeselect(index) {
    setSelectState(false);
    const nextState = [...itemStates];
    nextState[index].isSelected = false;
    setCurrentId({ id: "" });
    nextState[index].style.zIndex = contemporaryZIndex;
    setItemStates(nextState);
  }

  function deSelectObject() {
    const index = itemStates.findIndex((el) => el.isSelected === true);
    if (index !== -1) {
      onDeselect(index);
    }
  }

  function getSelectedItemInfo() {
    const itemInfo = itemStates.filter((el) => el.isSelected === true);
    setSelectedItem(itemInfo.shift());
  }

  function resizeWidth(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.width = input;
    setItemStates(nextState);
  }

  function resizeHeight(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.height = input;
    setItemStates(nextState);
  }

  function rotateObject(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.transform = input;
    setItemStates(nextState);
  }

  function modifyZindex(input) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].style.zIndex = input;
    setcontemporaryZIndex(input);
  }

  function removeObject() {
    const removedItems = itemStates.filter((el) => el.isSelected !== true);
    setItemStates(removedItems);
    setSelectState(false);
  }

  function modifyText(newText) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].text = newText;
    setItemStates(nextState);
  }

  function modifyTextSize(newSize) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].textSize = newSize;
    setItemStates(nextState);
  }

  function modifyTextColor(newColor) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].textColor = { hex: newColor };
    setItemStates(nextState);
  }

  function modifyTextStyle(newTextStyle) {
    const nextState = [...itemStates];
    const targetIndex = itemStates.findIndex((el) => el.isSelected === true);
    nextState[targetIndex].textStyle = newTextStyle;
    setItemStates(nextState);
  }

  function setStyle(input, type, states, { width, height }) {
    if (type === "image") {
      return {
        id: makeId(),
        src: input,
        style: {
          type: type,
          position: "absolute",
          zIndex: 1,
          width: width / 12,
          height: height / 12,
          top: (height * 3) / 15,
          left: width / 5,
          transform: "rotate(0deg)",
        },
        isSelected: false,
        isDragging: false,
      };
    } else if (type === "templates") {
      return {
        id: makeId(),
        src: input,
        style: {
          type: type,
          position: "absolute",
          zIndex: 0,
          width: width / 2,
          height: height / 2,
          top: -3,
          left: -3,
          transform: "rotate(0deg)",
          opacity: "0.75",
        },
        isSelected: false,
        isDragging: false,
      };
    } else if (type === "text") {
      return {
        id: makeId(),
        text: input,
        textColor: { hex: "#000000" },
        textSize: 15,
        textStyle: "BinggraeMelona",
        style: {
          type: type,
          position: "absolute",
          zIndex: 1,
          top: (height * 3) / 20,
          left: width / 6,
          transform: "rotate(0deg)",
        },
        isSelected: false,
        isDragging: false,
      };
    }
  }

  function addToItems(input, type) {
    const canvas = document
      .querySelector("#canvas-paper")
      .getBoundingClientRect();
    setItemStates((prevState) => {
      if (outerWidth <= 450) {
        return [
          ...prevState,
          setStyle(input, type, itemStates, {
            width: canvas.width,
            height: canvas.height,
          }),
        ];
      } else if (clientWidth >= 900) {
        return [...prevState, setStyle(input, type, itemStates, canvas)];
      } else {
        return [
          ...prevState,
          setStyle(input, type, itemStates, {
            width: canvas.width * 2,
            height: canvas.height * 2,
          }),
        ];
      }
    });
  }

  function makeId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  function setMouseInitLocation(x, y) {
    setInitLocation({ x: x, y: y });
  }

  function setMouseCurrentLocation(x, y) {
    setCurrentLocation({ x: x, y: y });
  }

  function onclickToDeselect(e) {
    if (e.target.id !== currentId) {
      const index = itemStates.findIndex((el) => el.isSelected === true);
      if (index !== -1) {
        onDeselect(index);
      }
    }
  }

  window.onkeydown = (e) => {
    if (e.key === "Escape") {
      deSelectObject();
    }
  };

  function handleCanvasColor(newColor) {
    setCurrentCanvasColor(newColor);
  }

  useEffect(() => {
    setLandingOn(false);
  }, []);

  return (
    <>
      <div id="EditPage">
        <div id="edit-menu">
          <EditMenuBar
            setMenuBtnStatus={setMenuBtnStatus}
            setSelectState={setSelectState}
          />

          <EditMenu
            makeId={makeId}
            menuBtnStatus={menuBtnStatus}
            addToItems={addToItems}
            currentCanvasColor={currentCanvasColor}
            handleCanvasColor={handleCanvasColor}
            clientWidth={clientWidth}
            selectedItem={selectedItem}
            itemStates={itemStates}
            setItemStates={setItemStates}
          />
        </div>
        <div id="canvas">
          <div id="canvas-top-menu">
            <TopMenu
              isLogin={isLogin}
              deSelectObject={deSelectObject}
              setItemStates={setItemStates}
              setCurrentCanvasColor={setCurrentCanvasColor}
              setLoading={setLoading}
              setIsMessage={setIsMessage}
              setIsClientError={setIsClientError}
              setIsSuccessMessage={setIsSuccessMessage}
              setIsServerError={setIsServerError}
              setIsConfirmMessage={setIsConfirmMessage}
            />
          </div>
          <div id="canvas-container" onClick={(e) => onclickToDeselect(e)}>
            <div id="content"></div>
            <div
              id="canvas-paper"
              style={{ backgroundColor: currentCanvasColor.hex }}
            >
              {itemStates.map((el, i) => {
                return (
                  <PrintOnCanvas
                    key={el.id}
                    id={el.id}
                    src={el.src}
                    textColor={el.style.type === "text" && el.textColor.hex}
                    textSize={el.textSize}
                    textStyle={el.textStyle}
                    style={el.style}
                    isSelected={el.isSelected}
                    isDragging={el.isDragging}
                    onDragStart={() => {
                      const nextState = [...itemStates];
                      nextState[i].isDragging = true;
                      setItemStates(nextState);
                    }}
                    onDragEnd={() => {
                      const nextState = [...itemStates];
                      nextState[i].isDragging = false;
                      setItemStates(nextState);
                    }}
                    onSelect={() => onSelect(i)}
                    deSelectObject={deSelectObject}
                    onChangeStyle={(nextStyle) => {
                      const nextState = [...itemStates];
                      nextState[i].style = {
                        ...nextState[i].style,
                        ...nextStyle,
                      };
                      setItemStates(nextState);
                    }}
                    initLocation={initLocation}
                    setMouseInitLocation={setMouseInitLocation}
                    currentLocation={currentLocation}
                    setMouseCurrentLocation={setMouseCurrentLocation}
                    clientWidth={clientWidth}
                    modifyText={modifyText}
                  />
                );
              })}
            </div>
          </div>
          <div id="edit-footer-menu">
            {selectState ? (
              <PrintProperty
                key={selectedItem.id}
                id={selectedItem.id}
                type={selectedItem.style.type}
                width={selectedItem.style.width}
                resizeWidth={resizeWidth}
                height={selectedItem.style.height}
                resizeHeight={resizeHeight}
                transform={selectedItem.style.transform}
                rotateObject={rotateObject}
                removeObject={removeObject}
                zindex={contemporaryZIndex}
                modifyZindex={modifyZindex}
                clientWidth={clientWidth}
                textSize={selectedItem.textSize}
                textColor={
                  selectedItem.style.type === "text" &&
                  selectedItem.textColor.hex
                }
                textStyle={selectedItem.textStyle}
                modifyTextSize={modifyTextSize}
                modifyTextColor={modifyTextColor}
                modifyTextStyle={modifyTextStyle}
              />
            ) : (
              <div id="property-modal"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
