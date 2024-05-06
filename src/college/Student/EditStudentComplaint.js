import React, { useState,useEffect } from "react";
import Navbar from "../Logins/Navbar"
import Issue from "../assets/img/Issue.jpg";
import Room1 from "../assets/img/Room1.png";
import Room2 from "../assets/img/Room2.png";
import Room3 from "../assets/img/Room3.png";
import Room4 from "../assets/img/Room4.png";
import Box from '@mui/material/Box';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {  useNavigate } from 'react-router-dom'

const EditStudentComplaint = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const images = [Room1, Room2, Room3, Room4];


    const containerStyle = {
        display: 'flex',
        height: '100vh',
    };

    const halfStyle = {
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        border: 'none', // Set border to none to make it invisible
    };

    const leftHalfStyle = {
        ...halfStyle,
        backgroundColor: '#f2f2f2', // Optional: Add background color for the left half

    };

    const rightHalfStyle = {
        ...halfStyle,
        width: '50%', // Adjust the width to your preference
        backgroundImage: `url(${Issue})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const id=localStorage.getItem("id")
    const submitFeedback = async () => {
        console.log(review)
        const response = await fetch(`/api/v1/updatecomplaint/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:title,
                description: review,
            }),
        });

        const data = await response.json();

        if (response.status === 422 || !data) {
            console.log("Error submitting feedback");
        } else {
            console.log("Feedback submitted successfully:", data);
            navigate('/uhomepage');
            // Optionally, you can handle success actions here
        }
    };
    const getdata = async () => {

        const res = await fetch(`/api/v1/getsinglecomplain/${id}`, {
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
            console.log(review);
            console.log("get data");

        }
    }

      useEffect(() => {
        getdata();
    }, []);

    return (
        <>
        <Navbar />
        <div style={containerStyle}>
            <div style={leftHalfStyle}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "100px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Room Issue</h1>
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                        </Box>
                    </div>
                    <div style={{ marginBottom: "20px", width: "300px" }}>
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
                    <div style={{ marginBottom: "20px", width: "300px" }}>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Issue"
                            style={{ width: "100%", minHeight: "200px", padding: "10px" }}
                        />
                    </div>
                    <button
                        onClick={submitFeedback}
                        style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div style={rightHalfStyle}>
                {/* Content for the right half goes here */}
                <div >
                    <div className="w-3/4 z-0">
                        <Carousel
                            autoPlay={true}
                            infiniteLoop={true}
                            interval={3000}
                            showThumbs={false}
                            showStatus={false}
                            showArrows={false}
                            className="z-0"
                        >
                            {images.map((item, index) => (
                                <div key={index}>
                                    <img
                                        src={item}
                                        alt={`Room ${index + 1}`}
                                        className=""
                                        style={{ width: '75%', height: 'auto' }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default EditStudentComplaint;
