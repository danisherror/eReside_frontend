import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import { NavLink } from 'react-router-dom'

const TableOne = () => {
    const storeIdInLs = useID();
    const [roomissues, setRoomIssues] = useState([]);
    const [hostelNames, setHostelNames] = useState([]);
    const [filteredHostelDetails, setFilteredHostelDetails] = useState([]);
    const [filter, setFilter] = useState('all');
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/showStudentAnnouncements`, {
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
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setRoomIssues(data.result)
            setHostelNames(data.hostelName || []);
        }
    }

    useEffect(() => {
        getdata();
    }, [])
    useEffect(() => {
        applyFilters();
    }, [roomissues, filter]);
    const applyFilters = () => {
        let filteredData = roomissues;
        if (filter !== 'all') {
            filteredData = filteredData.filter(hostel => hostel.hostelName === filter);
        }
        setFilteredHostelDetails(filteredData);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Announcements" />
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
                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                For Hostel
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Immage
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                announcement
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredHostelDetails.map((issuesEntry, key) => (
                            <tr key={key}>

                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {issuesEntry.hostelName}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="h-12.5 w-15 rounded-md">
                                        <img src={issuesEntry.url} alt="Announcements" />
                                    </div>
                                </td>


                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {issuesEntry.announcement}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default TableOne;

