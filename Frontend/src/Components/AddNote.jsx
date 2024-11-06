import React, { useState } from 'react'
import "../styles/AddNote.css"
import axios from "axios"
import { getCookie } from '../Utils/cookie';
import { useUserInfo } from '../Contexts/User';
const server = import.meta.env.VITE_SERVER;

function AddNote({ visibility, setAddNote }) {
    const [note, setNote] = useState({ Title: "", Content: "", CreatingFor: "", Select: "", ExpectedCompletion: "" })
    const [loader, setLoader] = useState(false)
    const [dropdownData, setDropDownData] = useState(null);
    const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
    // console.log(note);



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const getUsers = async (event) => {
        try {
            const Auth_Token = getCookie("Auth_Token");
            setLoader(true);
            const response = (event.target.value === "User") ?
                await axios.get(`${server}/api/Users`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`
                    }
                }) :
                await axios.get(`${server}/api/Customers`, {
                    headers: {
                        Authorization: `Bearer ${Auth_Token}`
                    }
                })
            setDropDownData(response.data)
            // console.log(response)

        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }


    const handleSubmit = async () => {
        try {
            const Auth_Token = getCookie("Auth_Token");
            const response = await axios.post(`${server}/api/Notes`, {
                "title": note.Title,
                "summary": note.Content,
                "expectedCompletion": note.ExpectedCompletion,
                "createdBy": contextUser.userID,
                "createdFor": note.Select,
                "isCustomer": (note.CreatingFor === "Customer" ? true : false),
            }, {
                headers: {
                    Authorization: `Bearer ${Auth_Token}`
                }
            })

            // console.log(response);
            if (response.status === 200) setAddNote(false);

        } catch (error) {

        }
    }




    return (
        <div style={{ "display": (visibility) ? "flex" : "none" }} className="modal-overlay">
            <div className="modal-container">
                <h3 className="modal-title">Add Note</h3>
                <div className="modal-body">
                    <label className="input-label">Title</label>
                    <input
                        type="text"
                        name='Title'
                        value={note.Title}
                        className="input-field"
                        onChange={handleChange}
                    />
                    <label className="input-label">Summary</label>
                    <textarea
                        value={note.Content}
                        name='Content'
                        className="input-field"
                        rows="3"
                        onChange={handleChange}
                    />

                    <label className="input-label">Creating For :</label>
                    <label>User : </label>
                    <input
                        type="radio"
                        name="CreatingFor"
                        value={"User"}
                        className="radio-btn"
                        onChange={handleChange}
                        onClick={getUsers}
                        checked={note.CreatingFor === "User"}
                    />

                    <label>Customer : </label>
                    <input
                        type="radio"
                        name="CreatingFor"
                        value={"Customer"}
                        className="radio-btn"
                        onChange={handleChange}
                        onClick={getUsers}
                        checked={note.CreatingFor === "Customer"}
                    />

                    {
                        (note.CreatingFor !== "") && <>
                            <label className="input-label" htmlFor="user">Select {note.CreatingFor} : </label>
                            <select name="Select" onChange={handleChange} className="radio-btn" id="user">

                                {loader ? <option>Loading...</option> :
                                    <>
                                        <option>Select {note.CreatingFor}</option>
                                        {
                                            dropdownData?.map((item, index) =>
                                                <option key={index} value={(note.CreatingFor==="User")?item.userID:item.cid}>{item.firstName} {item.lastName}</option>
                                            )
                                        }
                                    </>
                                }
                            </select>
                        </>
                    }

                    <label className="input-label">Expected Completion</label>
                    <input
                        type="datetime-local"
                        value={note.ExpectedCompletion}
                        className="input-field"
                        onChange={handleChange}
                        name='ExpectedCompletion'

                    />


                </div>

                <div className="modal-footer">
                    <button className="modal-button cancel-button" onClick={() => {
                        setAddNote(false);
                        setNote({ Title: "", Content: "", CreatingFor: "", ExpectedCompletion: "" })
                    }} >Cancel</button>
                    <button className="modal-button action-button" onClick={handleSubmit} >Save</button>
                </div>
            </div>
        </div>

    )
}

export default AddNote