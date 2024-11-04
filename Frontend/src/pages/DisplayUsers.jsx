import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as cookie from "../Utils/cookie";
import axios from "axios";
const server = import.meta.env.VITE_SERVER;


function DisplayUsers() {
    const [authToken, setAuthToken] = useState(null);
    let {uid} = useParams();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
               
                const response = await axios.get(
                    `${server}/api/Customers/${uid}`,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    },
                );
                const notesResponse = await axios.get(

                    `${server}/api/Notes/userNotes/${uid}`,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    },
                );
                console.log(notesResponse.data);
                setNotes(notesResponse.data);
                console.log(response.data);
                setCustomers(response.data);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching customer data:", error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);


    return (
        <div className='main-container'>
            
            <div className='Srname'>
                Test
            </div>
            
            <div className='inner-container'>
                <div className='details'>
                    <div className=''></div>
                </div>
                <div className='notes'>

                </div>
            </div>


        </div>
    )
}

export default DisplayUsers
