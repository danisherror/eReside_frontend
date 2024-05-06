import React, { useEffect, useState } from 'react'
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import QrtokenByDate from "../../Admin/Scanner/GetAllQrcodes"
import QrtokenByTime from "../../Admin/Scanner/GetAllQrcodesBytime";
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/AdminLayout';
import ReactApexChart from 'react-apexcharts';
const ECommerce: React.FC = () => {

  const [feedback, setfeedback] = useState("");
  const [leaveData, setLeaveData] = useState("");
  const [studentdetail, setStudentDetails] = useState("");
  const [roomissues, setRoomIssues] = useState("");
  const [hostelDetails, setHostelDetails] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [insummary, setInsummary] = useState("");
  const [outsummary, setOutsummary] = useState("");
  const getToken = () => {
    return localStorage.getItem('token');
  }
  const token = getToken();


  const getfeedback = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getstudentfeedback`, {
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
      setfeedback(data.result.length)
    }
  }
  const getleave = async () => {

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
      setLeaveData(data.result.length)
    }
  }
  const getstudent = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getstudentprofiles`, {
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
      setStudentDetails(data.user.length);
    }
  }
  const getroomissues = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getstudentroomissues`, {
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
      setRoomIssues(data.result.length)
    }
  }
  const gethostel= async () => {
    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getUniqueHostelNames`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    data.hostelName.pop()
    setHostelDetails(data.hostelName.length);
}
const getannouncement = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/showAllAnnouncements`, {
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
    setAnnouncement(data.result.length)
  }
}
const getinoutsummary = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/agetinoutsummary`, {
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
    setInsummary(data.in)
    setOutsummary(data.out);
  }
}

  useEffect(() => {
    getfeedback();
    getleave();
    getstudent();
    getroomissues();
    gethostel();
    getannouncement();
    getinoutsummary();
  }, [])
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Hostels" total={hostelDetails}>
        </CardDataStats>
        <CardDataStats title="Room Complaints" total={roomissues}>
        </CardDataStats>
        <CardDataStats title="Students Registered" total={studentdetail}>
        </CardDataStats>
        <CardDataStats title="Leave Applications" total={leaveData}>
        </CardDataStats>
        <CardDataStats title="Feedbacks" total={feedback}>
        </CardDataStats>
        <CardDataStats title="Announcements" total={announcement}>
        </CardDataStats>
        <CardDataStats title="Student Inside" total={insummary}>
        </CardDataStats>
        <CardDataStats title="Student Outside" total={outsummary}>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <QrtokenByDate />
        <QrtokenByTime />
        {/* <ChartTwo /> */}
        {/* <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
