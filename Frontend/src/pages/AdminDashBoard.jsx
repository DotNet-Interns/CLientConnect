import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import NoteSlider from "../Components/NoteSlider"
import axios from "axios"
import { getCookie } from '../Utils/cookie';
import { useUserInfo } from '../Contexts/User';
const server = import.meta.env.VITE_SERVER;

function AdminDashBoard() {
    const {loggedIn , setContextUser , setLoggedIn , contextUser} = useUserInfo();
    const [loading , setLoading] = useState(true);
    console.log(contextUser);
    

    useEffect(()=>{
        const getUser = async () =>{
            try {
                const Auth_Token = getCookie("Auth_Token");
                // console.log(Auth_Token);
                
                const response = await axios.get(`${server}/get`,
                    {
                        headers : {
                            Authorization : `Bearer ${Auth_Token}`
                        }
                    }
                )
                console.log(response.data);
                setContextUser(response.data)
                setLoading(false)
                
            } catch (error) {
                console.log(error);
                
            }
        }
        getUser();
    },[])
    return (
        <>
            {
            (contextUser) ? 
            <>
            <Navbar />
            <NoteSlider />
            </> : 
            <h1>Loading...</h1>
            }
        </>
    )
}

export default AdminDashBoard