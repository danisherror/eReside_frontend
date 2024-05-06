import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/HomePage';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import ContactInfo from '../../HomePage/Contact/Contact';
const HomePage: React.FC = () => {
    const [hostelDetails, setHostelDetails] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getUniqueHostelNames`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            data.hostelName.pop()
            setHostelDetails(data.hostelName);
        }

        getdata();
    }, []);

    const heading = "A home away from home', is the concept of hostels in RIT. We provide the best possible comfort needed for students. The number of students accommodated in a room depends on the semester. As the concentration and privacy required is more as a student progress from first year to final year, accordingly the accommodation is provided.";
    const facilities: string[] = [
        "Well-appointed rooms for single/double/triple occupancy with attached/common bathrooms with hot water.",
        "Two spacious halls for comfortable dining.",
        "Breakfast, lunch, evening snacks, and special dinner provided by the mess comprising of both North and South Indian food items. The Mess Committee, made up of student representatives from different parts of the country, decides the mess menu on cost sharing.",
        "Eight heavy-duty washing machines in the old block provide free laundry services.",
        "Ironing of clothes at subsidized rates.",
        "Large recreation halls equipped with LED TVs, newspapers, and magazines in each of the three hostel blocks.",
        "Indoor and outdoor game facilities.",
        "Availability of light refreshments from the canteen up to 12 midnight.",
        "Health center with a senior doctor for consultation and treatment available from Monday to Saturday between 5 pm and 7 pm. Medicines are supplied free of cost.",
        "Round-the-clock security to all blocks. Additional security at blocks occupied by freshers.",
        "RO drinking water from the in-house plant.",
        "Guest rooms for visitors which are charged according to availability.",
        "Cabled/Wi-Fi internet provided at nominal charges."
    ];

    return (
        <DefaultLayout>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <Breadcrumb pageName="Hostel" />
                    {heading}
                </div>
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <Breadcrumb pageName="Hostel Names" />

                    {hostelDetails.map((rule, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>{rule}</span>
                        </li>

                    ))}
                </div>
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <Breadcrumb pageName="Facilities Provided at Hostel" />
                    {facilities.map((rule, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>{rule}</span>
                        </li>

                    ))}
                </div>
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    < ContactInfo />

                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
