import "./Item.css";

function Item({ text, id, onDelete, listStyle, disabled }) {
  const cl =
    listStyle === "vertical" ? "multichoice-item__text_style_vertical" : "";

  return (
    <li className="multichoice-item">
      <span className={`multichoice-item__text ${cl}`}>{text}</span>
      {!disabled && (
        <button
          tabIndex="-1"
          onClick={() => onDelete(id)}
          className="multichoice-item__close"
          type="button"
        >
          x
        </button>
      )}
    </li>
  );
}

export default Item;
