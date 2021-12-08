import React, { useEffect, useState } from "react";
import { listReservations, deleteSeat, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "./reservationsTable";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import Tables from "./Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }


  const handleClick = (event) => {
    if (event.target.id === "previous")
      history.push(`/dashboard?date=${previous(date)}`);
    if (event.target.id === "next")
      history.push(`/dashboard?date=${next(date)}`);
    if (event.target.id === "today") history.push(`/dashboard`);
  };

  function onFinish(tableId) {
    const abortController = new AbortController();
    deleteSeat(tableId, abortController.signal).then(loadDashboard).catch(setReservationsError);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      <button
        className="btn btn-success mr-2 mb-1"
        id="today"
        onClick={handleClick}
      >
        Today
      </button>
      <button
        className="btn btn-secondary mr-2 mb-1"
        id="previous"
        onClick={handleClick}
      >
        Previous
      </button>
      <button
        className="btn btn-secondary mr-2 mb-1"
        id="next"
        onClick={handleClick}
      >
        Next
      </button>

      <ErrorAlert error={reservationsError} />
      <ReservationsTable
        reservations={reservations}
        loadDashboard ={loadDashboard}
      />
      <Tables
        onFinish={onFinish}
        tables={tables}
        tablesError={tablesError}
      />
    </main>
  );
}

export default Dashboard;
