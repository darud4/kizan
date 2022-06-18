import "./Popup.css";
import { useEffect, useCallback } from "react";

function Popup({ popupClass = "", onSubmit, titleText, buttonText, ...props }) {
  
  const handleClose = useCallback(
    function handleClose() {
      if (onSubmit) onSubmit();
    },
    [onSubmit]
  );

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, [handleClose]);

  function handleCloseByClick(e) {
    const cl = popupClass || "popup";
    if (e.target.classList.contains(cl)) {
      handleClose();
    }
  }

  return (
    <div className={`popup ${popupClass}`} onClick={handleCloseByClick}>
      <div className="popup__container">
        {titleText && <h2 className="popup__title">{titleText}</h2>}
        {buttonText && (
          <button onClick={handleClose} className="popup__close" type="button">
            {buttonText}
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
