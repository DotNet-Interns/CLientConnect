import React, { useState, useEffect } from 'react';
import "../styles/DisplayCustomer.css";
import { IoOptions } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline, MdCopyAll } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import * as cookie from "../Utils/cookie";
import axios from 'axios';

function NoteCard() {
    return (
        <div className='container w-25 notes rounded-2 shadow-sm d-flex flex-column justify-content-start align-align-items-center p-2 gap-2 pointer'>
            <h3 className='bg-secondary rounded-1 text-light p-1'>Title</h3>
            <div className='bg-secondary rounded-1 text-light p-1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, excepturi? Magnam asperiores voluptatum voluptatibus, libero expedita blanditiis vel accusamus vero.
            </div>
            <p>Interaction Date :12/5/2023</p>
        </div>
    );
}

function DisplayCustomer() {
    const [customers, setCustomers] = useState(null);
    const [phone, setPhones] = useState([]);
    const [email, setEmail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const CustomerResponse = await axios.get("http://172.20.68.11:5100/api/Customers/2", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const PhoneResponse = await axios.get("http://172.20.68.11:5100/api/Phones/2", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const EmailResponse = await axios.get("http://172.20.68.11:5100/api/Emails/2", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

                console.log(CustomerResponse.data, PhoneResponse.data, EmailResponse.data);
                
                setCustomers(CustomerResponse.data);
                setEmail(EmailResponse.data);
                setPhones(PhoneResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customer data:", error);
                setLoading(false);
            }
        };
        fetchCustomers();
    }, [authToken]);

    const handleOptionsClick = (index) => {
        setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!customers) {
        return <p>No customer data available</p>;
    }

    return (
        <div className='d-flex align-items-center justify-center mt-3'>
            <div className='d-flex flex-column justify-content-start container gap-3 p-3 align-items-center main-container rounded-4 shadow-lg'>
                {/* Name */}
                <div className='w-50 p-1 d-flex align-items-center justify-content-center rounded-2 customerContainer'>
                    <h2 className='text-white'>Customer: {customers.firstName} {customers.lastName}</h2>
                </div>

                <div className='d-flex justify-content-evenly align-items-start w-100 p-5 gap-3 flex-wrap'>
                    {/* Customer Detail */}
                    <div className='min-w-25 bg-light shadow-lg p-3 d-flex flex-column align-items-start justify-content-start gap-3 rounded-3'>
                        <div className='note-container d-flex w-100 rounded-3 justify-content-between align-items-center p-2'>
                            <h4 className='text-dark mb-0'>Customer Details</h4>
                            <FaEdit className='text-dark' onClick={() => alert("Edit customer details")} />
                        </div>

                        {/* Company name */}
                        <div className='d-flex flex-column align-items-start justify-content-start'>
                            <h4>Company Name</h4>
                            <p>{customers.company}</p>
                        </div>

                        {/* Position name */}
                        <div className='d-flex flex-column align-items-start justify-content-start'>
                            <h4>Position Name</h4>
                            <p>{customers.position}</p>
                        </div>

                        {/* Contact details */}
                        <div className="container">
                            <div className="d-flex flex-column align-items-start justify-content-start">
                                <h4>Contact Details</h4>

                                <h5 className='text-secondary my-2'>Phone Numbers</h5>
                                <ul className="list-group w-100">
                                    {phone.map((phone, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center phone-number"
                                        >
                                            {phone.phoneNumber}
                                            <div className="position-relative">
                                                <IoOptions className="options-icon" onClick={() => handleOptionsClick(index)} />
                                                {activeMenuIndex === index && (
                                                    <div className="dropdown-menu show">
                                                        <button className="dropdown-item" onClick={() => alert('Edit')}>
                                                            <MdOutlineEdit /> Edit
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => alert('Delete')}>
                                                            <MdDeleteOutline /> Delete
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => alert('Copy')}>
                                                            <MdCopyAll /> Copy
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <h5 className='text-secondary my-2'>Email Address</h5>
                                <ul className="list-group w-100">
                                    {email.map((email, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center phone-number"
                                        >
                                            {email.email}
                                            <div className="position-relative">
                                                <IoOptions className="options-icon" onClick={() => handleOptionsClick(index + phone.length)} />
                                                {activeMenuIndex === index + phone.length && (
                                                    <div className="dropdown-menu show">
                                                        <button className="dropdown-item" onClick={() => alert('Edit')}>
                                                            <MdOutlineEdit /> Edit
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => alert('Delete')}>
                                                            <MdDeleteOutline /> Delete
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => alert('Copy')}>
                                                            <MdCopyAll /> Copy
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Customer Notes */}
                    <div className='w-75 shadow-lg p-3 d-flex flex-column align-items-center justify-content-center rounded-3 bg-white'>
                        <div className='text-light note-container w-100 p-2 rounded-3 shadow-sm d-flex justify-content-between align-items-center'>
                            <h3 className='mb-0'>Notes</h3>
                            <button className='btn-add p-1 rounded-3'>Add Note</button>
                        </div>
                        <div className='d-flex gap-3 justify-content-evenly align-items-center flex-wrap my-3'>
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisplayCustomer;
