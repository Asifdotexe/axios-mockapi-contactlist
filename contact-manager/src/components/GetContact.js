import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetContact() {
    const [contactData, setContactData] = useState([]);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        axios.get("https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts")
            .then((response) => {
                setContactData(response.data);
            });
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            axios.delete(`https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/${id}`)
                .then(() => {
                    setContactData((prevData) => prevData.filter((contact) => contact.id !== id));
                })
                .catch((error) => {
                    console.error("Error deleting contact:", error);
                });
        }
    };

    const handleEdit = (contact) => {
        setEditingContact({ ...contact }); // Make a copy of the contact
    };

    const handleCancelEdit = () => {
        setEditingContact(null);
    };

    const handleUpdate = () => {
        if (editingContact) {
            axios.put(`https://64f60a932b07270f705e0ad8.mockapi.io/api/contactdotexe/contacts/${editingContact.id}`, editingContact)
                .then(() => {
                    setEditingContact(null);
                    fetchContacts();
                })
                .catch((error) => {
                    console.error("Error updating contact:", error);
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

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
                                    <input
                                        type="text"
                                        name="fname"
                                        value={editingContact.fname}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    contact.fname
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input
                                        type="text"
                                        name="lname"
                                        value={editingContact.lname}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    contact.lname
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input
                                        type="text"
                                        name="email"
                                        value={editingContact.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    contact.email
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <input
                                        type="text"
                                        name="pno"
                                        value={editingContact.pno}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    contact.pno
                                )}
                            </td>
                            <td>
                                {editingContact && editingContact.id === contact.id ? (
                                    <div>
                                        <button
                                            className="btn btn-success"
                                            onClick={handleUpdate}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-warning ml-2"
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(contact)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger ml-2"
                                            onClick={() => handleDelete(contact.id)}
                                        >
                                            Delete
                                        </button>
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
