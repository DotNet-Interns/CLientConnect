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
    const [analysisData , setAnalysisData] = useState({});
    //console.log(contextUser);

    const Auth_Token = getCookie("Auth_Token")

    useEffect (()=>{
        const getAnalysis = async ()=>{
            try {
                const response = await axios.get(`${server}/api/Analytics/Admin`,{
                    headers : {
                        Authorization : `Bearer ${Auth_Token}`
                    }
                });
                //console.log(response);
                setAnalysisData(response.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        getAnalysis();
    },[])

    return (
        <>
            {
                (contextUser) ?
                    <>

                        <Navbar ifAdmin={true} setContextUser={setContextUser} />

                        <div className='row m-5 mt-3'>
                            <div className="col-md-4 mt-sm-5 col-sm-6 stats">
                                <div className="greeting rounded bg-primary text-white p-3 h-100">
                                    <Greeting name={contextUser?.firstName} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="TotalCustomers p-3 bg-warning rounded h-100">
                                    <TotalCustomers totalCustomers={analysisData?.totalCustomer}  />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className=" RecentInteractions p-3 bg-success text-white rounded h-100">
                                    <RecentInteractions recentInteractions = {analysisData?.recentInteraction} />
                                </div>
                            </div>
                            {/* </div>
                            <div className="row m-5"> */}
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="p-3 border border-5 border-dark rounded h-100">
                                    <TotalSalesReps totalSR = {analysisData?.totalSalesReps} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className=" p-3 bg-danger text-white rounded h-100">
                                    <PendingNotes pendingNotes={analysisData?.pendingNotes} />
                                </div>
                            </div>
                            <div className="col-md-4 mt-sm-5 mt-3 col-sm-6 stats">
                                <div className="p-3 bg-dark text-white rounded h-100">
                                    <CompletedNotesThisMonth completedNotes={analysisData?.completedNotesThisMonth} />
                                </div>
                            </div>
                        </div>
                        <div className="mx-5 mb-5">
                            <h3>Recent Notes</h3>
                             <NoteSlider notes={analysisData.recentNotes} />
                        </div>
                    </> :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default AdminDashBoard