import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/HomePage';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
const HomePage: React.FC = () => {
    const hostelRules: string[] = [
        "Only bonafide students of MSRIT and others specially permitted by the Director or his nominees will be given accommodation in the hostel.",
        "The Gokula Education Foundation Trust manages the MSR Hostels (Engg) under the direction and control of the Principal of MSRIT through the Warden and the Officials appointed by him.",
        "Students requiring hostel accommodation should pay hostel and mess deposits, room rent, and other hostel charges for the full term at the time of joining. All payments and deposits should be made in Vijaya Bank, MSRIT branch.",
        "Room allotment is on a first-come, first-served basis. Changes are permitted only with written permission from the concerned authorities.",
        "All occupants should acknowledge the furniture and fittings handed over to their charge and return them undamaged upon leaving.",
        "Cooking in the rooms is strictly prohibited. No extra furniture or electrical fittings are allowed without permission.",
        "Members are responsible for bringing their mattresses, mosquito nets, and other necessary items.",
        "Residents must provide their lock and key for room security.",
        "Absence from the hostel exceeding a month without permission may result in cancellation of accommodation.",
        "Notice to vacate a room must be given in writing. Room changes require consent from authorities.",
        "Security deposit refunds are subject to deduction for any damage.",
        "Maintenance charges cover reading/recreation room expenses and may be revised periodically.",
        "Students are prohibited from keeping valuables or objectionable articles in their rooms.",
        "Rooms and premises must be kept clean, and questionable slogans/posters are not allowed.",
        "Students must vacate the hostel upon completing their course. Unauthorized stay after the stipulated time will incur penalties.",
        "Consumption of alcohol, drugs, or smoking in the hostel premises is strictly forbidden, with expulsion and forfeiture of deposits for violators."
    ];
    const chargesInfo: string = `The charges applicable vary for type of accommodation at various hostel blocks. At the time of admission to the hostel, the fees / deposit are to be paid under the following account heads:
1. Mess Advance Deposit
2. Amenity Charges
3. Hostel Maintenance Charges and Admission fees
4. Refundable Security Deposit

Mess charges as per daily rate will be deducted from the Mess Deposit amount depending on the number of days of mess facility utilized by the student and the balance amount remaining will be notified every month. At the end of the term, balance amount, if any, will be carried over to the next term or refunded if the course is completed.

Mess accounting is done from 1st to the last day of a particular month.

It is mandatory for all the students to open a Bank Account at the Vijaya Bank, MSRIT Branch for smooth & early financial transactions.`;


    return (
        <DefaultLayout>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <Breadcrumb pageName="Hostel Rules" />

                    {hostelRules.map((rule, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>{rule}</span>
                        </li>

                    ))}
                </div>
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <Breadcrumb pageName="Hostel Charges" />
                    The charges applicable vary for type of accommodation at various hostel blocks. At the time of admission to the hostel, the fees / deposit are to be paid under the following account heads:
                    <br></br>
                    1. Mess Advance Deposit
                    <br></br>
                    2. Amenity Charges
                    <br></br>
                    3. Hostel Maintenance Charges and Admission fees
                    <br></br>
                    4. Refundable Security Deposit
                    <br></br>
                    <br></br>
                    Mess charges as per daily rate will be deducted from the Mess Deposit amount depending on the number of days of mess facility utilized by the student and the balance amount remaining will be notified every month. At the end of the term, balance amount, if any, will be carried over to the next term or refunded if the course is completed.
                    <br></br>
                    Mess accounting is done from 1st to the last day of a particular month.
                    <br></br>
                    It is mandatory for all the students to open a Bank Account at the Vijaya Bank, MSRIT Branch for smooth & early financial transactions.
                </div>
                {/* <div className="col-span-12 xl:col-span-8">
                    <TableOne />
                </div> */}
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
