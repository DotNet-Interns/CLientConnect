import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from '../Utils/cookie';
import { useUserInfo } from '../Contexts/User';
import NoteCard from './NoteCard';
import NoteModal from './Modals/NoteModal';

function Navbar({ ifAdmin }) {
    const [searchField, setSearchField] = useState("");
    const { loggedIn, setContextUser, setLoggedIn, contextUser } = useUserInfo();
    const [AddNote, setAddNote] = useState(false)
    const navigate = useNavigate();

    const handleLogOut = () => {
        setCookie("Auth_Token", null);
        setLoggedIn(null);
        navigate('/login')
    }

    

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  ">
                <div className="container-fluid">
                    <Link className='navbar-brand' to='/'>Client Connect</Link>

                    {/* Hamburger Menu for Mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Navbar */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {/* Search Field */}
                            <li className="nav-item mx-3">
                                <div className="d-flex bg-light rounded-1  align-items-center">
                                    <input
                                        className="form-control focus-ring focus-ring-dark border-0 rounded-1 "
                                        type="text"
                                        placeholder="Search"
                                        value={searchField}
                                        onChange={(e) => setSearchField(e.target.value)}
                                    />
                                    <FaSearch className=" search p-1" />
                                </div>
                            </li>


                            <li className="nav-item">
                                <Link className='nav-link' to='/'>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/customers'>Customers</Link>
                            </li>
                            {
                                ifAdmin && (<li className="nav-item">
                                    <Link className='nav-link' to='/srList'>Sales-Representatives</Link>
                                </li>)
                            }
                            <li className="nav-item">
                                <button onClick={handleLogOut} className='nav-link'>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>


            </nav>
        </>
    );
}

export default Navbar;
