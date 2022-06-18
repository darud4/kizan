import "./Overview.css";
import InputWithDropdown from "../InputWithDropdown/InputWithDropdown";
import { useState } from "react";
import { api } from "../../utils/api";
import { gridColumns } from "../../utils/searchResults";
import Grid from "../Grid/Grid";
import TextView from "../TextView/TextView";
import { convertDate } from "../../utils/dateUtils";
import {rows as textViewRows} from '../../utils/textView';

function Overview() {
  const [searchString, setSearchString] = useState("");
  const [persons, setPersons] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [textViewInputs, setTextViewInputs] = useState([]);
  const [textViewValues, setTextViewValues] = useState({});

  async function handleChange(value) {
    setSearchString(value);
    try {
      const json = await api.findFamQuick(value);
      const res = json.map((item) => ({ key: item.FAM?.trim() }));
      setPersons(res);
    } catch (err) {
      return console.log("handleChange, Неожиданная ошибка, " + err);
    }
  }

  function handleChoice({ key }) {
    setSearchString(key);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const rules = {
      flatten: "yes",
      join: [["FIO", ["FAM", "IMJ", "OTCH"]]],
    };
    let year1, year2;
    const fam = searchString
      .replace(/(\d{4}-\d{4}|\d{4})/, (match) => {
        if (match.includes("-")) [year1, year2] = match.split("-");
        else year1 = match;
        return "";
      })
      .trim();
    api
      .findPersonsList(fam, year1, year2)
      .then((data) => {
//        const compacted = compact(data, ["PLACES"]);
//        const converted = convertFromOracle(compacted, rules);
        setGridData([]);
//        setGridData(converted);
      })
      .catch((error) => console.log(error));
  }

  function prepareTextView(cardData) {
    // const compacted = compactForText(cardData, [
    //   "PLACES",
    //   "TASKS",
    //   "REALIZ_PLACE",
    //   "REALIZ_ARRIVAL",
    //   "FAILS",
    //   "COMISSION",
    //   "BONUS",
    // ]);
    // compacted["P4A_DATE"] = convertDate(compacted["P4A_DATE"]);
    // compacted["DT_END"] = convertDate(compacted["DT_END"]);
    // compacted["DT_START"] = convertDate(compacted["DT_START"]);
    // setTextViewValues(compacted);
    setTextViewInputs(textViewRows);
  }

  function handleRowClick(nsyst) {
    api
      .findByNsyst(nsyst)
      .then((data) => prepareTextView(data))
      .catch((error) => console.log("api.findByNsyst error", error));
  }

  function handleTextViewClose() {
    setTextViewValues({});
    setTextViewInputs([]);
  }

  return (
    <section className="overview">
      <form className="overview__form" onSubmit={handleSubmit}>
        <InputWithDropdown
          placeholder="Введите фамилию, можно добавить год командировки, например 'Старостин 2010'"
          name="search"
          onChange={handleChange}
          onSubmit={handleChoice}
          inputClass="overview__input"
          value={searchString}
          list={persons}
        />
        <button className="overview__submit">Поиск</button>
      </form>
      {gridData.length > 0 && (
        <Grid
          data={gridData}
          onRowClick={handleRowClick}
          columns={gridColumns}
        />
      )}
      {textViewInputs.length > 0 && Object.keys(textViewValues).length > 0 && (
        <TextView
          inputs={textViewInputs}
          values={textViewValues}
          onClose={handleTextViewClose}
        />
      )}
    </section>
  );
}

export default Overview;
