import "./InputWithDropdown.css";
import Dropdown from "./Dropdown/Dropdown";
import { useState, useEffect } from "react";

function InputWithDropdown({
  placeholder,
  name,
  inputClass,
  onChange,
  onSubmit,
  list = [],
  value,
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (list.length > 0) setDropdown(true);
  }, [list]);

  useEffect(() => {
    function handleClickClose({ target }) {
      if (!target.classList.contains("dropdown_active")) {
        setDropdown(false);
        setSelectedIndex(null);
      }
    }

    if (isDropdown) {
      document.addEventListener("click", handleClickClose);
    }
    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [isDropdown]);

  function moveDown() {
    setSelectedIndex((state) =>
      state === null ? 0 : Math.min(state + 1, list.length - 1)
    );
  }

  function moveUp() {
    setSelectedIndex((state) => (state === null ? 0 : Math.max(state - 1, 0)));
  }

  function hideDropdown() {
    setSelectedIndex(null);
    setDropdown(false);
  }

  function handleKeyDown(evt) {
    if (evt.key === "Enter" && list.length > 0 && selectedIndex !== null) {
      handleChoice(list[selectedIndex]);
      evt.preventDefault();
    }
    if (evt.key === "Escape" || evt.key === "Tab") hideDropdown();
    if (evt.key === "ArrowDown" && list.length > 0) {
      moveDown();
    }
    if (evt.key === "ArrowUp" && list.length > 0) {
      moveUp();
    }
  }

  function handleChoice(key) {
    if (key === null) return;
    onSubmit(key);
    hideDropdown();
  }

  function handleChange({ target }) {
    onChange && onChange(target.value);
  }

  function handleDropdownClick(val) {
    setDropdown(false);
    onSubmit(val);
  }

  function handleDropdownClose() {
    setDropdown(false);
  }

  return (
    <>
      <input
        placeholder={placeholder}
        name={name}
        onKeyDown={handleKeyDown}
        className={inputClass}
        onChange={handleChange}
        value={value}
        autoComplete="off"
      />
      {isDropdown > 0 && (
        <Dropdown
          items={list}
          onSubmit={handleDropdownClick}
          onClose={handleDropdownClose}
        />
      )}
    </>
  );
}

export default InputWithDropdown;
