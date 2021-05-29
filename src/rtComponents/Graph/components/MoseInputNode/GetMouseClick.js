import { useState, useEffect } from "react";

const GetMouseClick = () => {
  const [clicked, setClicked] = useState({clicked:false});

  const updateDown = (event:MouseEvent) => {
    setClicked({clicked:true});
  };

  const updateUp = (event:MouseEvent) => {
    setClicked({clicked:false});
  };

  useEffect(() => {
    document.addEventListener("mousedown", updateDown, false);
    document.addEventListener("mouseup", updateUp, false);

    return () => {
      document.removeEventListener("mousedown", updateDown);
      document.removeEventListener("mouseup", updateUp);
    };
  });

  return clicked;
};

export default GetMouseClick;