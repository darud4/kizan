import Popup from "../../Popup/Popup";
import "./MultichoicePopup.css";

function MultichoicePopup({
  onClose,
  popupClass,
  list = [],
  titleText,
  selected,
  onClick,
}) {
  function handleClose() {
    const values = Object.keys(selected)
      .reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [])
      .sort();
    onClose(values);
  }

  return (
    <Popup popupClass={popupClass} onSubmit={handleClose} titleText={titleText}>
      <ul className="mcp-list">
        {list.map((item) => (
          <li
            className={`mcp-list__item ${
              selected[item.key] ? "mcp-list__item_selected" : ""
            }`}
            key={item.key}
            onClick={() => onClick(item.key)}
          >
            <div className="mcp-list__wrap">
              <h3 className="mcp-list__title">{item.key}</h3>
              {selected[item.key] && (
                <svg
                  className="mcp-list__checkmark"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path
                    stroke="#fff"
                    fill="#fff"
                    d="M28.41,7.82a3,3,0,0,0-4.24,0L13,19a1,1,0,0,1-1.41,0L8.47,15.86A3,3,0,1,0,4.22,20.1l6,6h0a3,3,0,0,0,4.24,0l14-14a3,3,0,0,0,0-4.24ZM27,10.65l-14,14a1,1,0,0,1-1.41,0l-6-6a1,1,0,0,1,0-1.41,1,1,0,0,1,1.41,0l3.13,3.13a3,3,0,0,0,4.24,0L25.58,9.24a1,1,0,0,1,1.41,0,1,1,0,0,1,0,1.41Z"
                  />
                </svg>
              )}
            </div>
            <span>{item.val}</span>
          </li>
        ))}
      </ul>
    </Popup>
  );
}

export default MultichoicePopup;
