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
        {contactData.map((data) => {
            return(
                <div>
                    {data.FirstName}
                </div>
            )
        })}
        </div>
     );
}

export default GetContact;