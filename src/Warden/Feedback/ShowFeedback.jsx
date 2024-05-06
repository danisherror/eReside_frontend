import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/WardenLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';

const TableOne = () => {
  const storeIdInLs = useID();
  const [roomissues, setRoomIssues] = useState([]);
  const getToken = () => {
      return localStorage.getItem('token');
  }
  const token = getToken();

  const getdata = async () => {

      const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetstudentfeedback`, {
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

  useEffect(() => {
      getdata();
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Feedback Data" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Rating
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Review
              </th>
            </tr>
          </thead>
          <tbody>
            {roomissues.map((issuesEntry, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {issuesEntry.rating}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {issuesEntry.review}
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

