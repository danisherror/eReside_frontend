import React from 'react'
import DefaultLayout from '../../layout/HomePage';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import Table from '../../components/Tables/TableThree'
const HomePage: React.FC = () => {
    const messRules: string[] = [
        "A vegetarian mess is being run on self-service and dividing system. Every student of the MSRIT is automatically a boarder at the time of admission to the hostel.",
        "Every boarder shall see to it that, congenial atmosphere is maintained in the dining hall to enable the staff to do their job effectively.",
        "No boarder shall enter into a quarrel or unnecessary discussion with staff or co-boarders.",
        "Outside food is not allowed into the dining hall/hostel premises except purchased from the stores situated within the premises.",
        "Service in the mess shall be as per the scheduled timings only.",
        "There shall be no service to the rooms and food will not be preserved for late comers.",
        "Mess Committee formed shall constitute representation from all semesters who will specify the Menu and quantity to be served and no boarder shall question the Committee's authority to do so or work at cross purposes.",
        "The menu so specified by the Mess Committee will be duly approved by the Warden, to have an effective control over the cost.",
        "The Mess Committee will act as an advisory body and report to the Warden about the quality of food and on the general cleanliness in and around the mess.",
        "The Committee will also bring to the notice about the quality of service being given by the Mess Staff.",
        "Rebates will be given only for absence from the mess for two consecutive days and more for which, due intimation is required one day in advance for recording the absence in the register kept for the purpose in the dining hall with the Mess Supervisor.",
        "No requests are entertained for the mess absence on the same day.",
        "Absence for more than 10 days in a month may be considered under extraordinary circumstances for which Warden's approval is mandatory.",
        "The Manager with the assistance of Superintendent shall ensure that, the items being prepared are as per the menu finalized by the Mess Committee."
    ];

    return (
        <DefaultLayout>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <Breadcrumb pageName="Mess Rules" />

                    {messRules.map((rule, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>{rule}</span>
                        </li>

                    ))}
                    <br></br>
                    <p>Any change in the menu shall be brought to the notice of the Warden for taking necessary action. In case of any disagreement, the decision given by the Warden shall be final and binding.</p>
                    <br></br>
                    <p>The mess will remain open normally during the following timings and will be closed after lunch on every Saturday.</p>
                </div>
                <div className="col-span-12 xl:col-span-12">
                    <Table />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
