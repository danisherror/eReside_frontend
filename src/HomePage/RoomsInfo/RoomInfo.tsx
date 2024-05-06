import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/HomePage';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
const HomePage: React.FC = () => {
    const [hostelDetails, setHostelDetails] = useState([]);
    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/hgetHostelDetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
            const sortedRooms = data.all_hostel.sort((a, b) => a.createdAt - b.createdAt);
            setHostelDetails(sortedRooms || []);
        }
    }


    useEffect(() => {
        getdata();
    }, [])
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Room Info" />
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className={`room booked`}>
                            <h3 style={{ color: 'black' }}> Room is Filled</h3>
                            <h3 style={{ color: 'black' }}> Remaining space : 0</h3>
                        </div>
                    </div>
                    <div className={`room single`}>
                        <h3 style={{ color: 'black' }}> Room is partially Filled</h3>
                        <h3 style={{ color: 'black' }}> Remaining space : 1</h3>
                    </div>
                    <div className={`room free`}>
                        <h3 style={{ color: 'black' }}> Room is Empty</h3>
                        <h3 style={{ color: 'black' }}> Remaining space : 2</h3>
                    </div>

                </div>
            </div>
            <br/>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">

                    {hostelDetails.map(room => (
                        <div key={room} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                            <div key={room.id} className={`room ${room.studentIds.length === 2 ? 'booked' : (room.studentIds.length === 1 ? 'single' : 'free')}`}>
                                <h3 style={{ color: 'black' }}>Room Number: {room.roomNumber}</h3>
                                <p style={{ color: 'black' }}>Hostel Name: {room.hostelName}</p>
                                <p style={{ color: 'black' }}>Block Name: {room.block}</p>
                                <p style={{ color: 'black' }}>Type: {room.type}</p>
                            </div>
                        </div>
                    ))}
                    <style>
                        {`

            .room {
                text-align: center;

            }
            .booked {
                background-color: red;
            }
            .single {
                background-color: yellow;
            }
            .free {
                background-color: green;
            }
          `}
                    </style>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
