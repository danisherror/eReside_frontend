import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css"
import Navbar from "../Logins/Navbar"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from "react-bootstrap";

const ApplyHostel = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hostelName: '',
        block: '',
        roomNo: ''
    });

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    console.log(token);


    const handlehostelNameChange = (event) => {
        const selectedHostel = event.target.value;
        const blockOptions = selectedHostel === 'fresher' ? ['A', 'B', 'C'] : ['X', 'Y', 'Z'];
        setFormData((prevData) => ({ ...prevData, hostelName: selectedHostel, block: '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // console.log(formData)
            const { hostelName, block, roomNo } = formData;
            console.log(hostelName, block, roomNo);
            const response = await fetch(`/api/v1/applyHostel`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    hostelName, block,
                    roomNumber:roomNo
                })
            });
            console.log(response);
            if (response.status === 200) { // Assuming 201 (Created) for successful signup
                alert(`Registered successfully!`);
                navigate('/uhomepage'); // Use appropriate redirect logic
            }
            else if(response.status === 400) {
                alert("student is already assigned to a room")
             }
            else if(response.status === 401) {
                alert("Room is already full. Please choose another room.")
             }
             else if(response.status===402)
             {
                alert("Student is already assigned to this room")
             }
            else {
                // Handle other status codes appropriately
                // Consider using more granular error handling
                console.error('Error:', response.status, response.error);
                alert(`Error registering.${response.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <><Navbar />
        <div className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
            <div className="h4 mb-2 text-center">Apply Hostel</div>
                <div className="mb-1">
                    <label htmlFor="hostelName">Hostel Name</label>
                    <br></br>
                    <select
                        id="hostelName"
                        name="hostelName"
                        value={formData.hostelName}
                        onChange={handlehostelNameChange}
                    >
                        <option>select the option below</option>
                        <option value="Fresher">Fresher Block</option>
                        <option value="aryabhata">Aryabhata Hostel</option>
                    </select>
                </div>
                {formData.hostelName && (
                    <div className="mb-1">
                        <label htmlFor="block">Block</label>
                        <br></br>
                        <select
                            id="block"
                            name="block"
                            value={formData.block}
                            onChange={(event) => setFormData((prevData) => ({ ...prevData, block: event.target.value }))}
                        >
                            <option >select the Block</option>
                            {formData.hostelName === 'Fresher' &&
                                ['A', 'B', 'C'].map((block) => (
                                    <option key={block} value={block}>
                                         {block}
                                    </option>
                                ))}
                            {formData.hostelName === 'aryabhata' &&
                                ['Block X', 'Block Y', 'Block Z'].map((block) => (
                                    <option key={block} value={block}>
                                         {block}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                <div className="mb-1">
                    <label htmlFor="roomNo">Room Number</label>
                    <Form.Control
                        id="roomNo"
                        name="roomNo"
                        type="text"
                        value={formData.roomNo}
                        onChange={(event) => setFormData((prevData) => ({ ...prevData, roomNo: event.target.value }))}
                    />
                </div>
                <button type="submit" className="btn-submit">
                    Apply
                </button>
            </form>
        </div>
        </>
    );
};

export default ApplyHostel;
