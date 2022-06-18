import "./Grid.css";
import Row from "./Row";
import { useState, useEffect } from "react";

function Grid({ data, columns, onRowClick }) {
  const [filters, setFilters] = useState({});
  const [gridData, setGridData] = useState([]);
  const [sorted, setSorted] = useState({});

  useEffect(() => {
    function getValue(row, column) {
      let result = "";
      if (column.source && typeof column.source === "object")
        result = column.source.map((colName) => row[colName]).join(" ");
      else result = row[column.source || column.name];
      return result;
    }

    const preprocess = (value, column) =>
      column.preprocess ? column.preprocess(value) : value;

    const processedData = data.map((row) => {
      return columns.reduce((newObj, column) => {
        newObj[column.name] = getValue(row, column);
        newObj[column.name] = preprocess(newObj[column.name], column);
        return newObj;
      }, {});
    });
    setGridData(processedData);
  }, [data, columns]);

  function findColumnByName(name) {
    return columns.find((col) => col.name === name);
  }

  function sortColumn(field, order) {
    const column = findColumnByName(field);
    const customSort = column.sort;
    if (typeof customSort === "function")
      return gridData.sort((a, b) => customSort(a[field], b[field]) * order);
    else
      return gridData.sort((a, b) => a[field].localeCompare(b[field]) * order);
  }

  function sortGrid(sorted) {
    const sortField = Object.keys(sorted)[0];
    if (!sortField) return;
    const sortOrder = sorted[sortField];
    setGridData([...sortColumn(sortField, sortOrder)]);
  }

  function setSort(column, i) {
    setSorted((state) => {
      const newState = {};
      newState[column.name] = state[column.name] ? state[column.name] * -1 : 1;
      sortGrid(newState);
      return newState;
    });
  }

  function renderColumn(column, i) {
    const cl = sorted[column.name]
      ? "grid__header-cell_sort_" + (sorted[column.name] === 1 ? "asc" : "desc")
      : "";
    return column.type === "hidden" ? null : (
      <th
        className={`grid__header-cell ${cl}`}
        key={i}
        onClick={() => setSort(column, i)}
        style={{width: column.width || 'auto'}}
      >
        {column.caption || column.name}
      </th>
    );
  }

  function handleFilterChange({ target }) {
    setFilters((state) => {
      const newState = { ...state };
      newState[target.name] = target.value;
      return newState;
    });
  }

  function renderFilter(column, i) {
    return column.type === "hidden" ? null : (
      <th className="grid__header-filter" key={i}>
        <input
          className="grid__header-input"
          placeholder="фильтр..."
          onChange={handleFilterChange}
          name={column.name}
        />
      </th>
    );
  }

  function handleClick(data) {
    onRowClick && onRowClick(data.NSYST);
  }

  function checkFilters(item) {
    return Object.keys(filters).every((filter) =>
      item[filter]?.toUpperCase().includes(filters[filter]?.toUpperCase())
    );
  }

  return (
    <table className="grid">
      <thead className="grid__header">
        <tr>{columns.map((column, i) => renderColumn(column, i))}</tr>
        <tr>{columns.map((column, i) => renderFilter(column, i))}</tr>
      </thead>
      <tbody>
        {gridData.map(
          (item, i) =>
            checkFilters(item) && (
              <Row
                onClick={() => handleClick(item)}
                columns={columns}
                data={item}
                key={i}
              />
            )
        )}
      </tbody>
    </table>
  );
}

export default Grid;
