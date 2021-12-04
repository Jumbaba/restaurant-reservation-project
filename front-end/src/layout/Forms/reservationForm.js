import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [error, setError] = useState(null);

  const history = useHistory();

  const handleRedirect = () => {
    return history.goBack();
  };

  function handleInputChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    createReservation({
      data: { ...formData, people: Number(formData.people) },
    })
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setError);
  }

  return (
    <>
      <h1>Create Reservations</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="firstName">First Name</label>
          <input
            name="first_name"
            type="string"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            required
          ></input>
          <label for="lastName">Last Name</label>
          <input
            name="last_name"
            type="string"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            required
          ></input>
          <label for="mobileNumber">Mobile Number</label>
          <input
            name="mobile_number"
            type="tel"
            maxLength="12"
            className="form-control"
            id="mobileNumber"
            placeholder="Mobile Number"
            onChange={handleInputChange}
            required
          ></input>
          <label for="reservationDate">Date of Reservation</label>
          <input
            name="reservation_date"
            type="date"
            className="form-control"
            id="reservationDate"
            onChange={handleInputChange}
            required
          ></input>
          <label for="reservationTime">Time of Reservation</label>
          <input
            name="reservation_time"
            type="time"
            className="form-control"
            id="reservationTime"
            onChange={handleInputChange}
            required
          ></input>
          <label for="numberOfPeople">Number of People</label>
          <input
            name="people"
            type="number"
            className="form-control"
            id="numberOfPeople"
            onChange={handleInputChange}
            value={formData.people}
            min="1"
            required
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleRedirect}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
