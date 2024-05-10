import React from 'react'
import HomePageLayout from '../../layout/HomePage';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { Link as LinkScrol } from 'react-scroll/modules';
const Guidelines: React.FC = () => {

    const generalGuidelines: string[] = [
        "Hostel members should use water and electricity economically.",
        "Heaters or similar electrical appliances are not allowed. They should not meddle with the fittings already in their rooms or make any additional connections.",
        "Smoking and consumption of alcoholic beverages in the hostel premises is an offence and will incur serious punishment.",
        "Members should avoid causing disturbances to other residents.",
        "Boarders should return to the hostel before 10.30 p.m. The hostel main gate, once closed at 10.30 p.m., will not be opened till 6.00 a.m. the next day. No resident will be allowed to enter the hostel during this period under any circumstances.",
        "If it is absolutely necessary to go out, he shall make an application in writing to the Warden stating the reason to obtain prior permission.",
        "It is important that absolute silence is maintained after 10.00 p.m.",
        "Any type of loud talking, shouting, singing, playing musical instruments or indulging in activities that would affect the peaceful atmosphere required for studies is prohibited.",
        "Only student’s parents/guardian are permitted to stay in the hostel guest rooms for a period of not more than two days. Allotment shall be subject to availability.",
        "The key of the room should always be in the resident's possession. Handing over the key to any non-resident for the casual use of the room is strictly prohibited. Keeping the keys on the door or window frame is not advised.",
        "Guests/Parents are not allowed to stay in the rooms along with the students. They can be accommodated in the guest rooms on written permission from the Warden/Manager on prescribed guest charges.",
        "All Hostel and Mess staff work under the Council of Wardens. Discrepancies in service, if any, should be brought to the notice of the Council of Wardens.",
        "Three Committees, viz., Mess and Purchase Committee, Infrastructure and Maintenance Committee and Vigilance and Discipline Committee constituted by the Hostel Management for every academic year will assist the Council of Wardens to run and maintain the hostel and mess in an efficient and hospitable manner."
    ];

    const generalInformation: string[] = [
        "Permission will be granted to boarders to possess a vehicle but at their own risk.",
        "No guests are permitted to stay with any boarder.",
        "In case of serious illness of a boarder, a male relative or a friend will be allowed to stay with him for a specific period at the discretion of the Warden / Manager.",
        "Room allotted is not transferable.",
        "If the boarder has a visitor, he may be entertained for a brief period in the room after entries are made by him in the log book maintained by the watch and ward.",
        "If any guest is found to be living in any room without the knowledge of the Warden/Manager, the residents of the room will be charged Rs.300/- per day. Repeated violation of this norm may invite severe penalties including expulsion from the hostel.",
        "Contributions of the boarders to any fund for any functions of sorts is not allowed. Dignitaries and invitees from other colleges are not allowed to lecture within the premises without the written permission of the Warden.",
        "Celebration of any festival, birthday parties or event of any provincial, national or international importance shall not be allowed without the knowledge or permission of the Warden. Such celebrations, if permitted by Warden, shall be confined to the hostel only and carried out in a manner so that the co-boarders, visitors or others in the locality are not affected.",
        "No ragging is permitted in the premises of the hostel. Anyone indulging in ragging will face stiff punishment and is liable to be expelled from the hostel.",
        "Unauthorized occupation of rooms, capturing rooms, sub-letting rooms and allowing any other student to live in their room will result in the cancellation of the student’s accommodation in the hostel.",
        "In such cases, the Principal / Warden may confiscate the student’s deposit, penalize the student for such acts and may be expelled from the hostel without notice.",
        "A boarder found to violate the rules and regulations or indulge in activities not conducive to maintaining the discipline of the hostel shall be liable for punishment as imposed by the Principal / Warden.",
        "A boarder may take grievances to the Warden who shall make efforts for redressal of those that are genuine.",
        "Additions or any modifications to these rules/regulations will be notified whenever necessary and they will be binding on the boarders.",
        "Health Care Center is being maintained in the hostel premises with a senior doctor available for consultation. Check-ups and medicines are provided free of cost.",
        "The Health Care Center/Dispensary is functional from 5.00 p.m. to 7.00 p.m. on all week days except on Sundays."
    ];

    return (
        <HomePageLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

            <li><a href="#general_guideleine">General Guidelines</a></li>
            <li><a href="#general_information">General Information</a></li>
            <li><a href="#hostel_vacate_guideline">Hostel Vacating Guidelines</a></li>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <section id="general_guideleine">
                        <Breadcrumb pageName="General Guidelines" />

                        {generalGuidelines.map((rule, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                                <span>{rule}</span>
                            </li>

                        ))}
                        <br></br>
                        <p>All the Committees will report directly to Council of Wardens for redressal of their problems. The term of the Committee shall be one academic year. In case of delay in formation of the new Committee, the Council of Wardens may request the Committee in office to continue till a new Committee is formed</p>
                        <br></br>
                        <p>These Committees shall take active interest in general welfare of the students residing in the hostel and assist the Council of Wardens in maintaining the living standards and suggest improvements.</p>
                        <br />
                        <p>Accommodation is provided in the hostel on the condition that the member shall put in complete attendance in the college and in the hostel and maintain good academic records.</p>
                        <br></br>
                        <p>They will also report any unauthorized use of hostel and bring to the notice any untoward incidence occurring in the hostel premises.

                        </p>
                    </section>

                </div>
                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <section id="general_information"></section>
                    <Breadcrumb pageName="General Information" />
                    {generalInformation.map((rule, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>{rule}</span>
                        </li>

                    ))}
                </div>

                <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                    <section id="hostel_vacate_guideline">
                        <Breadcrumb pageName="SUCH HOSTEL RESIDENTS WHO WISH TO VACATE THE HOSTEL EITHER IN THE BEGINNING OR DURING THE ACADEMIC SESSION IS ELIGIBLE FOR REFUNDS AS PER THE GUIDE LINES DETAILED BELOW:" />
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span> IN CASE OF GETTING TRANSFERRED TO A DIFFERENT COLLEGE AFTER REMITTING THE HOSTEL FEE.</span>
                        </li>
                        <span>Admission fee of Rs.1000/- shall be deducted and balance will be refunded.</span>
                        <br />
                        <br></br>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>STUDENTS VACATING THE HOSTEL WITHIN ONE MONTH FROM THE DATE OF ACTUAL OCCUPATION OF HOSTEL.</span>
                        </li>
                        <span>75% of Rent and Maintenance charges and balance of Mess Advance shall be refunded.</span>
                        <br />
                        <br></br>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>STUDENTS VACATING THE HOSTEL WITHIN THREE MONTHS FROM THE DATE OF ACTUAL OCCUPATION OF HOSTEL.</span>
                        </li>
                        <span>50% of Rent and Maintenance charges and balance of Mess Advance shall be refunded.</span>
                        <br />
                        <br></br>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>STUDENTS VACATING THE HOSTEL AFTER THREE MONTHS OF STAY INCLUDING LOSING ELIGIBILITY TO THE NEXT SEMESTER</span>
                        </li>
                        <span>Only balance of Mess Advance at their credit shall be refunded.</span>
                        <br />
                        <br></br>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5em', marginRight: '5px' }}>•</span>
                            <span>Security Deposit, however, will be refunded only after completing the course or officially being relieved from MSRIT.</span>
                        </li>
                    </section>
                </div>

            </div>
        </HomePageLayout>
    );
};

export default Guidelines;
