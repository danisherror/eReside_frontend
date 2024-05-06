import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
const FormElements = () => {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const navigate = useNavigate();
    const id=localStorage.getItem("id")
    const submitFeedback = async () => {
        const response = await fetch(`https://ereside-backend.onrender.com/api/v1/updatecomplaint/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:title,
                description: review,
            }),
        });

        const data = await response.json();

        if (response.status === 422 || !data) {
            console.log("Error submitting Complaint");
        } else {
            alert("Complaint submitted successfully")
            console.log("Complaint submitted successfully:", data);
            navigate('/uhomepage');
            // Optionally, you can handle success actions here
        }
    };
    const getdata = async () => {

        const res = await fetch(`https://ereside-backend.onrender.com/api/v1/getsinglecomplain/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            // setINP(data.user)
            setTitle(data.result.title)
            setReview(data.result.description)

        }
    }

      useEffect(() => {
        getdata();
    }, []);


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Room Complaint" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">


                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">

                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Title
                        </label>
                        <div className="relative">

                            <select
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                            style={{ width: "100%", padding: "10px" }}
                        >
                            <option value="">Select Title</option>
                            <option value="Room Cleaning">Room Cleaning</option>
                            <option value="Electronics Not Working">Electronics Not Working</option>
                            <option value="Animals Problem">Animals Problem</option>
                            <option value="Others">Others</option>
                            {/* Add more options as needed */}
                        </select>
                        </div>
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <label className="mb-3 block text-black dark:text-white">
                            Issue
                            </label>
                            <textarea
                                rows={6}
                                value={review}
                            onChange={(e) => setReview(e.target.value)}
                                placeholder="Issue"
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
