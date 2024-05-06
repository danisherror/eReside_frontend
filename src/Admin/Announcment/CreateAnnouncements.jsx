import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
const FormElements = () => {
    const [formData, setFormData] = useState({
        hostelName: '',
        announcement: ''
    });
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [hostelDetails, setHostelDetails] = useState([]);
    const navigate = useNavigate();
    const submitFeedback = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formdata = new FormData()
        formdata.append("file", image)
        formdata.append("upload_preset", "testing")
        formdata.append("cloud_name", "dpywvy2za")
        const res1=await fetch('https://api.cloudinary.com/v1_1/dpywvy2za/image/upload',{
          method:"post",
          body:formdata
        })

        const ImgData=await res1.json()
        const url1=ImgData.url
        setUrl(url1);
        const { hostelName, announcement } = formData;
        const response = await fetch(`https://ereside-backend.onrender.com/api/v1/createAnnouncement`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               hostelName,
               url:url1,
               announcement
            }),
        });
        const data = await response.json();

        if (response.status === 422 || !data) {
            alert("Error submitting announcement");
        } else {
            alert("Announcement submitted successfully");
            navigate('/ahomepage');
            // Optionally, you can handle success actions here
        }
    };
    const handlehostelNameChange = (event) => {
        const selectedHostel = event.target.value;
        setFormData((prevData) => ({ ...prevData, hostelName: selectedHostel}));
    };
    const handleAnnouncementChange = (event) => {
        const announcementValue = event.target.value;
        setFormData((prevData) => ({ ...prevData, announcement: announcementValue }));
    };
    useEffect(() => {
        const getdata = async () => {
            const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getUniqueHostelNames`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            setHostelDetails(data.hostelName);
        }

        getdata();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Post Announcement" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">


                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">

                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Hostel Name
                        </label>
                        <div className="relative">
                            <select
                                id="hostelName"
                                name="hostelName"
                                value={formData.hostelName}
                                onChange={handlehostelNameChange}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            >
                                <option>select the option below</option>
                                {hostelDetails.map(hostel => (
                                    <option key={hostel} value={hostel}>
                                        {hostel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Attach file
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <label className="mb-3 block text-black dark:text-white">
                                Announcement
                            </label>
                            <textarea
                                rows={6}
                                value={formData.announcement}
                                onChange={handleAnnouncementChange}
                                placeholder="Announcement"
                                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                            ></textarea>
                        </div>
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={submitFeedback}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </DefaultLayout>
    );
};

export default FormElements;
