import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/WardenLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import { NavLink } from 'react-router-dom'

const TableOne = () => {

  const storeIdInLs = useID();
  const [studentdetail, setStudentDetails] = useState([]);
  const [filteredstudentdetail, setFilteredstudentdetail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getToken = () => {
    return localStorage.getItem('token');
  }
  const token = getToken();

  const getdata = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetstudentprofiles`, {
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
    <DefaultLayout>
      <Breadcrumb pageName="Room Complaints" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end gap-4.5 mb-2.5">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="fullName"
          >
            Search:
          </label>
          <div className="relative">
            <input type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />


          </div>
        </div>
        <div className="flex justify-end gap-2.5">
          <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" onClick={generateReport}>Generate Report</button>
        </div>
        <br></br>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Student Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Student ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Full Profile
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                In-Out Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredstudentdetail.map((studenti, key) => (
              <tr key={key}>

                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {studenti.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {studenti.collegeid}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                  {/* <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={submitLeave}
                            >
                                Save
                            </button> */}
                  <NavLink to={"/wShowStudentProfile"}>
                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      onClick={() => storeIdInLs(studenti._id)} >
                      Profile</button></NavLink>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <NavLink to={"/wgetinoutdetail"}>
                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      onClick={() => storeIdInLs(studenti._id)} >
                      In-Out Detail</button></NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default TableOne;

