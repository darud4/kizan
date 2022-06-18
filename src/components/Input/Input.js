import "./Input.css";
import { useState, useEffect } from "react";
import Item from "./Item/Item";
import MultichoicePopup from "./MultichoicePopup/MultichoicePopup";
import Dropdown from "./Dropdown/Dropdown";

function Input({
  multichoice = false,
  multichoiceStyle = "horizontal",
  titleText,
  placeholder,
  separators = ["Tab"],
  list = [],
  popupClass = "multichoice-popup",
  onChange,
  name,
  onFocus,
  labelText,
  inputType,
  labelClass = "",
  inputClass = "multichoice__input",
  wrapClass = "multichoice__input-wrap",
  needButton = true,
  value,
  defaultValue,
  validate = {},
  listToInput = "",
  onDropdownChoice,
  disabled = false,
}) {
  const [isPopup, setPopup] = useState(false);
  const [selected, setSelected] = useState({});
  const [resultValue, setResultValue] = useState("");
  const [isActive, setActive] = useState(false);
  const [valid, setValid] = useState(0);

  const [isDropdown, setDropdown] = useState(false);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [visibleValue, setVisibleValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      onChange && onChange(name, defaultValue);}
  }, [defaultValue]);

  useEffect(() => {
    if (multichoice && value && typeof value === "object") {
      setSelected(JSON.parse(JSON.stringify(value)));
    }
  }, [value, multichoice]);

  useEffect(() => {
    function handleClickClose({ target }) {
      if (!target.classList.contains("dropdown_active")) {
        setDropdown(false);
        setActiveItem(null);
        setItems([]);
      }
    }

    if (isDropdown) {
      document.addEventListener("click", handleClickClose);
    }
    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [isDropdown]);

  function handleFocus() {
    setActive(true);
    onFocus && onFocus();
  }

  function handleBlur({ target }) {
    setActive(false);
    if (multichoice && target.value) {
      handleItemClick(target.value);
      validateInput(target.value);
      setVisibleValue("");
      hideDropdown();
    }
  }

  const getResult = (o) => Object.keys(o).sort().join(";");

  function handleInvalidInput(id) {}

  function handleItemClick(id) {
    const tempSelected = { ...selected };
    if (list.length === 0) {
      tempSelected[id] = id;
    } else {
      const selectedItem = list.find((item) => item.key === id);
      if (!selectedItem) {
        handleInvalidInput(id);
        return;
      }
      if (selected[id]) delete tempSelected[id];
      else tempSelected[id] = selectedItem.val || id;
    }
    setSelected(tempSelected);
    onChange && onChange(name, tempSelected);
    setResultValue(getResult(tempSelected));
  }

  function deleteValue(id) {
    const tempSelected = { ...selected };
    delete tempSelected[id];
    setSelected(tempSelected);
    onChange && onChange(name, tempSelected);
    setResultValue(getResult(tempSelected));
    validateInput(tempSelected);
  }

  function openPopup() {
    setPopup(true);
  }

  function handleClose() {
    setPopup(false);
  }

  function handleKeyDown(evt) {
    if (evt.key === "Enter" && items.length === 0) {
    }
    if (evt.key === "Enter" && items.length > 0 && activeItem !== null) {
      handleChoice(items[activeItem]);
    }
    if (evt.key === "Escape" || evt.key === "Tab") hideDropdown();
    if (evt.key === "ArrowDown" && items.length === 0) {
      handleChange(evt);
    }
    if (evt.key === "ArrowDown" && items.length > 0) {
      moveDown();
    }
    if (evt.key === "ArrowUp" && items.length > 0) {
      moveUp();
    }
    if (multichoice && separators.includes(evt.key) && evt.target.value) {
      evt.preventDefault();
      handleItemClick(evt.target.value);
      validateInput(evt.target.value);
      setVisibleValue("");
      hideDropdown();
    }
  }

  function handleChoice(item) {
    const key = item && typeof item !== "object" ? item : item.key;
    setActive(true);
    if (key === null) return;
    if (multichoice) {
      handleItemClick(key);
      onChange(name, "");
      setVisibleValue("");
    } else {
      const cap = getCaption(key);
      validateInput(key);
      !item.noOnChange && onChange && onChange(name, cap);
      onDropdownChoice && onDropdownChoice(name, item);
    }
    hideDropdown();
  }

  function getCaption(code) {
    if (list.length === 0 || !code) return code;
    const foundItem = list.find((item) => item.key === code);
    if (!foundItem) return;
    const { key, val } = foundItem;
    return val && listToInput !== "key only" ? `${key} - ${val}` : key;
  }

  function moveDown() {
    const newIndex =
      activeItem === null ? 0 : Math.min(activeItem + 1, items.length - 1);
    setActiveItem(newIndex);
  }

  function moveUp() {
    const newIndex = activeItem === null ? 0 : Math.max(activeItem - 1, 0);
    setActiveItem(newIndex);
  }

  function hideDropdown() {
    setItems([]);
    setActiveItem(null);
    setDropdown(false);
  }

  function searchWords(where, what) {
    const whereArr = where.key
      .split(/[\s-]/)
      .concat(where.val?.split(/[\s-]/))
      .filter((x) => x);
    const whatArr = what.split(" ").filter((x) => x);
    if (whereArr.length < 2 || whatArr.length < 2) return false;
    const result = whatArr.every((word) =>
      whereArr.find((whereWord) =>
        whereWord.toLowerCase().startsWith(word.toLowerCase())
      )
    );
    return result;
  }

  function filterDropdown(input) {
    const value = typeof input === "string" ? input.toLowerCase() : null;
    if (list.length > 0) {
      const filtered = list.filter((item) => {
        const regexp = new RegExp("[^а-я]" + value, "i");
        return (
          !value ||
          searchWords(item, value) ||
          item.key.toLowerCase().startsWith(value) ||
          (item.val && item.val.toLowerCase().includes(value)) ||
          regexp.test(item.key)
        );
      });
      return filtered;
    }
  }

  function showDropdown(filtered) {
    if (!filtered) return;
    setItems([...filtered]);
    setDropdown(filtered.length > 0);
    setActiveItem(null);
  }

  const setInputValid = () => setValid(1);
  const setInputInvalid = () => setValid(2);

  function validateType(value) {
    return validate.type === "number" && value.match(/^[0-9]+$/) !== null;
  }

  function validateInput(value) {
    const res =
      (validate.type && value && !validateType(value)) ||
      (validate.listOnly && list.length > 0 && value && !getCaption(value)) ||
      (validate.required !== undefined &&
        !multichoice &&
        validate.required &&
        !value) ||
      (validate.required !== undefined &&
        multichoice &&
        Object.keys(value).length === 0) ||
      (validate.min !== undefined && validate.min > value.length) ||
      (validate.max !== undefined && validate.max < value.length);
    if (res) setInputInvalid();
    else setInputValid();
  }

  async function handleChange({ target }) {
    const val = target.value;
    setVisibleValue(val);
    const dropdown = !multichoice && (await onChange(name, val));
    const dropdownContent = dropdown ? dropdown : filterDropdown(val);
    showDropdown(dropdownContent);
    if (Object.keys(validate).length && !multichoice) validateInput(val);
  }

  const cl =
    multichoiceStyle === "horizontal" ? "" : "multichoice__list_style_vertical";

  const wrapValid =
    valid === 0
      ? ""
      : valid === 1
      ? "multichoice__input-wrap_valid"
      : "multichoice__input-wrap_invalid";

  return (
    <>
      <label className={`${labelClass}`}>
        {labelText}
        <input type="hidden" value={resultValue} name={name} />
        <div className="multichoice">
          <div
            className={`${wrapClass} ${
              isActive ? wrapClass + "_active" : ""
            } ${wrapValid}`}
          >
            {multichoice ? (
              <input
                placeholder={placeholder}
                autoComplete="off"
                className={inputClass}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={handleFocus}
                value={visibleValue || ""}
                onBlur={handleBlur}
                type={inputType}
                disabled={disabled}
              />
            ) : (
              <input
                placeholder={placeholder}
                autoComplete="off"
                className={inputClass}
                onKeyDown={handleKeyDown}
                value={value || ""}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type={inputType}
                disabled={disabled}
              />
            )}
            {list.length > 0 && !disabled && needButton && (
              <button
                type="button"
                className="multichoice__button"
                onClick={multichoice ? openPopup : () => showDropdown(list)}
                tabIndex="-1"
              >
                {multichoice ? "..." : "↓"}
              </button>
            )}
          </div>
          <ul className={`multichoice__list ${cl}`}>
            {Object.keys(selected)
              .sort()
              .map((key, i) => (
                <Item
                  text={
                    list.length === 0
                      ? key
                      : key + (selected[key] ? " - " + selected[key] : "")
                  }
                  listStyle={multichoiceStyle}
                  key={i}
                  id={key}
                  onDelete={deleteValue}
                  disabled={disabled}
                />
              ))}
          </ul>
          <Dropdown
            items={items}
            onSubmit={handleChoice}
            selectedIndex={activeItem}
            setSelected={setActiveItem}
            isVisible={isDropdown}
          />
        </div>
      </label>
      {isPopup && (
        <MultichoicePopup
          selected={selected}
          onClick={handleItemClick}
          onClose={handleClose}
          list={list}
          popupClass={popupClass}
          titleText={titleText}
        />
      )}
    </>
  );
}
export default Input;
