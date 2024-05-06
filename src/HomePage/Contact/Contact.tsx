import React from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const ContactInfo: React.FC = () => {
    return (
        <>
        <Breadcrumb pageName="Contact" />
            <p>M S Ramaiah Boys Hostel (Engg.)</p>
            <p>Timings : 9.00 AM to 4.30 PM</p>
            <p>Direct Line (Office): 080-23600003</p>
            <p>Mobile: 7829134223</p>
            <p>RIT - EPABX: 080-23600822 / 23603122; Ext: 208, 205</p>
            <p>Email: hostel@msrit.edu</p>
        </>
    );
};

export default ContactInfo;
