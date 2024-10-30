import React, { useState, useEffect } from "react";
import "../styles/DisplayCustomer.css";
import { IoAdd, IoOptions } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline, MdCopyAll } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import * as cookie from "../Utils/cookie";
import axios from "axios";
import loader from "../assets/loader.gif";
import notfound from "../assets/notfound.svg";
import Modal from "../Components/Modals/Modal";
import Lottie from "lottie-react";
import active from "../../public/active.json";
import CustomerUpdateModal from "../Components/Modals/CustomerUpdateModal";
import NoteCard from "../Components/NoteCard";
import NoteModal from "../Components/Modals/NoteModal";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useUserInfo } from "../Contexts/User";

function DisplayCustomer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState({});
    const [modalMode, setModalMode] = useState("add");
    const [notes, setNotes] = useState(null);

    const [modalProps, setModalProps] = useState({});

    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null); // for edit , update , delete options menu
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));
    const [refresh, setRefresh] = useState(false);

    let { cid } = useParams();

    const {loggedIn , setContextUser , setLoggedIn , contextUser} = useUserInfo();

    const copyToClipboard = (text, index) => {
        setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch((error) => {
                console.error("Copy failed:", error);
            });
    };
    const openModal = (field, action, Id, currentValue = "", index = -1) => {
        setModalProps({ field, action, Id, currentValue });
        if (index != -1) {
            setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
        }
        setIsModalOpen(true);
    };

    // opening customerUpdate modal
    const openUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    // opening Notes modal
    const openNoteModal = (note = {}, mode = "add") => {
        setSelectedNote(note);
        setModalMode(mode);
        setIsAddNoteModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalProps({});
        setRefresh((prev) => {
            return !prev;
        });
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setRefresh((prev) => {
            return !prev;
        });
    };

    const closeNoteModal = () => {
        setIsAddNoteModalOpen(false);
        setRefresh((prev) => {
            return !prev;
        });
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
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

    const toggleUser = (Id) => {
        setModalProps({ field: "Customers", action: "CustomerToggle", Id });
        setIsModalOpen(true);
    };

    const handleOptionsClick = (index) => {
        setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    if (loading) {
        return (
            <div className="loaderContainer d-flex flex-column gap-2 align-items-center justify-content-center w-100">
                <img className="img" src={loader} alt="Loading" />
                <p>Loading</p>
            </div>
        );
    }

    if (!customers) {
        return (
            <div className="loaderContainer d-flex flex-column gap-2 align-items-center justify-content-center w-100">
                <img src={notfound} alt="Not Found" />
                <p>Customer Data Not Found</p>
            </div>
        );
    }

    return (
        <>
        <Navbar ifAdmin={(contextUser?.role===0)?true:false} />
        <div className="d-flex align-items-center justify-center mt-3">
            <div className="d-flex flex-column justify-content-start  gap-3 p-3 align-items-center main-container rounded-4 shadow-lg">
                <div className="ms-auto">
                    {!Boolean(customers.status) && (
                        <div className="lottie">
                            {" "}
                            {/* You can adjust the size */}
                            <Lottie
                                className=" p-0 flex-row-reverse gap-1 d-flex justify-content-center align-items-center "
                                animationData={active}
                                loop={true}
                            >
                                <button
                                    className="bg-danger-subtle border-0 p-1 rounded-2  "
                                    onClick={() => toggleUser(customers.cid)}
                                >
                                    {" "}
                                    Delete{" "}
                                </button>
                            </Lottie>
                        </div>
                    )}
                    {Boolean(customers.status) && (
                        <button
                            className="bg-success-subtle border-0 p-2 rounded-2  "
                            onClick={() => toggleUser(customers.cid)}
                        >
                            {" "}
                            Restore{" "}
                        </button>
                    )}
                </div>
                <div className="w-50 p-1 d-flex align-items-center justify-content-center rounded-2 customerContainer">
                    <h2 className="text-white">
                        Customer: {customers.firstName} {customers.lastName}
                    </h2>
                </div>

                <div className="d-flex justify-content-between align-items-start w-100 p-5 gap-3  ">
                    <div className="shadow-lg w-50 p-3 d-flex flex-column align-items-start justify-content-start gap-3 rounded-3">
                        <div className="note-container d-flex w-100 rounded-3 justify-content-between align-items-center p-2">
                            <h4 className="text-light mx-3 mb-0">Customer Details</h4>
                            <FaEdit
                                className="text-light"
                                onClick={() => openUpdateModal()}
                            />
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start">
                            <h4>Company Name</h4>
                            <p className="fst-italic">{customers.company}</p>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start">
                            <h4>Position Name</h4>
                            <p className="fst-italic">{customers.position}</p>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start w-50">
                            <h4>Address</h4>
                            <p className="fst-italic customer-address">{customers.address}</p>
                        </div>

                        <div className="container">
                            <div className="d-flex flex-column align-items-start justify-content-start">
                                <h4>Contact Details</h4>

                                <h5 className="text-secondary my-2">Phone Numbers</h5>
                                <ul className="list-group w-100">
                                    {customers.phoneNumbers.map((phoneNumber, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center phone-number"
                                        >
                                            {phoneNumber.phone}
                                            <div className="position-relative">
                                                <IoOptions
                                                    className="options-icon"
                                                    onClick={() => handleOptionsClick(index)}
                                                />
                                                {activeMenuIndex === index && (
                                                    <div className="dropdown-menu show">
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                openModal(
                                                                    "Phones",
                                                                    "edit",
                                                                    phoneNumber.pid,
                                                                    phoneNumber.phone,
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            <MdOutlineEdit /> Edit
                                                        </button>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                openModal(
                                                                    "Phones",
                                                                    "delete",
                                                                    phoneNumber.pid,
                                                                    phoneNumber.phone,
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            <MdDeleteOutline /> Delete
                                                        </button>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    phoneNumber.phone,
                                                                    activeMenuIndex,
                                                                )
                                                            }
                                                        >
                                                            <MdCopyAll /> Copy
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                    <li className="list-group-item p-0 bg-secondary-subtle pointer d-flex justify-content-center align-items-center">
                                        <button
                                            className="btn w-100"
                                            onClick={() => openModal("Phones", "add", customers.cid)}
                                        >
                                            <IoAdd />
                                        </button>
                                    </li>
                                </ul>

                                <h5 className="text-secondary my-2">Email Address</h5>
                                <ul className="list-group w-100">
                                    {customers.emails.map((email, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center phone-number"
                                        >
                                            {email.email}
                                            <div className="position-relative">
                                                <IoOptions
                                                    className="options-icon"
                                                    onClick={() =>
                                                        handleOptionsClick(
                                                            index + customers.phoneNumbers.length,
                                                        )
                                                    }
                                                />
                                                {activeMenuIndex ===
                                                    index + customers.phoneNumbers.length && (
                                                        <div className="dropdown-menu show">
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() =>
                                                                    openModal(
                                                                        "Emails",
                                                                        "edit",
                                                                        email.eid,
                                                                        email.email,
                                                                        activeMenuIndex,
                                                                    )
                                                                }
                                                            >
                                                                <MdOutlineEdit /> Edit
                                                            </button>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() =>
                                                                    openModal(
                                                                        "Emails",
                                                                        "delete",
                                                                        email.eid,
                                                                        email.email,
                                                                        activeMenuIndex,
                                                                    )
                                                                }
                                                            >
                                                                <MdDeleteOutline /> Delete
                                                            </button>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() =>
                                                                    copyToClipboard(email.email, activeMenuIndex)
                                                                }
                                                            >
                                                                <MdCopyAll /> Copy
                                                            </button>
                                                        </div>
                                                    )}
                                            </div>
                                        </li>
                                    ))}
                                    <li className="list-group-item p-0 bg-secondary-subtle pointer d-flex justify-content-center align-items-center">
                                        <button
                                            className="btn w-100"
                                            onClick={() => openModal("Emails", "add", customers.cid)}
                                        >
                                            <IoAdd />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-75 shadow-lg p-3 d-flex flex-column align-items-center justify-content-center rounded-3 bg-white">
                        <div className="text-light note-container w-100 p-2 rounded-3 shadow-sm d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Notes</h3>
                            <button
                                className="btn-add p-1 rounded-3"
                                onClick={() => openNoteModal()}
                            >
                                Add Note
                            </button>
                        </div>
                        <div className="d-flex gap-3 justify-content-evenly align-items-center flex-wrap my-3">
                            {notes.map((note, index) => {
                                const expectedCompletionDate = new Date(note.expectedCompletion);
                                const formattedDate = expectedCompletionDate.toLocaleDateString();
                                const formattedTime = expectedCompletionDate.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                return (
                                    <div className="">
                                    <NoteCard
                                        key={note.noteID}
                                        Title={note.title}
                                        Content={note.summary}
                                        ITime={formattedTime}
                                        IDate={formattedDate}  
                                        id={note.noteID} 
                                        initialStatus={note.status}
                                        createdBy={note.createdBy} 
                                        updatedBy={note.updatedBy} 
                                        allowEdit={true}
                                        onChangingAnything={()=>{
                                            setRefresh((prev)=>{
                                                return !prev
                                            })
                                            }}
                                    />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                field={modalProps.field}
                action={modalProps.action}
                Id={modalProps.Id}
                currentValue={modalProps.currentValue}
            />

            <CustomerUpdateModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                customerId={customers.cid}
                currentDetails={customers}
            />
            <NoteModal
                isOpen={isAddNoteModalOpen}
                onClose={closeNoteModal}
                noteData={selectedNote}
                mode={modalMode}
                createdBy="3" // need to be changed
                customerId={customers.cid}
            />
        </div>
        </>
    );
}

export default DisplayCustomer;
