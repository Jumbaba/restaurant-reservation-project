import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { useEffect } from "react";

export default function ReservationForm({
  handleSubmit,
  initialState,
}) {

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(null);

  function updateFormData(){
    setFormData({...initialState});
  }

  useEffect(updateFormData, [initialState]);

  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  };

  const handleRedirect = () => {
    return history.goBack();
  };

  return (
    <>
      <ErrorAlert error={error} />
      <form onSubmit={(event) => handleSubmit(event, formData)}>
        <div className="form-group">
          <label for="firstName">First Name</label>
          <input
            name="first_name"
            type="string"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            value={formData.first_name}
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
            value={formData.last_name}
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
            value={formData.mobile_number}
            onChange={handleInputChange}
            required
          ></input>
          <label for="reservationDate">Date of Reservation</label>
          <input
            name="reservation_date"
            type="date"
            className="form-control"
            id="reservationDate"
            value={formData.reservation_date.substring(0, 10)}
            onChange={handleInputChange}
            required
          ></input>
          <label for="reservationTime">Time of Reservation</label>
          <input
            name="reservation_time"
            type="time"
            className="form-control"
            id="reservationTime"
            value={formData.reservation_time}
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
        <button type="submit" className="btn btn-primary mr-2">
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
