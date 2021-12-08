import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, seatReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

const SeatForm = () => {
  const history = useHistory();
  
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(0);
  
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();
  
  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables().then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const handleRedirect = () => {
    return history.goBack();
  };
  
  const handleInputChange = ({ target }) => {
    setTableId(Number(target.value));
  };

  const handleSubmit = (error) => {
    error.preventDefault();
    const abortController = new AbortController();
    if (tableId === 0) {
      return setError({ message: "Select a table from the list" });
    }
    seatReservation(tableId, reservation_id, abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch(setError);
  };

  return (
    <div className="seatForm">
      <div>
        <h1>Seat Reservation</h1>
        <ErrorAlert error={error} />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="table_name">Table Number</label>
            <select
              name="table_id"
              minLength="2"
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Table</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={table.reservation_id ? true : false}
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={handleRedirect}
              type="button"
            >
              Cancel
            </button>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeatForm;