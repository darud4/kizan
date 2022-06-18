export const rows = [
  {
    label: "ФИО сотрудника",
    source: ["FAM", "IMJ", "OTCH"],
    joinRule: (fio) => {
      return fio
        .map((name) =>
          name.length === 1
            ? name + "."
            : name[0].toUpperCase() + name.slice(1).toLowerCase()
        )
        .join(" ");
    },
  },
  {
    label: "Звание",
    source: "ZVANIE_TEXT",
    afterJoin: "lowerCase",
  },
  {
    label: "Должность",
    source: "DOLJN",
    afterJoin: "lowerCase",
  },
  { label: "Подразделение", source: "PODRAZD" },
  { label: "№ командировочного талона", source: "N_KOM" },
  { label: "Место выезда", source: "PLACES" },
  {
    label: "Основание",
    source: [
      "P4A_TEXT",
      "P4A_PUNKT",
      "P4A_DATE",
      "P4A_N_DOC",
      "P4A_FIO",
      "P4A_RANK",
      "P4A_DOLJN",
    ],
    afterSource: {
      P4A_RANK: "lowerCase",
      P4A_DOLJN: "capitalizeFirstLetter",
    },
    joinRule: ([type, punkt = "", date = "", nDoc = "", fio, rank, doljn]) =>
      [
        type,
        punkt ? "п. " + punkt : null,
        nDoc || date ? "приказ от " + date + " №" + nDoc : null,
        fio ? "разрешение дал " + doljn + " " + rank + " " + fio : null,
      ]
        .filter((x) => x)
        .join(", "),
  },
  {
    label: "Форма командировки",
    source: ["P5A_TEXT", "P5B_TEXT", "P5C_TEXT"],
    afterJoin: (text) => (text ? text.toLowerCase() : ""),
  },
  { label: "Задачи", source: "TASKS", afterJoin: "lowerCase" },
  { label: "Главный группы", source: "GROUP_BOSS" },
  { label: "Состав группы", source: "COMISSION" },
  { label: "Длительность в днях", source: "SROK" },
  {
    label: "Продление",
    source: ["PROLONG", "PROLONG_ORDER", "PROLONG_BOSS"],
  },
  { label: "Сокращение", source: "SHORTEN" },
  { label: "Длительность с дорогой", source: "VYEZD" },
  { label: "Дата убытия", source: "DT_START" },
  { label: "Дата прибытия", source: "DT_END" },
  {
    label: "Недостатки",
    source: ["FAILS", "FAILS_NAPRAV", "FAILS_OTHERS", "FAILS_BOSS"],
  },
  {
    label: "Меры на месте",
    source: ["REALIZ_PLACE", "PLACE_OTHERS"],
  },
  {
    label: "Меры по приезду",
    source: [
      "REALIZ_ARRIVAL",
      "ARRIVAL_REPORT",
      "ARRIVAL_OTHERS",
    ],
  },
  {
    label: "Положительный опыт",
    source: ["BONUS", "BONUS_NAPRAV", "BONUS_OTHERS"],
  },
  { label: "Кто ввел", source: "FIO_ZAP" },
  { label: "Когда ввел", source: "DT_ZAP" },
  { label: "Начальник", source: "FIO_BOSS_ZAP" },
  { label: "Дата подписи", source: "DT_BOSS_ZAP" },
];
