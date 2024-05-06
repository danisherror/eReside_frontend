import "../css/profile.css"
import { useStatus } from '../Auth/Auth';
import backgroundImage from '../assets/img/signin.png';
import Navbar from "../Logins/Navbar";
import React, { useEffect, useState } from 'react'
import { Alert } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
// import {Qrcode} from 'qrcode'
import QRCode from 'qrcode.react';
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
    const [qrCodeText, setQRCodeText] = useState('');
    const getdata = async () => {
        const res = await fetch(`/api/v1/studentProfile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);
        if (res.status === 404) {
            alert("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setStudentDetail(data.user)
            setQRCodeText(data.user._id)
            console.log("get data");
        }
    }
    const downloadQRCode = () => {
        const qrCodeURL = document.getElementById('qrCodeEl')
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = "QR_Code.png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }
    useEffect(() => {
        getdata();
    }, [])

    return (
        <>

            <Navbar />
            <div class="student-profile py-4" style={{
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
                                <div class="card-body">
                                    <p class="mb-0"><strong class="pr-1">Hostel Status:</strong>{getuserdata.status}</p>
                                    <p class="mb-0"><strong class="pr-1"></strong>
                                    </p>
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
                                                    <NavLink to={`/editStudentProfile`}> <button className="btn btn-primary" >edit</button></NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th width="30%">Change User Image</th>
                                            <td width="2%">:</td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={`/editImage`}> <button className="btn btn-primary" >change image</button></NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>

                                            <th width="30%">Apply for hostel</th>
                                            <td width="2%">:</td>
                                            <td>
                                                <div className="add_btn" align="center">
                                                    <NavLink to={`/applyHostel`}> <button className="btn btn-primary" >Apply for hostel</button></NavLink>
                                                </div>
                                            </td>

                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <br></br>
                            <div class="card shadow-sm">
                                <div class="card-header bg-transparent border-0">
                                    <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Student Information</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <table class="table table-bordered">
                                        <tr>
                                            <th width="30%">Student ID</th>
                                            <td width="2%">:</td>
                                            <td>{getuserdata.collegeid}</td>
                                        </tr>
                                        <tr>
                                            <th width="30%">Semester</th>
                                            <td width="2%">:</td>
                                            <td>{getuserdata.semester}</td>
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
                                        <tr>
                                            <th width="30%">Token</th>
                                            <td width="2%">:</td>
                                            <td>
                                            <QRCode  id="qrCodeEl" size={150} value={qrCodeText} renderAs="canvas" />,</td>
                                        </tr>
                                        {/* <tr>
                                                <input
                                                    type="button"
                                                    className="download-btn"
                                                    value="Download"
                                                    onClick={downloadQRCode}
                                                /></tr> */}
                                    </table>
                                </div>
                            </div>
                            {/* <div>
                                <h1>QRCode</h1>
                                <Qrcode value={data} />
                                <div style={{ marginTop: "2em" }}>
                                    <input
                                        value={data}
                                        style={{ width: "300px" }}
                                        onChange={(e) => {
                                            setData(e.target.value);
                                        }}
                                    />
                                </div>
                                <p>{data}</p>
                            </div> */}


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage