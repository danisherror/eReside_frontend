import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import { Html5QrcodeScanner } from 'html5-qrcode';
import beepSound from "./beep.mp3";
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

const FormElements = () => {
    const navigate = useNavigate();
    const [scanResults, setScanResults] = useState([]);
    const [scanner, setScanner] = useState(null);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    useEffect(() => {
        const newScanner = new Html5QrcodeScanner('reader', {
            qrbox: 250,
            fps: 5,
        });

        newScanner.render(handleScan, handleError);
        setScanner(newScanner);

        return () => {
            newScanner.clear();
        };
    }, []);
    const playBeepSound = () => {
        const audio = new Audio(beepSound);
        audio.play();
    };
    const sendTokensToBackend = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('https://ereside-backend.onrender.com/api/v1/addqrtokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    scanResults
                }),
            });
            const res = await response.json();
            if (response.status == 200) {
                alert("Tokens send to backend successfully")
                // navigate('/ahomepage');
                window.location.reload();
            }
            else {
                console.log("error ");
            }
            console.log('Backend response:', res);
        } catch (error) {
            console.error('Error sending tokens to backend:', error);
        }
    };

    // const handleScan = (result) => {
    //     const existingIndex = scanResults.findIndex(item => item._id === result);

    //     const currentDate = new Date();
    //     const year = currentDate.getFullYear();
    //     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    //     const day = String(currentDate.getDate()).padStart(2, '0');
    //     const dateString = `${year}-${month}-${day}`;
    //     const timeString = currentDate.toLocaleTimeString();
    //     const scannedData = { _id: result, date: dateString, time: timeString };
    //     // const existingIndex = scanResults.findIndex(item => item._id === result);
    //     // playBeepSound();
    //     const existingIndex1=true
    //     if (existingIndex1) {
    //         const newScanner = [...scanResults]
    //         newScanner.push(scannedData);
    //         setScanResults(newScanner);

    //     } else {
    //         // Optionally, update existing entry here
    //         console.log(`Token '${result}' already scanned.`);
    //     }
    // };
    const handleScan = async (result) => {
        try {
            // console.log(result);
            const existing = scanResults.findIndex(item => item._id === result);
            if (existing === -1) {
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const dateString = `${year}-${month}-${day}`;
                    const timeString = currentDate.toLocaleTimeString();
                    const scannedData = { _id: result, date: dateString, time: timeString };
                    const existingIndex = scanResults.findIndex(item => item._id === result);
                    if (existingIndex===-1) {
                        const newScanner = [...scanResults]
                        newScanner.push(scannedData);
                        // setScanResults(newScanner);
                        setScanResults(prevResults => [...prevResults, scannedData]);

                    } else {
                        // Optionally, update existing entry here
                        console.log(`Token '${result}' already scanned.`);
                    }


                    playBeepSound();
                    // setScanResults(prevResults => [...prevResults, scannedData]);

            } else {
                console.log(`Token '${result}' already scanned.`);
            }
        } catch (error) {
            console.error('Error handling scan:', error);
        }
    };

    const handleError = (err) => {
        console.warn('QR Code Scanner Error:', err);
    };
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Scan QrCode" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    QR Code Scanning in React
                                </label>
                                <div id="reader"></div>
                            </div>
                            <button onClick={sendTokensToBackend} className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90">
                                Send Tokens to Backend
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-9">
                    {/* <!-- Textarea Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">

                            {scanResults.map((result, index) => (
                                <li key={index}>
                                    <p>Token: {result._id}</p>
                                    <p>Date: {result.date}</p>
                                    <p>Time: {result.time}</p>
                                </li>
                            ))}

                        </div>
                        {/* <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Default textarea
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Default textarea"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Active textarea
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Active textarea"
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                ></textarea>
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Disabled textarea
                                </label>
                                <textarea
                                    rows={6}
                                    disabled
                                    placeholder="Disabled textarea"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                                ></textarea>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default FormElements;
