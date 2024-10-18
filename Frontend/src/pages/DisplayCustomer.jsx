import React, { useState, useEffect } from 'react';
import "../styles/DisplayCustomer.css";
import { IoOptions } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline, MdCopyAll } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

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
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    // const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlNhbGVzUmVwcmVzZW50YXRpdmUiLCJqdGkiOiJjNGI4NzU2ZS1kZWU4LTQ5NGQtOWZlZS1jNzRjNmJkYzRhNDkiLCJleHAiOjE3MjkyNzMxODIsImlzcyI6IkNsaWVudENvbm5lY3QiLCJhdWQiOiJDbGllbnRDb25uZWN0In0.3JUOysGkG4Qg2mfKtkLli_J3AcJbRyAedAO7xCSBk_U;"

    useEffect(() => {
        // Fetch customers from the API
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("http://172.20.68.11:5100/api/Customers/1", {
                   withCredentials:true
                });
                
                // // Set the token in cookies
                // Cookies.set('AccessToken', authtoken, { expires: 7, sameSite: 'None', secure: true });

                
                console.log(response);
                setCustomers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customer data:", error);
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleOptionsClick = (index) => {
        setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='d-flex align-items-center justify-center mt-3'>
            {/* Container */}
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

                        {/* Other Customer Details */}
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
