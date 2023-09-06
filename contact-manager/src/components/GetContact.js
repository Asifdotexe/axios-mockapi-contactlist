import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetContact() {

    const[contactData, setContactData] = useState([])

    useEffect(() => {
        axios.get("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts")
        .then((response) => {
            console.log(response)
            setContactData(response.data)
        })
    },[])

    return ( 
        <div>
        <h1>Welcome to Contact Manager App!</h1>
        <h2>List of contacts</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Phone Number</th>
            </tr>
        </table>
        {contactData.map((data) => {
            return(
                <div>
                    <table>
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.fname}</td>
                        <td>{data.lname}</td>
                        <td>{data.email}</td>
                        <td>{data.pno}</td>
                    </tr>
                    </table>
                </div>
            )
        })}
        </div>
     );
}

export default GetContact;