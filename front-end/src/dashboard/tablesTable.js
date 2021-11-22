export default function TablesTable({ tables }) {
  return (
    <table className="table">
      <thead>
        <tr className="reservations-head">
          <th>Table Name</th>
          <th>Capacity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => (
          <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={`${table.table_id}`}>{table.status ? "Free" : "Occupied"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
