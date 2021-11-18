import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, today, next } from "../utils/date-time";
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
      <ErrorAlert error={reservationsError} />
      <button
        class="btn btn-success mr-2 mb-1"
        id="today"
        onClick={handleClick}
      >
        Today
      </button>
      <button
        class="btn btn-secondary mr-2 mb-1"
        id="previous"
        onClick={handleClick}
      >
        Previous
      </button>
      <button
        class="btn btn-secondary mr-2 mb-1"
        id="next"
        onClick={handleClick}
      >
        Next
      </button>

      <table className="table">
        <thead>
          <tr className="reservations-head">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
