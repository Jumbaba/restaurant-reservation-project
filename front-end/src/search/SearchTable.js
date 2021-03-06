import React from "react";
import { Link } from "react-router-dom";
import { updateStatus } from "../utils/api";

function SearchTable({ reservation, setError, setRefresh }) {
  const cancelReservation = ({ target }) => {
    const abortController = new AbortController();
    const reservation_id = target.dataset.reservationIdCancel;
    const cancelConfirm = window.confirm(
      "Do you want to cancel this reservation?\n\nThis cannot be undone."
    );
    if (cancelConfirm) {
      updateStatus(
        reservation_id,
        { status: "cancelled" },
        abortController.signal
      )
        .then(() => setRefresh(true))
        .catch(setError);
    }
  };

  return (
    <div className="table-responsive-md">
    <table className="table" key={reservation.reservation_id}>
      <thead>
        <tr className="search-head"></tr>
        <th>
          Name: {reservation.first_name} {reservation.last_name}
        </th>
        <th>Date: {reservation.reservation_date.slice(0, 10)}</th>
        <th>Time: {reservation.reservation_time}</th>
        <th>Size: {reservation.people}</th>
        <th>Status: {reservation.status}</th>
      </thead>
      <div>
        <button
          onClick={cancelReservation}
          data-reservation-id-cancel={reservation.reservation_id}
          className={
            reservation.status === "finished" ||
            reservation.status === "cancelled"
              ? "disabledBtn btn btn-danger mr-2 mt-2"
              : "btn btn-danger mr-2 mt-2"
          }
          disabled={
            reservation.status === "finished" ||
            reservation.status === "cancelled"
              ? true
              : false
          }
        >
          Cancel
        </button>
        <Link to={`/reservations/${reservation.reservation_id}/edit`}>
          <button
            className={
              reservation.status === "finished" ||
              reservation.status === "cancelled"
                ? "disabledBtn btn btn-secondary mr-2 mt-2"
                : "btn btn-secondary mt-2"
            }
            disabled={
              reservation.status === "finished" ||
              reservation.status === "cancelled"
                ? true
                : false
            }
          >
            Edit
          </button>
        </Link>
      </div>
    </table>
    </div>
  );
}

export default SearchTable;
