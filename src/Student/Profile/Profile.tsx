import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
const Profile = () => {
  const [getuserdata, setStudentDetail] = useState({});
  const [getHostel, setHostel] = useState([{
    hostelName: "None", block: "None", roomNumber: "None"
  }]);
  const getToken = () => {
    return localStorage.getItem('token');
  }
  const token = getToken();


  const [qrCodeText, setQRCodeText] = useState('');
  const getdata = async () => {
    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/studentProfile`, {
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
      setStudentDetail(data.user)
      setQRCodeText(data.user._id)
    }


    const id = data.user._id
    const res2 = await fetch(`https://ereside-backend.onrender.com/api/v1/getStudentHostel/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      }
    });
    const data2 = await res2.json();
    if (data2.result.length === 1) {
      setHostel(data2.result);
    }
    else {
      const ans1 = [{
        hostelName: "None", block: "None", roomNumber: "None"
      },]
      setHostel(ans1);
    }
  }
  useEffect(() => {
    getdata();
  }, [])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={getuserdata.url} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {getuserdata.name}
            </h3>
            {/* <p className="font-medium">Ui/Ux Designer</p> */}
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Student ID</span>
                <span className="font-semibold text-black dark:text-white">
                  {getuserdata.collegeid}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Semester</span>
                <span className="font-semibold text-black dark:text-white">
                  {getuserdata.semester}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">email</span>
                <span className="font-semibold text-black dark:text-white">
                  {getuserdata.email}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Phone No</span>
                <span className="font-semibold text-black dark:text-white">
                  {getuserdata.phone}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Hostel Name</span>
                <span className="font-semibold text-black dark:text-white">
                  {getHostel[0].hostelName}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Block</span>
                <span className="font-semibold text-black dark:text-white">
                  {getHostel[0].block}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Room No</span>
                <span className="font-semibold text-black dark:text-white">
                  {getHostel[0].roomNumber}
                </span>
              </div>

            </div>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-1 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">

              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="text-sm">Token</span>
                <span className="font-semibold text-black dark:text-white">
                  <QRCode id="qrCodeEl" size={150} value={qrCodeText} renderAs="canvas" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
