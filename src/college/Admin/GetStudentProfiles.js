import "../css/profile.css"
import Navbar from "../Logins/ANavbar"
import React, { useEffect, useState } from 'react'
import { useID } from '../Auth/Auth';
import { NavLink } from 'react-router-dom'

import "react-responsive-carousel/lib/styles/carousel.min.css";

const Getstudentprofiles = () => {


    const storeIdInLs = useID();
    const [studentdetail, setStudentDetails] = useState([]);
    const [filteredstudentdetail, setFilteredstudentdetail] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getstudentprofiles`, {
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
            setStudentDetails(data.user)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    useEffect(() => {
        applyFilters();
    }, [studentdetail, searchTerm]);


    const applyFilters = () => {
        let filteredData = studentdetail;
        if (searchTerm) {
            filteredData = studentdetail.filter((student) =>
                Object.values(student).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        setFilteredstudentdetail(filteredData);
    };

    const generateReport = () => {
        const reportData = studentdetail.map(student => ({
            'Student Name': student.name,
            'Student ID': student.collegeid,
            'Email': student.email,
            'Phone': student.phone,
            'Semester': student.semester
        }));

        const csv = convertToCSV(reportData);
        const fileName = 'student_report.csv';
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






    return (
        <>
            <Navbar />
            <div >

                <div>
                    <div class="card shadow-sm">
                        <div class="card-header bg-transparent border-0">
                            <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Student Details</h3>
                        </div>
                        <div class="card-body pt-0">

                            <div className="filter-container d-flex justify-content-end">
                                <div className="mr-3">
                                    <label>
                                        Search:
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <button className="btn btn-primary" onClick={generateReport}>Generate Report</button>
                            </div>
                            <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>

                                <table class="table table-bordered">

                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Student ID</th>
                                            <th>Hostel Status</th>
                                            <th>Edit Profile</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredstudentdetail.map((studenti, index) => (
                                            <tr key={index}>
                                                <td>{studenti.name}</td>
                                                <td>{studenti.collegeid}</td>
                                                <td>{studenti.status}</td>
                                                <td>
                                                    <div className="add_btn" align="center">
                                                        <NavLink to={"/changeStudentStatus"}> <button className="btn btn-primary" onClick={() => storeIdInLs(studenti._id)} >edit</button></NavLink>
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

export default Getstudentprofiles