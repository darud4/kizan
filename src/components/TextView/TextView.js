import "./TextView.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../Popup/Popup";
import TextViewItem from "./TextViewItem/TextViewItem";

function TextView({ values, inputs, onClose }) {
  const [formValues, setValues] = useState({});
  const canEdit = true;

  const history = useHistory();

  useEffect(() => {
    setValues({ ...values });
  }, []);

  function handlePopupClose() {
    onClose();
  }

  function handleEdit() {
    history.push('/komand/card/'+values['NSYST']);
  }

  return (
    <Popup onSubmit={handlePopupClose}>
      {canEdit && <button type="button" className="textview__button" onClick={handleEdit}>...</button>}
      <form className="textview">
        {inputs.map((input, key) => (
          <TextViewItem input={input} key={key} values={values} />
        ))}
      </form>
    </Popup>
  );
}

export default TextView;
