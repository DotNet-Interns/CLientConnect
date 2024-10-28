import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import "../styles/Navbar.css";

function Navbar() {
    const [searchField, setSearchField] = useState("");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark  ">
            <div className="container-fluid">
                <a className="navbar-brand " href="#">Client Connect</a>
                
                {/* Hamburger Menu for Mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Navbar */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Search Field */}
                        <li className="nav-item">
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

                        {/* Nav Links */}
                        <li className="nav-item">
                            <a className="nav-link" href="/view/Customer">Customers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/view/SR">Sales-Representative</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
