import { Link } from "react-router-dom";
import { updateStatus } from "../utils/api";

export default function ReservationsTable({
  reservations,
  loadDashboard,
  setReservationsError,
}) {
  function cancelRes({ target }) {
    const reservationId = target.dataset.reservationIdCancel;
    const cancelConfirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );

    if (cancelConfirm) {
      updateStatus(reservationId, { status: "cancelled" })
        .then(loadDashboard)
        .catch(setReservationsError);
    }
  }

  return (
    <div className="table-responsive-md">
      <table className="table">
        <thead>
          <tr className="reservations-head">
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>
                {reservation.first_name} {reservation.last_name}
              </td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
              <td data-reservation-id-status={reservation.reservation_id}>
                {reservation.status}
              </td>
              <td>
                {reservation.status === "booked" ? (
                  <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                    <button className="btn btn-secondary">Seat</button>
                  </Link>
                ) : null}
              </td>
              <td>
                <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                  <button className="btn btn-secondary">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={cancelRes}
                  data-reservation-id-cancel={reservation.reservation_id}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
