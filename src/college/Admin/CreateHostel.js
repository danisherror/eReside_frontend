import Navbar from "../Logins/ANavbar"
import "../css/login.css";
import BackgroundImage from '../assets/img/signin.png'
import { Form, Button, Alert } from "react-bootstrap";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
const CreateHostelForm = () => {
    const navigate = useNavigate();
    const [hostelName, setHostelName] = useState('');
    const [blocks, setBlocks] = useState([{ blockName: '', numberOfRooms: '' }]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (index, key, value) => {
        const newBlocks = [...blocks];
        newBlocks[index][key] = value;
        setBlocks(newBlocks);
    };
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const addBlock = () => {
        setBlocks([...blocks, { blockName: '', numberOfRooms: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(hostelName)
        console.log(blocks)
        try {
            const response = await fetch('https://ereside-backend.onrender.com/api/v1/createHostel', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    hostelName, blocks
                })
            });
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                setHostelName('');
                setBlocks([{ blockName: '', numberOfRooms: '' }]);
                navigate('/ahomepage');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to create hostel.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while creating the hostel.');
        }
    };

    return (
        <> <Navbar />
            <div className="sign-in__wrapper"  style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <form className="shadow p-4 bg-white rounded">
                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <div className="h4 mb-2 text-center">Create Hostel</div>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <div class="mb-1">
                        <label htmlFor="hostelName">Hostel Name:</label>
                        <Form.Control type="text" id="hostelName" value={hostelName} onChange={(e) => setHostelName(e.target.value)} required />
                    </div>
                    {blocks.map((block, index) => (
                         <div class="mb-1">
                        <div key={index}>
                        <br/><br/>
                            <label htmlFor={`blockName${index}`}>Block Name:</label>
                             <Form.Control  type="text" id={`blockName${index}`} value={block.blockName} onChange={(e) => handleChange(index, 'blockName', e.target.value)} required />
                            <label htmlFor={`numberOfRooms${index}`}>Number of Rooms:</label>
                             <Form.Control  type="number" id={`numberOfRooms${index}`} value={block.numberOfRooms} onChange={(e) => handleChange(index, 'numberOfRooms', e.target.value)} required />
                        </div>
                        </div>
                    ))}
                    <button type="button" onClick={addBlock} >Add Block</button><br /><br />

                    <button type="submit" onClick={handleSubmit} class="w-100 btn-primary">Create Hostel</button>
                </div>
                </form>
                </div>
        </>
    );
}

export default CreateHostelForm;
