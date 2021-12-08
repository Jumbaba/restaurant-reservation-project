import { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import ReservationForm from "./Forms/reservationForm";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router";

function CreateReservation() {
  const history = useHistory();

  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [error, setError] = useState(null);

  async function handleSubmit(event, formData) {
    event.preventDefault();
    createReservation({
      data: { ...formData, people: Number(formData.people) },
    })
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setError);
  }

  return (
    <>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        handleSubmit={handleSubmit}
        initialState={initialState}
      />
    </>
  );
}

export default CreateReservation;
