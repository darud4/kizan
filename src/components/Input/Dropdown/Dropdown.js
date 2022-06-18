import "./Dropdown.css";

function Dropdown({ isVisible, items, onSubmit, selectedIndex, setSelected }) {
  function handleChoice(item) {
    if (onSubmit) onSubmit(item);
  }

  const handleMouseOver = (idx) => setSelected(idx);
  const handleMouseOut = () => setSelected(null);

  return (
    <ul className={`dropdown ${isVisible ? "dropdown_active" : ""}`}>
      {items.map((item, idx) => (
        <li
          className={`dropdown__item ${
            //            item.key === active ? "dropdown__item_active" : ""
            idx === selectedIndex ? "dropdown__item_active" : ""
          }`}
          key={idx}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseOut={handleMouseOut}
          onClick={() => handleChoice(item)}
        >
          {`${item.key}${item.val ? " - " + item.val : ""}`}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
