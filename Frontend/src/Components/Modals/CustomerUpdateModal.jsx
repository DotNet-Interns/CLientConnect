import React, { useState, useEffect } from 'react';
import "../../styles/CustomModal.css";
import axios from 'axios';
import * as cookie from "../../Utils/cookie";
const server = import.meta.env.VITE_SERVER;


function CustomerUpdateModal({ isOpen, onClose, customerId, currentDetails = {} }) {
    const [firstName, setFirstName] = useState(currentDetails.firstName || "");
    const [lastName, setLastName] = useState(currentDetails.lastName || "");
    const [cid, serCid] = useState(currentDetails.cid || "");
    const [company, setCompanyName] = useState(currentDetails.company || "");
    const [position, setPosition] = useState(currentDetails.position || "");
    const [address, setAddress] = useState(currentDetails.address || "");
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));
    
    useEffect(() => {

        if (currentDetails) {
            setFirstName(currentDetails.firstName || "");
            setLastName(currentDetails.lastName || "");
            setCompanyName(currentDetails.company || "");
            setPosition(currentDetails.position || "");
            setAddress(currentDetails.address || "");
        }
    }, [currentDetails]);

    const handleUpdate = async () => {
        const data = {
            firstName,
            lastName,
            company,
            position,
            address,
            cid

        };

        try {
            const response = await axios.put(
                `${server}/api/Customers`,
                data,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            alert("Customer details updated successfully");
        } catch (error) {
            alert("Unable to update customer details.");
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>

                <h3 className="modal-title">Update Customer Details</h3>

                <div className="modal-body">
                    <label className="input-label">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-field"
                    />

                    <label className="input-label">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-field"
                    />

                    <label className="input-label">Company Name</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="input-field"
                    />

                    <label className="input-label">Position</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="input-field"
                    />

                    <label className="input-label">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input-field"
                        rows="3"
                    />
                </div>

                <div className="modal-footer">
                    <button className="modal-button cancel-button" onClick={onClose}>Cancel</button>
                    <button className="modal-button action-button" onClick={handleUpdate}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerUpdateModal;
