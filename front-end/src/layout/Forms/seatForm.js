import { useEffect } from "react";
import { useState } from "react";
import { listTables } from "../../utils/api";

export default function SeatForm() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  useEffect(loadTables);

  
  return (
    <>
    <h1>Seat Reservation</h1>
    <select className="table_id">
      [1,2,3,4,5].map((table)=>table)
      <option>Banana</option>
      <option>Not Banana</option>

    </select>
    </>
  );
}
