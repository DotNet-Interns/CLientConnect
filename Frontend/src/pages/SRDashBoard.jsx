import React, { useEffect, useState } from 'react'
import NoteSlider from "../Components/NoteSlider"
import TotalCustomers from '../Components/TotalCustomers'
import RecentInteractions from '../Components/RecentInteractions'
import Greeting from '../Components/Greeting'
import CustomersCreatedBySR from "../Components/CustomersCreatedBySR"
import CompletedNotesThisMonthSR from "../Components/CompletedNotesThisMonthBySR"
import Navbar from '../Components/Navbar'
import { useUserInfo } from '../Contexts/User';
import axios from 'axios'
import { getCookie } from '../Utils/cookie'
import AddNote from '../Components/AddNote'

const server = import.meta.env.VITE_SERVER;

function SRDashBoard() {
    const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
    const [loading, setLoading] = useState(true);
    console.log(contextUser);
    const Auth_Token = getCookie("Auth_Token");
    const [SRAnalysis, setSRAnalysis] = useState({})
    const [addNote, setAddNote] = useState(false);
    const [InternalNotes , setInternalNotes] = useState(null);


    useEffect(() => {
        const getSRAnalysis = async () => {
            try {
                const response = await axios.get(`${server}/api/Analytics/SR/${contextUser?.userID}`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`
                    }
                })
                console.log(response);
                setSRAnalysis(response.data)
            } catch (error) {
                console.log(error);

            }
        }
        getSRAnalysis();
    }, [])


    useEffect(()=>{
        const getSRAnalysis = async () => {
            try {
                const response = await axios.get(`${server}/api/Analytics/SR/${contextUser?.userID}`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`
                    }
                })
                console.log(response);
                setSRAnalysis(response.data)
            } catch (error) {
                console.log(error);

            }
        }
        
        const getInternalNotes = async () => {
            try {
                const response = await axios.get(`${server}/api/Notes/userNotes/${contextUser.userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Auth_Token}`
                        }
                    }
                )
                // console.log(response);
                setInternalNotes(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        if(!addNote) getInternalNotes();
        if(!addNote) getSRAnalysis();
    },[addNote])

    const handleAddNoteClick = () => {
        setAddNote(!addNote);
    }

    return (
        <>
            {
                (contextUser) ?
                    <>

                        <Navbar setContextUser={setContextUser} />
                        <div className='row m-5 mt-3'>
                            <div className="col-md-4 mt-sm-5 col-sm-6 stats">
                                <div className="greeting rounded bg-primary text-white p-3 h-100">
                                    <Greeting name={contextUser.firstName} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="TotalCustomers p-3 bg-warning rounded h-100">
                                    <TotalCustomers totalCustomers={SRAnalysis.totalCustomer} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className=" RecentInteractions p-3 bg-success text-white rounded h-100">
                                    <RecentInteractions recentInteractions={SRAnalysis.recentInteraction} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="p-3 border border-5 border-dark rounded h-100">
                                    <CustomersCreatedBySR CustomersCreatedBySR={SRAnalysis.customersCreatedByYou} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className=" p-3 bg-danger text-white rounded h-100">
                                    <CustomersCreatedBySR CustomersCreatedBySR={SRAnalysis.customersCreatedByYou} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="p-3 bg-dark text-white rounded h-100">
                                    <CompletedNotesThisMonthSR CompletedNotesThisMonthSR={SRAnalysis.completedNotesThisMonth} />
                                </div>
                            </div>
                        </div>
                        <div className="mx-5 mb-5">
                            <h3>Recent Notes</h3>
                            <NoteSlider notes={SRAnalysis.recentNotes} />
                            <h3>Internal Notes</h3>

                            <NoteSlider notes={InternalNotes} />
                        </div>

                        <AddNote visibility={addNote} setAddNote={setAddNote} />

                        <button className="add-note-button" onClick={handleAddNoteClick}>
                            Add Note
                        </button>
                    </> :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default SRDashBoard