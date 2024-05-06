import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";
import Navbar from "../Logins/ANavbar"

import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const ChangeRoomIssueStatus = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [status, setStatus] = useState("");

    const id = localStorage.getItem('id');


    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getsinglecomplain/${id}`, {
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
            setTitle(data.result.title)
            setReview(data.result.description)
            setStatus(data.result.status)
            // console.log(review);
            // console.log(title);
            // console.log(status);
            // console.log(data.result);
            // console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const submitFeedback = async (e) => {

        console.log(review)
        console.log(title)
        console.log(status)
        try {
            e.preventDefault();
        const response = await fetch(`https://ereside-backend.onrender.com/api/v1/editstudentcomplaintstatus/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: review,
                status: status
            }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === 404) {
            console.log("Error submitting feedback");
        } else {
            console.log("Feedback submitted successfully:", data);
            alert("Feedback submitted successfully_______")
            navigate('/ahomepage');
        }
        // alert("asdasdasd")
        // navigate('/ahomepage');
    } catch (error) {
        console.error('Error:', error);

    }
    };

    return (
        <> <Navbar />
        <div className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <form className="shadow p-4 bg-white rounded">
                <div className="h4 mb-2 text-center">Edit Room Complaint</div>
                <div class="mb-1">
                    <Form.Label>Title</Form.Label>
                    <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                        style={{ width: "100%", padding: "10px" }}
                    >
                        <option value="">Select Title</option>
                        <option value="Room Cleaning">Room Cleaning</option>
                        <option value="Electronics Not Working">Electronics Not Working</option>
                        <option value="Animals Problem">Animals Problem</option>
                        <option value="Others">Others</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div class="mb-1">
                    <Form.Label>Status</Form.Label>
                    {/* <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                        >
                            <option value="">Select Title</option>
                            <option value="Pending">Pending</option>
                            <option value="Closed">Closed</option>

                        </select> */}
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
                    <label for="exampleInputPassword1" class="form-label">Issue</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Issue"
                        style={{ width: "100%", minHeight: "200px", padding: "10px" }}
                    />
                </div>
                <button type="submit" onClick={submitFeedback} class="w-100 btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default ChangeRoomIssueStatus