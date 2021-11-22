import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

export default function TableForm() {
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
    status: true,
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
    createTable({
      data: { ...formData, capacity: Number(formData.capacity) },
    })
      .then(() => history.push(`/`))
      .catch(setError);
  }

  return (
    <>
      <h1>Create Table</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="tableName">Table Name</label>
          <input
            name="table_name"
            type="string"
            className="form-control"
            id="tableName"
            placeholder="Table Name"
            onChange={handleInputChange}
            required
          ></input>
          <label for="capacity">Capacity</label>
          <input
            name="capacity"
            type="string"
            className="form-control"
            id="capacity"
            placeholder="Capacity"
            onChange={handleInputChange}
            required
          ></input>
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
        </div>
      </form>
    </>
  );
}
