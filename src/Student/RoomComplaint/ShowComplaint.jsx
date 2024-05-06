import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const TableOne = () => {
  const storeIdInLs = useID();
  const navigate = useNavigate();
  const [roomissues, setRoomIssues] = useState([]);
  const getToken = () => {
    return localStorage.getItem('token');
  }
  const token = getToken();

  const getdata = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getcomplain`, {
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
    }
  }
  const deletecomplaint = async (id) => {
    const data=roomissues.find(issue => issue._id === id);
    if (data.status === "Closed") {
      alert("This complaint is already closed, cannot be deleted");
    }
    else
    {
      const confirmation = window.confirm("Are you sure you want to delete this Room Complaint?");
      if (confirmation) {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/deleteComplaint/${id}`, {
          method: "DELETE",
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
          alert("Complaint deleted successfully")
          navigate('/uhomepage');
        }
      }
    }
  }

  useEffect(() => {
    getdata();
  }, [])


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Room Complaints" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Issue
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Edit
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {roomissues.map((issuesEntry, key) => (
                <tr key={key}>

                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {issuesEntry.title}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {issuesEntry.description}
                    </p>
                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${issuesEntry.status === 'Pending'
                        ? 'bg-danger text-danger'
                        :
                        'bg-success text-success'

                        }`}
                    >
                      {issuesEntry.status}
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
                    <NavLink to={"/editStudentComplaint"}>
                      <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={() => storeIdInLs(issuesEntry._id)} >
                        edit</button></NavLink>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      onClick={() => deletecomplaint(issuesEntry._id)}
                     >
                      Delete</button>
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

