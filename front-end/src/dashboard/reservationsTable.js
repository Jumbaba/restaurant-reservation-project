import { Link } from "react-router-dom";

export default function ReservationsTable({ reservations, handleStatusChange }) {
  return (
    <table className="table">
      <thead>
        <tr className="reservations-head">
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Reservation Date</th>
          <th>Reservation Time</th>
          <th>People</th>
          <th>Status</th>
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
            <td>{reservation.status}</td>
            <td>
              {reservation.status == "booked" ? (
                <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                  <button className="btn btn-secondary" onClick={handleStatusChange}>Seat</button>
                </Link>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
