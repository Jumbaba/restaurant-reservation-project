import React from "react";

function Tables({tables = [], onFinish})  {

  const finishBtn = ({ target }) => {
    const tableId = target.dataset.tableIdFinish;
    const finishConfirm = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (finishConfirm) {
      onFinish(tableId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr className="reservations-head">
          <th>Tables</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => (
          <tr key={table.table_id}>
            <td>{table.table_name}</td>
            {table.reservation_id ? (
              <td data-table-id-status={table.table_id}>Occupied</td>
            ) : (
              <td data-table-id-status={table.table_id}>Free</td>
            )}
            {table.reservation_id ? (
              <td>
                <button
                  className="btn btn-danger"
                  data-table-id-finish={table.table_id}
                  onClick={finishBtn}
                >
                  Finish
                </button>
              </td>
            ): null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tables;
