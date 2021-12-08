import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import ReservationForm from "./Forms/reservationForm";

function EditReservation() {
  const history = useHistory();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });

  const [error, setError] = useState(null);
  const { reservation_id } = useParams();

  function loadReservation() {
    const abortController = new AbortController()
    setError(null);
    readReservation(reservation_id, abortController.signal).then(setReservation).catch(setError);
  }

  useEffect(loadReservation, [reservation_id]);

  const handleSubmit = (event, formData) => {
    event.preventDefault();
    updateReservation(formData)
      .then(() =>
        history.push(
          `/dashboard?date=${formData.reservation_date.substring(0, 10)}`
        )
      )
      .catch(setError);
  };

  return (
    <>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm handleSubmit={handleSubmit} initialState={reservation} />
    </>
  );
}

export default EditReservation;
