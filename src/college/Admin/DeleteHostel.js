import Navbar from "../Logins/ANavbar"
import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Form, Button, Alert } from "react-bootstrap";

const DeleteHostelForm = () => {
    const navigate = useNavigate();
    const [hostelName, setHostelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(hostelName)
        try {
            const response = await fetch('https://ereside-backend.onrender.com/api/v1/deleteHostel', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ hostelName })
            });
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                navigate('/ahomepage');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to delete hostel.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while deleting the hostel.');
        }
    };

    return (
        <> <Navbar />
            <div className="sign-in__wrapper"
                style={{ backgroundImage: `url(${BackgroundImage})` }}
            >
                <form className="shadow p-4 bg-white rounded">
                    <div className="h4 mb-2 text-center">Delete Hostel</div>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <div class="mb-1">
                        <label htmlFor="hostelName">Hostel Name:</label>

                        <Form.Control type="text" id="hostelName" value={hostelName} onChange={(e) => setHostelName(e.target.value)} required /><br />
                    </div>
                    <button type="submit" onClick={handleSubmit} class="w-100 btn-primary">Delete Hostel</button>
                </form>
            </div>
        </>
    );
}

export default DeleteHostelForm;
