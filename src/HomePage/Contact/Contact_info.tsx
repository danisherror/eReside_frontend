import React from 'react';
import DefaultLayout from '../../layout/HomePage';
import Contact from "./Contact"
const ContactInfo: React.FC = () => {
    return (
        <DefaultLayout>
                            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">

            <Contact />
            </div>
        </DefaultLayout>
    );
};

export default ContactInfo;
