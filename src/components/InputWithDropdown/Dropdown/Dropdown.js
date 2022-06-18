import "./Dropdown.css";
import { useState, useEffect } from "react";

function Dropdown({ items, onSubmit, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    function handleKeyDown({ key }) {
      if (key === "ArrowDown") {
        setSelectedIndex((state) =>
          state === null ? 0 : Math.min(state + 1, items.length - 1)
        );
      }
      if (key === "ArrowUp") {
        setSelectedIndex((state) =>
          state === null ? 0 : Math.max(state - 1, 0)
        );
      }
      if (key === "Escape") onClose();
    }

    if (items.length > 0) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items, onClose]);

  function handleChoice(item) {
    if (onSubmit) onSubmit(item);
  }

  const handleMouseOver = (idx) => setSelectedIndex(idx);
  const handleMouseOut = () => setSelectedIndex(null);

  return (
    <ul className={`iwd__dropdown ${items.length > 0 ? "iwd__dropdown_active" : ""}`}>
      {items.map((item, idx) => (
        <li
          className={`iwd__dropdown__item ${
            //            item.key === active ? "dropdown__item_active" : ""
            idx === selectedIndex ? "iwd__dropdown__item_active" : ""
            }`}
          key={idx}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseOut={handleMouseOut}
          onClick={() => handleChoice(item)}
        >
          {`${item.key}${item.val && typeof item.val === "string" ? " - " + item.val : ""
            }`}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
