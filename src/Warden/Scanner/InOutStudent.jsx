import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import React, { useEffect, useState } from 'react';

const TableThree = () => {
    const [inout, setinout] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    const id = localStorage.getItem('id');
    const getdata = async () => {
        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetinoutdetail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 404) {
            alert("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setinout(data.array.reverse())
        }

    }
    useEffect(() => {
        getdata();
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Check-in and Check-out" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Out Date
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Out Time
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    In Date
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    In Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inout.map((inout, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {inout.out_date}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-4 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {inout.out_time}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-2 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {inout.in_date}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-2 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {inout.in_time}
                                        </h5>
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

export default TableThree;
