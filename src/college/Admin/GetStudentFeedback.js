import "../css/profile.css"
import Navbar from "../Logins/ANavbar"
import React, { useEffect, useState } from 'react'
import { useID } from '../Auth/Auth';
import { NavLink } from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css";

const PrintRoomComplaints = () => {


    const storeIdInLs = useID();
    const [roomissues, setRoomIssues] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getstudentfeedback`, {
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
            <div >

                <div>
                    <div class="card shadow-sm">
                        <div class="card-header bg-transparent border-0">
                            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Student Feedbacks</h3>
                        </div>
                        <div class="card-body pt-0">
                        <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>

                            <table class="table table-bordered">

                                <thead>
                                    <tr>
                                        <th>Rating</th>
                                        <th>Review</th>
                                        {/* <th>Change Status</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomissues.map((issuesEntry, index) => (
                                        <tr key={index}>
                                            <td>{issuesEntry.rating}</td>
                                            <td>{issuesEntry.review}</td>
                                            {/* <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={"/changeStudentStatus"}> <button className="btn btn-primary" onClick={() => storeIdInLs(issuesEntry._id)} >edit</button></NavLink>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PrintRoomComplaints