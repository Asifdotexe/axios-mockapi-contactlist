// importing useState and axios
import React, { useState } from 'react';
import './Contact.css'
import axios from 'axios';

function PPD() {
  // declaring the intial state
  const data = { id: '', fname: '', lname: '', email: '', pno: '' };

  // this state is to take care of the inputs
  const [inputData, setInputData] = useState(data);

  // this will make changes in the state based on the inputs
  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // this handle will submit the form to the MockAPI server
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // this will send POST request to API
    axios
    .post("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts",inputData)
      .then((response) => {
        console.log(response);
        // reloading the page to refresh and get updated data from API
        window.location.reload();
      });
  };


  return (
    <div className="container mt-4">
                    <h1>CONTACT MANAGER APP</h1>
                    <h6>Project by Asif Sayyed</h6>
                    <hr></hr>
      {/* Input form */}
      <form>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input type="text" className="form-control" name="fname" value={inputData.fname} onChange={handleData}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text" className="form-control" name="lname" value={inputData.lname} onChange={handleData}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Email:</label>
          <input type="email" className="form-control" name="email" value={inputData.email} onChange={handleData}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input type="phonenumber" className="form-control" name="pno" value={inputData.pno} onChange={handleData}/>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        <div className="mb-3">
          <hr></hr>
        </div>
      </form>
    </div>
  );
}

export default PPD;
