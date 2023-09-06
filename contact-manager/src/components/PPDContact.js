import React, { useState } from 'react';
import axios from 'axios';

function PPD() {
  const data = { id: '', fname: '', lname: '', email: '', pno: '' };
  const [inputData, setInputData] = useState(data);

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts",
        inputData
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/${inputData.id}`,
        inputData
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/${inputData.id}`
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  return (
    <div className="container mt-4">
                    <h1>Welcome to Contact Manager App!</h1>
                    <hr></hr>
      <form>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="fname"
            value={inputData.fname}
            onChange={handleData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lname"
            value={inputData.lname}
            onChange={handleData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={inputData.email}
            onChange={handleData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="phonenumber"
            className="form-control"
            name="pno"
            value={inputData.pno}
            onChange={handleData}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-success" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button><hr></hr>
        <div className="mb-3">
          <label className="form-label">ID: (Specify if Update or Delete)</label>
          <input
            type="text"
            className="form-control"
            name="id"
            value={inputData.id}
            onChange={handleData}
          />
          <hr></hr>
        </div>
      </form>
    </div>
  );
}

export default PPD;
