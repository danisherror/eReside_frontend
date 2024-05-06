import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/WardenLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import { NavLink } from 'react-router-dom'

const TableOne = () => {
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

    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetHostelDetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 404) {
            console.error("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
            setLoading(false);
        }

        if (res.status === 422 || !data) {
            console.log("error ");
            setLoading(false);

        } else {
            setHostelDetails(data.result || []);
            setHostelNames(data.hostel_names || []);
            setLoading(false);
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
        <DefaultLayout>
            <Breadcrumb pageName="Hostel Details" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-end gap-4.5 mb-2.5">
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                    >
                        Filter by Hostel Name:
                    </label>
                    <div className="relative">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        >
                            <option value="all">All</option>
                            {hostelNames.map((hostel, index) => (
                                <option key={index} value={hostel}>{hostel}</option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="flex justify-end gap-4.5 mb-2.5">
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                    >
                       Search:
                    </label>
                    <div className="relative">
                    <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"

                          value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Devid Jhon"
                          defaultValue="Devid Jhon"
                        />
                    </div>

                </div>
                <div className="flex justify-end gap-2.5">
                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" onClick={generateReport}>Generate Report</button>
                    </div>
                <br></br>

                <table className="w-full table-auto">
                    <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Hostel Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Block
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Room No
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Room Capacity
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Student Present
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Student Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHostelDetails.map((hostel, key) => (
                                <tr key={key}>

                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {hostel.hostelName}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {hostel.block}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {hostel.roomNumber}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {hostel.capacity}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {hostel.studentIds.length}
                                        </p>
                                    </td>



                                    {hostel.studentIds.length === 1 ? (
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="add_btn" align="center">
                                                <NavLink to={"/ShowStudentProfile"}>
                                                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" onClick={() => storeIdInLs(hostel.studentIds[0])}>Student</button>
                                                </NavLink>
                                            </div>
                                        </td>
                                    ) : hostel.studentIds.length === 2 ? (
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="add_btn" align="center">
                                                <NavLink to={"/ShowStudentProfile"}>
                                                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" onClick={() => storeIdInLs(hostel.studentIds[0])}>Student</button>
                                                </NavLink>
                                            </div>

                                            <br></br>
                                            <div className="add_btn" align="center">
                                                <NavLink to={"/ShowStudentProfile"}>
                                                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" onClick={() => storeIdInLs(hostel.studentIds[1])}>Student</button>
                                                </NavLink>
                                            </div>

                                        </td>
                                    ) : <td></td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default TableOne;

