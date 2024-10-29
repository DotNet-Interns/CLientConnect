import React, { useEffect, useState } from 'react'
import NoteSlider from "../Components/NoteSlider"
import TotalCustomers from '../Components/TotalCustomers'
import RecentInteractions from '../Components/RecentInteractions'
import Greeting from '../Components/Greeting'
import CustomersCreatedBySR from "../Components/CustomersCreatedBySR"
import CompletedNotesThisMonthSR from "../Components/CompletedNotesThisMonthBySR"
import Navbar from '../Components/Navbar'
import { useUserInfo } from '../Contexts/User';

function SRDashBoard() {
    const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
    const [loading, setLoading] = useState(true);
    return (
        <>
            {
                (contextUser) ?
                    <>

                        <Navbar />

                        <div className='row m-5 mt-3'>
                            <div className="col-md-4 mt-sm-5 col-sm-6 stats">
                                <div className="greeting rounded bg-primary text-white p-3 h-100">
                                    <Greeting />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="TotalCustomers p-3 bg-warning rounded h-100">
                                    <TotalCustomers />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className=" RecentInteractions p-3 bg-success text-white rounded h-100">
                                    <RecentInteractions />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="p-3 border border-5 border-dark rounded h-100">
                                    <CustomersCreatedBySR />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className=" p-3 bg-danger text-white rounded h-100">
                                    <CustomersCreatedBySR />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="p-3 bg-dark text-white rounded h-100">
                                    <CompletedNotesThisMonthSR />
                                </div>
                            </div>
                        </div>
                        <div className="mx-5 mb-5">
                            <h3>Recent Notes</h3>
                            <NoteSlider />
                        </div>
                    </> :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default SRDashBoard