import "../css/profile.css"
import Navbar from "../Logins/ANavbar"
import React, { useEffect, useState } from 'react'
import { useID } from '../Auth/Auth';
import { NavLink } from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css";

const PrintLeaveApplications = () => {


    const storeIdInLs = useID();
    const [leaveData, setLeaveData] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`/api/v1/getallstudentleaveapplication`, {
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
            setLeaveData(data.result)
            console.log(leaveData)
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
                            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Student Leave Application</h3>
                        </div>
                        <div class="card-body pt-0">
                        <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>

                            <table class="table table-bordered">

                                <thead>
                                    <tr>
                                    <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>edit</th>
                                        {/* <th>Change Status</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveData.map((issuesEntry, index) => (
                                        <tr key={index}>
                                            <td>{issuesEntry.startDate}</td>
                                            <td>{issuesEntry.endDate}</td>
                                            <td>{issuesEntry.reason}</td>
                                            <td>{issuesEntry.status}</td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={"/changeleaveApplicationStatus"}> <button className="btn btn-primary" onClick={() => storeIdInLs(issuesEntry._id)} >edit</button></NavLink>
                                                </div>
                                            </td>
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

export default PrintLeaveApplications