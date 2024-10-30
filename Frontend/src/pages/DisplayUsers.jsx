import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as cookie from "../Utils/cookie";
import axios from "axios";



function DisplayUsers() {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
               
                const response = await axios.get(
                    `http://172.20.68.11:5100/api/Customers/${cid}`,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    },
                );
                const notesResponse = await axios.get(

                    `http://172.20.68.11:5100/api/Notes/userNotes/${cid}`,
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
        fetchCustomers();
    }, [refresh]);


    let { uid } = useParams();


    return (
        <div className='main-container'>
            {/* Sr name */}
            <div className='Srname'>
                Test
            </div>
            {/* section 2 */}
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
