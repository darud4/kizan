function Row({ data, columns, onClick }) {
  function renderCell(column, i) {
    const key = column.name || column;
    return column.type === "hidden" ? null : (
      <td key={i}>{data[key]}</td>
    );
  }

  return (
    <tr className="grid__row" onClick={onClick}>
      {columns.map((cell, i) => renderCell(cell, i))}
    </tr>
  );
}

export default Row;
