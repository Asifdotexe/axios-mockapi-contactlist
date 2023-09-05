import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PPD() {
    
    const data = {fname:'',lname:'',email:'',pno:''}

    const [inputData, setInputData] = useState(data)

    const handleData= (e) =>[
        setInputData({...inputData,[e.target.name]: e.target.value})
    ]

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts",inputData)
        .then((response) => {
            console.log(response)
        })
    }

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/1",inputData)
        .then((response) => {
            console.log(response)
        })
    }

    const handleDelete = (e) =>{
        e.preventDefault();
        axios.delete("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/1")
        .then((response) => {
            console.log(response)
        })
    }

    return ( 
        <div>
            <form>
                First Name: 
                <input type='text' name='fname' value={inputData.fname} onChange={handleData}></input><br></br>
                Last Name:
                <input type='text' name='lname' value={inputData.lname} onChange={handleData}></input><br></br>
                Contact Email:
                <input type='email' name='email' value={inputData.email} onChange={handleData}></input><br></br>
                Phone Number:
                <input type='phonenumber' name='pno' value={inputData.pno} onChange={handleData}></input><br></br>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </form>
        </div>
     );
}

export default PPD;