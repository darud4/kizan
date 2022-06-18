import "./Switch.css";
import { useState, useEffect } from "react";

function Switch({
  name,
  isFocused,
  labelClass,
  labelText,
  value = ["", ""],
  onChange,
  offValue = ["", ""],
  onValue = ["", ""],
  disabled,
  initialChecked = false,
}) {
  const [code, caption] = value;
  const [onCode, onCaption] = onValue;
  const [offCode, offCaption] = caption ? value : offValue;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (initialChecked) {
      setChecked(true);
      onChange(name, onCode);
    }
  }, [initialChecked]);

  function toggleStatus({ target }) {
    setChecked(target.checked);
    onChange && onChange(name, target.checked ? onCode : offCode);
  }


  return (
    <div className={`${labelClass || ""}`}>
      {labelText}
      <label
        className={`switch ${isFocused ? "switch_active" : ""} ${
          disabled ? "switch_disabled" : ""
        }`}
      >
        <label
          className={`switch__group ${checked ? "switch__group_checked" : ""}`}
        >
          <input
            type="checkbox"
            name={name}
            className="switch__checkbox"
            checked={checked}
            onChange={toggleStatus}
            disabled={disabled}
          />
          <span className={`switch__label switch__label_left `}>
            {offCaption}
          </span>
          <div className="switch__lever"></div>
          <span className={`switch__label switch__label_right `}>
            {onCaption}
          </span>
        </label>
      </label>
    </div>
  );
}

export default Switch;
