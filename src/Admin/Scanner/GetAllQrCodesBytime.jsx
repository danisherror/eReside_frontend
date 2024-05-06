import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import ReactApexChart from 'react-apexcharts';
const TableOne = () => {
    const storeIdInLs = useID();
    const [roomissues, setRoomIssues] = useState([]);
    const [uniqueDate, setuniqueDate] = useState([]);
    const [hostelNames, setHostelNames] = useState([]);
    const [pendingroomissue,setpendingroomissue]=useState(Number)
    const [leaveData, setLeaveData] = useState("");
    const [pendingleave, setPendingleave] = useState(Number);
    const [hostelDetails, setHostelDetails] = useState("");
    const [occupiedRoom, setOccupiedRoom] = useState(Number);
    const [selectedData, setSelectedData] = useState('All');
    const [insummary, setInsummary] = useState("");
    const [outsummary, setOutsummary] = useState("");
    const state = {
        series: [
            {
                name: 'Count',
                data: uniqueDate.map(item => item.count),
            }
        ],
        series1: [ Number(leaveData) - pendingleave,pendingleave],
        series2: [ Number(roomissues) - pendingroomissue,pendingroomissue],
        series3: [  occupiedRoom,Number(hostelDetails)-occupiedRoom],
        series4: [  Number(insummary),Number(outsummary)],

    };
    const options1 = {
        colors: ['#3C50E0', '#FF0000'], // Line color for the pie chart and Red color for Pending
        chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Complete', 'Pending'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        tooltip: {
            theme: 'dark'
        }
    };
    const options2 = {
        colors: ['#3C50E0', '#FF0000'], // Line color for the pie chart and Red color for Pending
        chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Complete', 'Pending'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        tooltip: {
            theme: 'dark'
        }
    };
    const options3 = {
        colors: ['#3C50E0', '#FF0000'], // Line color for the pie chart and Red color for Pending
        chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Room Occupied', 'Room Empty'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        tooltip: {
            theme: 'dark'
        }
    };
    const options4 = {
        colors: ['#3C50E0', '#FF0000'], // Line color for the pie chart and Red color for Pending
        chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Student Inside Hostel', 'Student outside Hostel'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        tooltip: {
            theme: 'dark'
        }
    };

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

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const getdata = async () => {
        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getUniqueHostelNames`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        data.hostelName.reverse();
        setHostelNames(data.hostelName);
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
          let pen = 0;
            for (let i = 0; i < data.result.length; i++) {
                if (data.result[i].status === "Pending") {
                    pen = pen + 1;
                }
            }
           setpendingroomissue(pen)
        }
      }

    const getchartData = async () => {
        if (selectedData === "All") {
            const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getallqrtokens`, {
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
                    const firstFourChars = timm.slice(0, 5); // Get characters from index 0 to 3
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
                setuniqueDate(uniqueDatesArray);
            }
        }
        else {
            const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getallqrtokensbyhostel/${selectedData}`, {
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
                    const firstFourChars = timm.slice(0, 5); // Get characters from index 0 to 3
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
                setuniqueDate(uniqueDatesArray);
            }

        }
    }
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedData(selectedValue);
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
            let pen = 0;
            for (let i = 0; i < data.result.length; i++) {
                if (data.result[i].status === "Pending") {
                    pen = pen + 1;
                }
            }
            setPendingleave(pen)
        }
    }
    const getroomdetails = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getHostelDetails`, {
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
            setLoading(false);
        }

        if (res.status === 422 || !data) {
            console.log("error ");
            setLoading(false);

        } else {
            let cnt=0;
            setHostelDetails(data.all_hostel.length)
            for(let i=0; i<data.all_hostel.length; i++)
            {
                if(data.all_hostel[i].studentIds.length > 0)
                {
                    cnt++;
                }
            }
            setOccupiedRoom(cnt);
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
        getdata();
        getchartData();
        getleave();
        getroomissues();
        getroomdetails();
        getinoutsummary();
    }, [selectedData]);

    return (

        <>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                <div className="flex justify-end gap-4.5 mb-2.5">
                    <h4 className="absolute left-25 mb-2 text-xl font-semibold text-black dark:text-white">
                        No of Qrcode Scanned per Time
                    </h4>
                    <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                    >
                        Filter by Hostel Name:
                    </label>
                    <div className="relative">
                        <select value={selectedData} onChange={handleDropdownChange}
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        >
                            {hostelNames.map((hostel, index) => (
                                <option key={index} value={hostel}>{hostel}</option>
                            ))}
                        </select>

                    </div>
                </div>
                <ReactApexChart
                    options={options}
                    series={state.series}
                    type="line"
                    name="extra"
                    height={350}
                />
            </div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pt-8.5 pb-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8.5 xl:col-span-6">
                <div className="flex justify-end gap-4.5 mb-2.5">
                    <h4 className="absolute left-25 mb-2 text-xl font-semibold text-black dark:text-white">
                        Leave Application Status
                    </h4>
                    <br></br>

                </div>
                <div className="-ml-5 -mb-9">
                <ReactApexChart
                    options={options1}
                    series={state.series1}
                    type="pie"
                    name="extra"
                    height={350}
                />
                </div>
            </div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pt-8.5 pb-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8.5 xl:col-span-6">
                <div className="flex justify-end gap-4.5 mb-2.5">
                    <h4 className="absolute left-155 mb-2 text-xl font-semibold text-black dark:text-white">
                       Room Complaint Status
                    </h4>
                    <br></br>

                </div>
                <div className="-ml-5 -mb-9">
                <ReactApexChart
                    options={options2}
                    series={state.series2}
                    type="pie"
                    name="extra"
                    height={350}
                />
                </div>
            </div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pt-8.5 pb-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8.5 xl:col-span-6">
                <div className="flex justify-end gap-4.5 mb-2.5">
                <h4 className="absolute left-25 mb-2 text-xl font-semibold text-black dark:text-white">
                        Room Data
                    </h4>
                    <br></br>

                </div>
                <div className="-ml-5 -mb-9">
                <ReactApexChart
                    options={options3}
                    series={state.series3}
                    type="pie"
                    name="extra"
                    height={350}
                />
                </div>
            </div>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-8 pt-8.5 pb-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8.5 xl:col-span-6">
                <div className="flex justify-end gap-4.5 mb-2.5">
                    <h4 className="absolute left-155 mb-2 text-xl font-semibold text-black dark:text-white">
                       Student In-Out Data
                    </h4>
                    <br></br>

                </div>
                <div className="-ml-5 -mb-9">
                <ReactApexChart
                    options={options4}
                    series={state.series4}
                    type="pie"
                    name="extra"
                    height={350}
                />
                </div>
            </div>

        </>

    );
};

export default TableOne;