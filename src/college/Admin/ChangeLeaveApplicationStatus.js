import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";
import Navbar from "../Logins/ANavbar"

import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const ChangeLeaveApplicationStatus = () => {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");

    const id = localStorage.getItem('id');

    const validateDates = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return false;
        }

        if (endDateObj < startDateObj) {
            alert("End date cannot be before start date.");
            return false;
        }

        return true;
    };
    const submitFeedback = async (e) => {
        e.preventDefault();
        if (!validateDates()) {
            return;
        }
        const token = localStorage.getItem('token');
        console.log(startDate,endDate,reason)
        const response = await fetch(`https://ereside-backend.onrender.com/api/v1/updateleaveappliacation/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startDate:startDate,
                endDate:endDate,
                reason:reason,
                status:status
            }),
        });

        const data = await response.json();

        if (response.status === 422 || !data) {
            console.log("Error submitting Leave Application");
        } else {
            alert("Leave Application submitted successfully")
            console.log("Leave Application submitted successfully:", data);
            navigate('/ahomepage');
            // Optionally, you can handle success actions here
        }
    };
    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getsingleleaveapplication/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            // setINP(data.user)
            setStartDate(data.result.startDate);
            setEndDate(data.result.endDate);
            setReason(data.result.reason);
            setStatus(data.result.status);
            console.log("get data");

        }
    }

      useEffect(() => {
        getdata();
    }, []);


    return (
        <> <Navbar />
        <div className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <form className="shadow p-4 bg-white rounded">
                <div className="h4 mb-2 text-center">Edit Room Complaint</div>
                <div class="mb-1">
                    <Form.Label>Start Date</Form.Label>
                    <input
                                id="startdate"
                                label="Choose Starting Date"
                                type="Date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="w-64"
                            />
                </div>
                <div class="mb-1">
                    <Form.Label>End Date</Form.Label>
                    <input
                                id="enddate"
                                label="Choose Ending Date"
                                value={endDate}
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="w-64"
                            />
                </div>
                <div class="mb-1">
                    <Form.Label>Status</Form.Label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: "100%", padding: "10px" }}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <div class="mb-1">
                    <label for="exampleInputPassword1" class="form-label">Reason</label>
                    <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason"
                            style={{ width: "100%", minHeight: "200px", padding: "10px" }}
                        />
                </div>
                <button type="submit" onClick={submitFeedback} class="w-100 btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default ChangeLeaveApplicationStatus