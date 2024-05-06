import Navbar from "../Logins/ANavbar";
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import beepSound from "../assets/sounds/beep.mp3";
const QRScanner = () => {
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
            const data = await response.json();
            console.log('Backend response:', data);
        } catch (error) {
            console.error('Error sending tokens to backend:', error);
        }
    };

    const handleScan = (result) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        const timeString = currentDate.toLocaleTimeString();
        const scannedData = { _id: result, date: dateString, time: timeString };
        const existingIndex = scanResults.findIndex(item => item._id === result);
        // playBeepSound();
        if (existingIndex === -1) {
            const newScanner = [...scanResults]
            newScanner.push(scannedData);
            setScanResults(newScanner);

        } else {
            // Optionally, update existing entry here
            console.log(`Token '${result}' already scanned.`);
        }
    };

    const handleError = (err) => {
        console.warn('QR Code Scanner Error:', err);
    };

    return (
        <> <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1>QR Code Scanning in React</h1>
            <div id="reader"></div>
            <br></br>
            <button onClick={sendTokensToBackend} class="btn btn-primary">
                Send Tokens to Backend
            </button>
            <br></br>
            <ul className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll', width: '400px', height: '400px', }}>

                {scanResults.map((result, index) => (
                    <li key={index}>
                        <p>Token: {result._id}</p>
                        <p>Date: {result.date}</p>
                        <p>Time: {result.time}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default QRScanner;
