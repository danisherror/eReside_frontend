import "../css/profile.css"
import Navbar from "../Logins/Navbar"
import React, { useEffect, useState } from 'react'
import { useID } from '../Auth/Auth';
import { NavLink } from 'react-router-dom'
import Issue from "../assets/img/Issue.jpg";
import Room1 from "../assets/img/Room1.png";
import Room3 from "../assets/img/Room3.png";
import Room4 from "../assets/img/Room4.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const PrintRoomComplaints = () => {


    const storeIdInLs = useID();
    const [roomissues, setRoomIssues] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const images = [Room1, Room3, Room4];
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
    const getdata = async () => {

        const res = await fetch(`/api/v1/getcomplain`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);
        if (res.status === 404) {
            console.error("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setRoomIssues(data.result)
            console.log(roomissues)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])





    return (
        <>
            <Navbar />
            <div style={containerStyle}>

                <div style={leftHalfStyle}>
                    <div class="card shadow-sm">
                        <div class="card-header bg-transparent border-0">
                            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Room Issue Data</h3>
                        </div>
                        <div class="card-body pt-0">
                            <table class="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>issues</th>
                                        <th>status</th>
                                        <th>edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomissues.map((issuesEntry, index) => (
                                        <tr key={index}>
                                            <td>{issuesEntry.title}</td>
                                            <td>{issuesEntry.description}</td>
                                            <td>{issuesEntry.status}</td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={"/editStudentComplaint"}> <button className="btn btn-primary" onClick={() => storeIdInLs(issuesEntry._id)} >edit</button></NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
    )
}

export default PrintRoomComplaints