import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import { NavLink } from 'react-router-dom'

const TableOne = () => {

  const storeIdInLs = useID();
    const [leaveData, setLeaveData] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getallstudentleaveapplication`, {
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
            setLeaveData(data.result)
        }
    }

    useEffect(() => {
        getdata();
    }, [])



  return (
    <DefaultLayout>
        <Breadcrumb pageName="Leave Applications" />
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Start Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            End Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Reason
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            edit
            </h5>
          </div>
        </div>
        {leaveData.map((leaveEntry, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === leaveData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {leaveEntry.startDate}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{leaveEntry.endDate}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{leaveEntry.reason}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {/* {leaveEntry.status==='Pending'? (
                <p className="text-meta-1">{leaveEntry.status}</p>
              ):<p className="text-meta-3">{leaveEntry.status}</p>} */}
              <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      leaveEntry.status === 'Pending'
                        ? 'bg-danger text-danger'
                        :
                        'bg-success text-success'

                    }`}
                  >
                    {leaveEntry.status}
                  </p>

            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <div className="flex justify-center gap-4.5">
                            {/* <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={submitLeave}
                            >
                                Save
                            </button> */}
                             <NavLink to={"/changeleaveApplicationStatus"}>
                             <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                              onClick={() => storeIdInLs(leaveEntry._id)} >
                              edit</button></NavLink>
                        </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default TableOne;

