function TextViewItem({ input, values }) {
  const afterSource = (field, text) => {
    if (input.afterSource && typeof input.afterSource[field] === "string")
      return transform(text, input.afterSource[field]);
    else return text;
  };

  const getValues = (obj) => {
    return typeof obj === "object"
      ? obj.map((fieldName) => {
          return afterSource(fieldName, values[fieldName]);
        })
      : afterSource(obj, values[obj]);
  };

  const getText = (values) => {
    const res =
      values && typeof values === "object"
        ? values.filter((x) => x).join(" ")
        : values
        ? values.trim()
        : "";
    return res;
  };

  function transform(text, action) {
    const actions = {
      lowerCase: (text) => text && text.toLowerCase(),
      upperCase: (text) => text && text.toUpperCase(),
      capitalizeFirstLetter: (text) =>
        text && text.length > 1
          ? text[0].toUpperCase() + text.slice(1).toLowerCase()
          : text && text.toUpperCase(),
    };
    return typeof actions[action] === "function" ? actions[action](text) : text;
  }

  let text =
    typeof input.joinRule === "function"
      ? input.joinRule(getValues(input.source))
      : getText(getValues(input.source));
  if (typeof input.afterJoin === "function") text = input.afterJoin(text);
  if (typeof input.afterJoin === "string")
    text = transform(text, input.afterJoin);


  return text && text !== "0" ? (
    <>
      <span className="textview__label">{input.label}</span>
      <span className="textview__input">{text}</span>
    </>
  ) : null;
}

export default TextViewItem;
