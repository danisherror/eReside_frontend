import "../css/profile.css"
import Navbar from "../Logins/ANavbar"
import React, { useEffect, useState } from 'react'
import { useID } from '../Auth/Auth';
import { NavLink } from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css";

const GetHostelDetails = () => {
    const storeIdInLs = useID();
    const [hostelDetails, setHostelDetails] = useState([]);
    const [hostelNames, setHostelNames] = useState([]);
    const [filteredHostelDetails, setFilteredHostelDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`/api/v1/getHostelDetails`, {
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
            setLoading(false);
        }

        if (res.status === 422 || !data) {
            console.log("error ");
            setLoading(false);

        } else {
            setHostelDetails(data.all_hostel || []);
            setHostelNames(data.hostel_names || []);
            setLoading(false);
            console.log("get data");
        }
    }



    useEffect(() => {
        getdata();
    }, [])
    useEffect(() => {
        applyFilters();
    }, [hostelDetails, filter, searchTerm]);
    const applyFilters = () => {
        let filteredData = hostelDetails;
        if (filter !== 'all') {
            filteredData = filteredData.filter(hostel => hostel.hostelName === filter);
        }
        if (searchTerm) {
            filteredData = filteredData.filter(hostel =>
                Object.values(hostel).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        filteredData.sort((a, b) => b.studentIds.length - a.studentIds.length);
        setFilteredHostelDetails(filteredData);
    };
    const generateReport = () => {
        const reportData = filteredHostelDetails.map(hostel => ({
            'Hostel Name': hostel.hostelName,
            'Block': hostel.block,
            'Room No': hostel.roomNumber,
            'Room Capacity': hostel.capacity,
            'Student Present': hostel.studentIds.length,
            // Add more fields as needed
        }));

        const csv = convertToCSV(reportData);
        const fileName = 'hostel_report.csv';
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
        return `${header}\n${rows}`;
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }





    return (
        <>
            <Navbar />
            <div>
                <div class="card shadow-sm">
                    <div class="card-header bg-transparent border-0">
                        <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Hostel Details</h3>
                    </div>
                    <div class="card-body pt-0">

                        <div className="filter-container d-flex justify-content-end">
                            <div className="mr-3">
                                <label>
                                    Filter by Hostel Name:
                                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                        <option value="all">All</option>
                                        {hostelNames.map((hostel, index) => (
                                            <option key={index} value={hostel}>{hostel}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Search:
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>

                                <button className="btn btn-primary ml-3" onClick={generateReport}>Generate Report</button>
                            </div>
                        </div>
                        <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>

                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Hostel Name</th>
                                        <th>Block</th>
                                        <th>Room No</th>
                                        <th> Room Capacity</th>
                                        <th>Student Present</th>
                                        <th>Student Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHostelDetails.map((hostel, index) => (
                                        <tr key={index}>
                                            <td>{hostel.hostelName}</td>
                                            <td>{hostel.block}</td>
                                            <td>{hostel.roomNumber}</td>
                                            <td>{hostel.capacity}</td>
                                            <td>{hostel.studentIds.length}</td>

                                            {hostel.studentIds.length === 1 ? (
                                                <td>
                                                    <div className="add_btn" align="center">
                                                        <NavLink to={"/ShowStudentProfile"}>
                                                            <button className="btn btn-primary" onClick={() => storeIdInLs(hostel.studentIds[0])}>Student</button>
                                                        </NavLink>
                                                    </div>
                                                </td>
                                            ) : hostel.studentIds.length === 2 ? (
                                                <td>
                                                    <div className="add_btn" align="center">
                                                        <NavLink to={"/ShowStudentProfile"}>
                                                            <button className="btn btn-primary" onClick={() => storeIdInLs(hostel.studentIds[0])}>Student</button>
                                                        </NavLink>
                                                    </div>

                                                    <br></br>
                                                    <div className="add_btn" align="center">
                                                        <NavLink to={"/ShowStudentProfile"}>
                                                            <button className="btn btn-primary" onClick={() => storeIdInLs(hostel.studentIds[1])}>Student</button>
                                                        </NavLink>
                                                    </div>

                                                </td>
                                            ) : <td></td>
                                            }

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetHostelDetails