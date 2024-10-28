import React, { useState, useEffect } from 'react';
import "../styles/CustomModal.css"; // Add any required styles here for your modal layout
import axios from 'axios';
import * as cookie from "../Utils/cookie";

function Modal({ isOpen, onClose, field, action, Id, currentValue = "" }) {
    const [inputValue, setInputValue] = useState(currentValue);
    const [authToken, setAuthToken] = useState(cookie.getCookie("Auth_Token"));

    useEffect(() => {
        if (action === "edit") {
            setInputValue(currentValue);
        } else {
            setInputValue("");
        }
    }, [action, currentValue]);


    const handleAction = async () => {
        if (action === "add") {
            console.log(`Adding ${field}: ${inputValue} for customer ${Id}`);
            const data = {
                cid: Id
            };
            if (field == "Emails") {
                data["email"] = inputValue;
            }
            else if (field == "Phones") {
                data["phoneNumber"] = inputValue;
            }
            try {
                const response = await axios.post(`http://172.20.68.11:5100/api/${field}`, data, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

            } catch (error) {
                console.log(`Unable to add ${field}: ${error}`);
                alert(`Unable to add ${field}`);
            }

        } else if (action === "edit") {
            const data = {

            };
            if (field == "Emails") {
                data["email"] = inputValue;
                data["eid"] = Id;
            }
            else if (field == "Phones") {
                data["pid"] = Id;
                data["phone"] = inputValue;
            }

            try {

                const response = await axios.put(`http://172.20.68.11:5100/api/${field}`, data, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

            } catch (error) {
                console.log(`Unable to edit ${field}: ${error}`);
                alert(`Unable to edit ${field}`);
            }


            console.log(`Editing ${field}: ${inputValue} for customer ${Id}`);
        } else if (action === "delete") {


            try {
                const response = await axios.delete(`http://172.20.68.11:5100/api/${field}/${Id}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

            } catch (error) {
                console.log(`Unable to delete ${field}: ${error}`);
                alert(`Unable to delete ${field}`);
            }

            console.log(`Deleting ${field} for customer ${Id}`);
        }
        else if(action==="CustomerActivate"){

            try {
                console.log(`http://172.20.68.11:5100/api/${field}/${Id}`)
                const response = await axios.put(`http://172.20.68.11:5100/api/Customers/toggleStatus/${Id}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

            } catch (error) {
                console.log(`Unable to Activate User ${field}: ${error}`);
                alert(`Unable to Activate User ${field}`);
            }
        }
        else if(action==="CustomerInActivate"){

            try {
                console.log(`http://172.20.68.11:5100/api/${field}/toggleStatus/${Id}`)
                const response = await axios.put(`http://172.20.68.11:5100/api/Customers/toggleStatus/${Id}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

            } catch (error) {
                console.log(`Unable to delete ${field}: ${error}`);
                alert(`Unable to delete ${field}`);
            }
        }
        onClose(); // Close modal after action
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>

                <h3 className="modal-title">
                    {action === "add" && `Add New ${field}`}
                    {action === "edit" && `Edit ${field}`}
                    {action === "delete" && `Delete ${field}`}
                    {action === "CustomerInActivate" && `Inactivate User`}
                    {action === "CustomerActivate" && `Activate User`}
                </h3>

                {
                    action === "CustomerInActivate" &&
                    <div className="modal-body">
                        <p>Are you sure you want to Inactivate this User?</p>
                    </div>
                }
                {
                    action === "CustomerActivate" &&
                    <div className="modal-body">
                        <p>Are you sure you want to activate this User?</p>
                    </div>
                }

                {action === "add" || action === "edit" ? (
                    <div className="modal-body">
                        <label htmlFor="inputField" className="input-label">
                            {action === "add" ? `Enter New ${field}` : `Edit ${field}`}
                        </label>
                        <input
                            id="inputField"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Enter ${field}`}
                            className="input-field"
                        />
                    </div>
                ) : action === "delete" ? (
                    <div className="modal-body">
                        <p>Are you sure you want to delete this {field}?</p>
                    </div>
                ) : null}

                <div className="modal-footer">
                    <button className="modal-button cancel-button" onClick={onClose}>Cancel</button>
                    <button className="modal-button action-button" onClick={handleAction}>
                        {action === "delete" ? "Confirm" : action === "edit" ? "Save" : action === "add" ? "Add" : "Confirm"}
                        
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
