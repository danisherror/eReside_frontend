import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import ReactApexChart from 'react-apexcharts';
import 'jspdf-autotable';
// const packageData = []

const TableThree = () => {
    const [inout, setinout] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const state = {
        series: [
            {
                name: 'In Time',
                data: inout.map(student => student.in_time),
                color: 'blue',

            },
            {
                name: 'Out Time',
                data: inout.map(student => student.out_time),
                color: 'red',

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
            show: true,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: inout.map(item => item.out_date),
        },
        yaxis: {
            categories: inout.map(item => item.out_time),
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

    const token = getToken();
    const getdata = async () => {
        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getinoutdetailStudent`, {
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

    const generatePDFReport = () => {
        const doc = new jsPDF();

        // Define table column headers
        const headers = ['Out Date', 'In Date'];

        // Convert inout data into an array of arrays for the table
        const tableData = inout.map(student => [student.out_date, student.in_date]);

        // Add title to the PDF
        doc.text("Student Time Log Report", 10, 10);

        // Add table to the PDF
        doc.autoTable({
            startY: 20,
            head: [headers], // Use the headers array
            body: tableData
        });
        // Save the PDF
        doc.save('student_time_log_report.pdf');
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Check-in and Check-out" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <div className="flex justify-end gap-2.5">
          <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90" onClick={generatePDFReport}>Generate Report</button>
        </div>
        <br></br>
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
                <br></br>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <ReactApexChart
                options={options}
                series={state.series}
                type="line"
                height={350}
              />
            </div>
        </DefaultLayout>
    );
};

export default TableThree;
