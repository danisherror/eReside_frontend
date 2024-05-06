import "../css/profile.css"
import Navbar from "../Logins/ANavbar";
import { useStatus } from '../Auth/Auth';
import backgroundImage from '../assets/img/signin.png';
import React, { useEffect, useState } from 'react'
import { Alert } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
const axios = require('axios')

const HomePage = () => {

    const statusStd = localStorage.getItem("status")
    const [getuserdata, setStudentDetail] = useState({});
    console.log("dsdsds ", getuserdata);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    const storeTokenInLS = useStatus();
    console.log(token)
    const getdata = async () => {
        const res = await fetch(`/api/v1/adminprofile`, {
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
            setStudentDetail(data.user)
            storeTokenInLS(data.user.status)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <>
            {/* {backgroundColor:"#34A2BD"} */}

            <Navbar />

            <div class="student-profile py-4"
            style={{
                backgroundImage: `url(${backgroundImage})`, position: 'fixed',
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
            }} >
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="card shadow-sm">
                                <div class="card-header bg-transparent text-center">
                                    <img class="profile_img" src={getuserdata.url} alt="" />
                                    <h3>{getuserdata.name}</h3>
                                </div>
                            </div>
                        </div>



                        <div class="col-lg-8">

                            <div class="card shadow-sm">
                                <div class="card-header bg-transparent border-0">
                                    <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Options</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <table class="table table-bordered">
                                        <tr>
                                            <th width="30%">Edit Profile</th>
                                            <td width="2%">:</td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={`/editAdminProfile`}> <button className="btn btn-primary" >edit</button></NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th width="30%">Change User Image</th>
                                            <td width="2%">:</td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={`/aeditImage`}> <button className="btn btn-primary" >change image</button></NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <br></br>
                            <div class="card shadow-sm">
                                <div class="card-header bg-transparent border-0">
                                    <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Admin Information</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <table class="table table-bordered">
                                        <tr>
                                            <th width="30%">Employee ID</th>
                                            <td width="2%">:</td>
                                            <td>{getuserdata.collegeid}</td>
                                        </tr>
                                        <tr>
                                            <th width="30%">email</th>
                                            <td width="2%">:</td>
                                            <td>{getuserdata.email}</td>
                                        </tr>
                                        <tr>
                                            <th width="30%">Phone No</th>
                                            <td width="2%">:</td>
                                            <td>{getuserdata.phone}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage