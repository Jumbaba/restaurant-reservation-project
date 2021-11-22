import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TablesTable from "./tablesTable";
import ReservationsTable from "./reservationsTable";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const handleClick = (event) => {
    if (event.target.id === "previous")
      history.push(`/dashboard?date=${previous(date)}`);
    if (event.target.id === "next")
      history.push(`/dashboard?date=${next(date)}`);
    if (event.target.id === "today") history.push(`/dashboard`);
  };

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
      
      <ErrorAlert error={tablesError} />
      <TablesTable tables={tables} />
      <ErrorAlert error={reservationsError} />
      <ReservationsTable reservations={reservations}/>

    </main>
  );
}

export default Dashboard;