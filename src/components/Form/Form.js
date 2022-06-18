import "./Form.css";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { capFirstLetter, normalizeFio } from "../../utils/textUtils";
import Section from "../Section/Section";
import Popup from "../Popup/Popup";
import Switch from "../Switch/Switch";
//import * as preprocess from "../../utils/preprocess";
import { sections } from "../../utils/sections";
import { api } from "../../utils/api";
import { updatableFields as UPDATABLE_FIELDS } from "../../utils/spr";

function Form({ initialValues = {} }) {
  const [formValues, setFormValues] = useState({});
  const [popupTexts, setPopupTexts] = useState([]);
  const [sectionFull, setSectionFull] = useState("full");
  const [updatableFields, setUpdatableFields] = useState([]);
  const history = useHistory();
  const { id: cardId } = useParams();

  // useEffect(() => {
  //   if (!cardId) return;
  //   api
  //     .findByNsyst(cardId)
  //     .then((data) => {
  //       if (data && data.NOAUTH) return Promise.reject("NOAUTH");
  //       if (data && data.UPDATABLE === "0")
  //         setUpdatableFields([...UPDATABLE_FIELDS]);
  //       else setUpdatableFields([]);
  //       const parsed = preprocess.convertBaseToObj(data);
  //       if (parsed) setFormValues(parsed);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [cardId]);

  useEffect(() => {
    if (Object.keys(initialValues).length > 0)
      setFormValues(JSON.parse(JSON.stringify(initialValues)));
  }, [initialValues]);

  function fillOperator() {
    setFormValues((state) => {
      state["fio_zap"] = normalizeFio(
        state["fam"],
        state["imj"],
        state["otch"]
      );
      return { ...state };
    });
  }

  async function handleValuesChange(property, value) {
    setFormValues((state) => {
      state[property] = value;
      return { ...state };
    });
    if (["fam", "imj", "otch"].includes(property)) fillOperator();
    if (property !== "fam" || !value) return;
    const response = await api.findPersonQuick(value);
    if (!response || response.length === 0) return [];
    return response.map((item) => ({
      key: [
        capFirstLetter(item.FAM),
        capFirstLetter(item.IMJ),
        capFirstLetter(item.OTCH) + ",",
        item.PODRAZD,
      ].join(" "),
      fam: capFirstLetter(item.FAM),
      imj: capFirstLetter(item.IMJ),
      otch: capFirstLetter(item.OTCH),
      noOnChange: true,
    }));
  }

  function handleFioClick(name, value) {
    if (name !== "fam") return;
    const { fam, imj, otch } = value;
    setFormValues((state) => {
      state["fam"] = fam;
      state["otch"] = otch;
      state["imj"] = imj;
      return { ...state };
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handlePopupClose() {
    setPopupTexts([null, null]);
  }

  function handleViewChange(_, value) {
    setSectionFull(value);
  }

  return (
    <>
      <form action="#" method="POST" className="form" name="card">
        <Switch
          labelText=""
          labelClass="form__label"
          name="sectionFieldset"
          offValue={["full", "полная карта"]}
          onValue={["brief", "сокращенная карта"]}
          onChange={handleViewChange}
          initialChecked={true}
        />
        <Section
          items={sections}
          updatableItems={updatableFields}
          onChange={handleValuesChange}
          onDropdownChoice={handleFioClick}
          full={sectionFull}
          values={formValues}
        />
        <button onClick={handleSubmit} className="form__button" type="button">
          Демо - данные не отправятся
        </button>
      </form>
      {popupTexts[0] && (
        <Popup titleText={popupTexts[0]} onSubmit={handlePopupClose}>
          <span className="form__span">{popupTexts[1]}</span>
        </Popup>
      )}
    </>
  );
}

export default Form;
