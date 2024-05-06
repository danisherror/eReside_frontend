import React, { useEffect,useState } from "react";
import Navbar from "../Logins/Navbar"
import Leave from "../assets/img/leave.jpg";
import Leave1 from "../assets/img/Leave1.png";
import Leave2 from "../assets/img/Leave2.png";
import Leave3 from "../assets/img/Leave3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {  useNavigate } from 'react-router-dom'

const EditLeaveApplication = () => {
    const id=localStorage.getItem("id")
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const images = [Leave1, Leave2, Leave3];
    const navigate = useNavigate();

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
        backgroundImage: `url(${Leave})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
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
    const submitLeave = async (e) => {
        e.preventDefault();
        if (!validateDates()) {
            return;
        }
        const token = localStorage.getItem('token');
        console.log(startDate,endDate,reason)
        const response = await fetch(`/api/v1/updateleaveappliacation/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startDate,
                endDate,
                reason
            }),
        });

        const data = await response.json();

        if (response.status === 422 || !data) {
            console.log("Error submitting Leave Application");
        } else {
            alert("Leave Application submitted successfully")
            console.log("Leave Application submitted successfully:", data);
            navigate('/uhomepage');
            // Optionally, you can handle success actions here
        }
    };
    const getdata = async () => {

        const res = await fetch(`/api/v1/getsingleleaveapplication/${id}`, {
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
            console.log("get data");
    
        }
    }
    
      useEffect(() => {
        getdata();
    }, []);

    return (
        <><Navbar />
        <div style={containerStyle}>
            <div style={leftHalfStyle}>
                
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "100px" }}>
                <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>Leave Application</h1>
                    <div>
                        <div>start date:    
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
                        
                        <div>
                            end date  :     
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
                    </div>
                    <div style={{ marginBottom: "20px", width: "300px" }}>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason"
                            style={{ width: "100%", minHeight: "200px", padding: "10px" }}
                        />
                    </div>
                    <button
                        onClick={submitLeave}
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

export default EditLeaveApplication;
