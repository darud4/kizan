import Input from "../Input/Input";
import Switch from "../Switch/Switch";

function Section({
  items,
  onChange,
  full = "full",
  values,
  onDropdownChoice,
  updatableItems = [],
}) {
  function evaluateConditions(arr) {
    if (!arr || arr.length === 0) return true;
    return arr.every((item) => evaluateCondition(item));
  }

  function evaluateCondition(condition) {
    if (!condition) return true;
    const [leftField, right = null, operator = null] = condition;
    const left = values[leftField];
    if (left && operator === null) return true;
    let result = false;
    const realOperator = operator.startsWith("!")
      ? operator.slice(1)
      : operator;
    switch (realOperator) {
      case "=":
        result = left === right;
        break;
      case ">":
        result = left > right;
        break;
      case "<":
        result = left < right;
        break;
      case "include":
        result = typeof left === "object" && left[right] !== undefined;
        break;
      case "empty":
        result =
          !left || (typeof left === "object" && Object.keys(left).length === 0);
        break;
      default:
        result = false;
    }
    if (operator && operator.startsWith("!")) {
      result = !result;
    }
    return result;
  }

  async function handleChange(name, val) {
    return onChange && (await onChange(name, val));
  }

  function generateInput(item, i) {
    if (item.set !== full && full !== "full") return;
    const isDisabled =
      updatableItems.length > 0 && !updatableItems.includes(item.name);
    switch (item.type) {
      case "input":
        if (evaluateConditions(item.conditions))
          return (
            <Input
              key={i}
              {...item}
              onChange={handleChange}
              onDropdownChoice={onDropdownChoice}
              value={values[item.name]}
              disabled={isDisabled}
            />
          );
        break;
      case "multichoice":
        if (evaluateConditions(item.conditions))
          return (
            <Input
              multichoice={true}
              key={i}
              {...item}
              onChange={handleChange}
              value={values[item.name]}
              disabled={isDisabled}
            />
          );
        break;
      case "switch":
        if (evaluateConditions(item.conditions))
          return (
            <Switch
              key={i}
              {...item}
              onChange={handleChange}
              value={[values[item.name], values[item.name + "_text"]]}
              disabled={isDisabled}
            />
          );
        break;
      default:
    }
  }
  return (
    <div className={`form__section `}>
      {items.map((item, i) => generateInput(item, i))}
    </div>
  );
}

export default Section;
