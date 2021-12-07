import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { searchReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SearchTable from "./SearchTable.js";

function Search() {
  const history = useHistory();
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [display, setDisplay] = useState(false);

  const changeHandler = ({ target }) => {
    setMobileNumber(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchReservations(mobileNumber)
      .then(setResults)
      .then(() => setDisplay(true))
      .catch(setError);
  };

  function cancelHandler() {
    history.goBack();
  }

  const searchResults = results?.length ? (
    <div>
      {results.map((reservation) => (
        <SearchTable reservation={reservation} />
      ))}
    </div>
  ) : (
    <p>{`No reservations found for ${mobileNumber}`}</p>
  );

  return (
    <div>
      <h1>Search for Reservation</h1>
      <ErrorAlert error={error} />
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            name="mobile_number"
            placeholder="Enter a phone number"
            value={mobileNumber}
            onChange={changeHandler}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-secondary mr-2">
            Find
          </button>
        </div>
      </form>
      {display && searchResults}
    </div>
  );
}

export default Search;
