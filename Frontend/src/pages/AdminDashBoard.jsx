import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import NoteSlider from "../Components/NoteSlider"
import TotalCustomers from '../Components/TotalCustomers'
import RecentInteractions from '../Components/RecentInteractions'
import axios from "axios"
import { getCookie } from '../Utils/cookie';
import { useUserInfo } from '../Contexts/User';
import Greeting from '../Components/Greeting'
import '../styles/AdminDashBoard.css'
import PendingNotes from '../Components/PendingNotes'
import CompletedNotesThisMonth from '../Components/CompletedNotesThisMonth'
import TotalSalesReps from '../Components/TotalSalesReps'
const server = import.meta.env.VITE_SERVER;

function AdminDashBoard() {
    const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
    const [loading, setLoading] = useState(true);
    console.log(contextUser);



    return (
        <>
            {
                (contextUser) ?
                    <>
                        <Navbar />
                        <div className='row m-5' style={{ height: "150px" }}>
                            <div className="col-4" >
                                <div className="greeting rounded bg-primary text-white p-3 h-100">
                                    <Greeting />
                                </div>
                            </div>
                            <div className="col-4 ">
                                <div className="TotalCustomers p-3 bg-warning rounded h-100">
                                    <TotalCustomers />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className=" RecentInteractions p-3 bg-success text-white rounded h-100">
                                    <RecentInteractions />
                                </div>
                            </div>
                        </div>
                            <div className="row m-5">
                                <div className="col-4">
                                    <div className="p-3 border border-5 border-dark rounded h-100">
                                        <TotalSalesReps />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className=" p-3 bg-danger text-white rounded h-100">
                                        <PendingNotes />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 bg-dark text-white rounded h-100">
                                        <CompletedNotesThisMonth />
                                    </div>
                                </div>
                            </div>
                        <NoteSlider />
                    </> :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default AdminDashBoard