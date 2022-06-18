import { sortDate, convertDate } from "./dateUtils";
import { processFio } from "./textUtils";

export const gridColumns = [
  { name: "NSYST", type: "hidden" },
  { name: "FIO", caption: "ФИО", source: ["FAM", "IMJ", "OTCH"], preprocess: processFio },
  { name: "PLACES", caption: "Место", source: "PLACES" },
  {
    name: "DT_START",
    caption: "Начало",
    preprocess: convertDate,
    sort: sortDate,
    width: "10%",
  },
  {
    name: "DT_END",
    preprocess: convertDate,
    caption: "Конец",
    sort: sortDate,
    width: "10%",
  },
];
