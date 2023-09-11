import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetContact() {
    // this state will hold the contact data
    const [contactData, setContactData] = useState([]);
    // this state will manage the contact data being edited
    const [editingContact, setEditingContact] = useState(null);

    // this will get data from API when component mounts
    useEffect(() => {
        axios.get("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts")
            .then((response) => {
                setContactData(response.data);
            });
    }, []);

    // this will handle the deletion of contact
    const handleDelete = (id) => {
        // this will show a warning message and ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            // this will send delete request to API
            axios.delete(`https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/${id}`)
                .then(() => {
                    setContactData((prevData) => prevData.filter((contact) => contact.id !== id));
                });
        }
    };

    // this will start the editing of the contact
    const handleEdit = (contact) => {
        setEditingContact({ ...contact }); // Make a copy of the contact
    };

    // this will cancel the editing of the contact
    const handleCancelEdit = () => {
        setEditingContact(null);
    };

    // this will update the contact based on the edit
    const handleUpdate = () => {
        if (editingContact) {
            // sends PUT request to API
            axios.put(`https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/${editingContact.id}`, editingContact)
                .then(() => {
                    // it will clear the editing state
                    setEditingContact(null); 
                    // this will fetch the update data from the API
                    fetchContacts();
                });
        }
    };

    // this will handle the input when editing the contact
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    // this will fetch all the contact from API using GET
    const fetchContacts = () => {
        axios.get("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts")
            .then((response) => {
                setContactData(response.data);
            });
    };

    return (
        <div className="container mt-4">
            <h2>List of contacts</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contactData.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input type="text" name="fname" value={editingContact.fname} onChange={handleInputChange}/>
                                ) : (
                                    contact.fname
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input type="text" name="lname" value={editingContact.lname} onChange={handleInputChange}/>
                                ) : (
                                    contact.lname
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input type="text" name="email" value={editingContact.email} onChange={handleInputChange}
                                    />
                                ) : (
                                    contact.email
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input type="text" name="pno" value={editingContact.pno} onChange={handleInputChange}/>
                                ) : (
                                    contact.pno
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <div>
                                        <button className="btn btn-success" onClick={handleUpdate}>Save</button>
                                        <button className="btn btn-warning ml-2" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleEdit(contact)}>Edit</button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(contact.id)}>Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetContact;
