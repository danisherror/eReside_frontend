import React, { useEffect, useState } from 'react'
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import GetAllQrcodes from "../../Warden/Scanner/GetAllQrcodes";
import GetAllQrcodesByTime from "../../Warden/Scanner/GetAllQrcodesByTime"
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/WardenLayout';

const ECommerce: React.FC = () => {
  const [roomissues, setRoomIssues] = useState("");
  const [studentdetail, setStudentDetails] = useState("");
  const [leaveData, setLeaveData] = useState("");
  const [feedback, setfeedback] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const getToken = () => {
    return localStorage.getItem('token');
}
const token = getToken();
const getroomissues = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetstudentroomissues`, {
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
      setRoomIssues(data.result.length)
  }
}
const getstudent = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetstudentprofiles`, {
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
    setStudentDetails(data.user.length)
  }
}
const getleave = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetallleaveapplication`, {
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
      setLeaveData(data.result.length)
  }
}
const getfeedback = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/wgetstudentfeedback`, {
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
    setfeedback(data.result.length)
  }
}
const getannouncement = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/showwardenAnnouncements`, {
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
    setAnnouncement(data.result.length)
  }
}
useEffect(() => {
  getroomissues();
  getstudent();
  getleave();
  getfeedback();
  getannouncement();
}, [])
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
      <CardDataStats title="Room Complaints" total={roomissues}>
        </CardDataStats>
        <CardDataStats title="Students" total={studentdetail}>
        </CardDataStats>
        <CardDataStats title="Leave Applications" total={leaveData}>
        </CardDataStats>
        <CardDataStats title="Feedbacks" total={feedback}>
        </CardDataStats>
        <CardDataStats title="Announcements" total={announcement}>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <GetAllQrcodes />
        <GetAllQrcodesByTime />
        {/* <ChartTwo />
        <ChartThree />
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
