import React, { useEffect, useState } from 'react'
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import ReactApexChart from 'react-apexcharts';
const ECommerce: React.FC = () => {
  const [uniqueDate, setuniqueDate] = useState([]);
  const [getuserdata, setStudentDetail] = useState({});
  const [feedback, setfeedback] = useState("");
  const [roomissues, setRoomIssues] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [leaveData, setLeaveData] = useState("");
  const [uniqueDate1, setuniqueDate1] = useState([]);
  const convertTo24HourFormat = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
  };
  const getToken = () => {
    return localStorage.getItem('token');
  }
  const token = getToken();
  const state = {
    series: [
      {
        name: 'Count',
        data: uniqueDate.map(item => item.count),
      }
    ]
  };
  const state1 = {
    series: [
      {
        name: 'Count',
        data: uniqueDate1.map(item => item.count),
      }
    ]
  };
  const options = {
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'line',
      height: 335,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: uniqueDate.map(item => item.date),
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'dark'
    }
  };
  const options1 = {
    colors: ['#3C50E0'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'line',
      height: 335,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: uniqueDate1.map(item => item.date),
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'dark'
    }
  };
  const getdata = async () => {

    const res1 = await fetch(`https://ereside-backend.onrender.com/api/v1/getsingleqrtoken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });


    const data1 = await res1.json();
    if (res1.status === 404) {
      console.error("404 Error: Resource not found");
      // Handle the error appropriately, e.g., display an error message to the user
    }

    if (res1.status === 422 || !data1) {
      console.log("error ");

    } else {
      const dateCounts = {};
      data1.result.forEach(entry => {
        const date = entry.date;
        if (dateCounts[date]) {
          dateCounts[date]++;
        } else {
          dateCounts[date] = 1;
        }
      });
      const uniqueDatesArray = Object.keys(dateCounts).map(date => ({ date, count: dateCounts[date] }));

      setuniqueDate(uniqueDatesArray);
    }
  }
  const getdata1 = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getsingleqrtoken`, {
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
      const dateCounts = {};
      data.result.forEach(entry => {
        const timm = entry.time;
        const firstFourChars = timm.slice(0, 4); // Get characters from index 0 to 3
        const lastTwoChars = timm.slice(-2); // Get last 2 characters
        const date = firstFourChars + " " + lastTwoChars;
        if (dateCounts[date]) {
          dateCounts[date]++;
        } else {
          dateCounts[date] = 1;
        }
      });
      const uniqueDatesArray = Object.keys(dateCounts).map(date => ({ date, count: dateCounts[date] }));
      uniqueDatesArray.sort((a, b) => {
        const timeA = convertTo24HourFormat(a.date);
        const timeB = convertTo24HourFormat(b.date);
        return timeA.localeCompare(timeB);
      });
      setuniqueDate1(uniqueDatesArray);
    }
  }

  const getroomissues = async () => {

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
      setRoomIssues(data.result.length)
    }
  }
  const getleave = async () => {

    const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getleaveapplication`, {
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

const getfeedback = async () => {

  const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getfeedback`, {
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
const getannouncement = async () => {

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
    setAnnouncement(data.result.length)
  }
}








  useEffect(() => {
    getdata();
    getdata1();
    getroomissues();
    getleave();
    getfeedback();
    getannouncement();
  }, [])










  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardDataStats title="Room Complaints" total={roomissues}>
        </CardDataStats>
        <CardDataStats title="Leave Applications" total={leaveData}>
        </CardDataStats>
        <CardDataStats title="Feedbacks" total={feedback}>
        </CardDataStats>
        <CardDataStats title="Announcements" total={announcement}>
        </CardDataStats>
        {/* <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
        </CardDataStats> */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
          <div className="flex justify-end gap-4.5 mb-2.5">
            <h4 className="absolute left-25 mb-2 text-xl font-semibold text-black dark:text-white">
              No of Qrcode Scanned per day
            </h4>
          </div>
          <ReactApexChart
            options={options}
            series={state.series}
            type="line"
            name="extra"
            height={350}
          />
        </div>
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
          <div className="flex justify-end gap-4.5 mb-2.5">
            <h4 className="absolute left-25 mb-2 text-xl font-semibold text-black dark:text-white">
            No of logins per time
            </h4>
          </div>
          <ReactApexChart
                options={options1}
                series={state1.series}
                type="line"
                height={350}
              />
        </div>
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
