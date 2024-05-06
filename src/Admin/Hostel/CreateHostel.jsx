import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
const FormElements = () => {
    const navigate = useNavigate();
    const [hostelName, setHostelName] = useState('');
    const [blocks, setBlocks] = useState([{ blockName: '', numberOfRooms: '' }]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (index, key, value) => {
        const newBlocks = [...blocks];
        newBlocks[index][key] = value;
        setBlocks(newBlocks);
    };
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const addBlock = () => {
        setBlocks([...blocks, { blockName: '', numberOfRooms: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://ereside-backend.onrender.com/api/v1/createHostel', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    hostelName, blocks
                })
            });
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                setHostelName('');
                setBlocks([{ blockName: '', numberOfRooms: '' }]);
                navigate('/ahomepage');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to create hostel.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while creating the hostel.');
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Create Hostel" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">

                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Hostel Name
                        </label>
                        <div className="relative">

                            <input

                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="text" id="hostelName" value={hostelName} onChange={(e) => setHostelName(e.target.value)} required />

                        </div>
                        {blocks.map((block, index) => (

                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark" key={index}>
                                <label className="mb-3 block text-black dark:text-white" htmlFor={`blockName${index}`}>
                                    Block Name:
                                </label>

                                <input
                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                    type="text" id={`blockName${index}`} value={block.blockName} onChange={(e) => handleChange(index, 'blockName', e.target.value)} required />
                                <label className="mb-3 block text-black dark:text-white" htmlFor={`numberOfRooms${index}`}>
                                    Number of Rooms:
                                </label>

                                <input
                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                    type="number" id={`numberOfRooms${index}`} value={block.numberOfRooms} onChange={(e) => handleChange(index, 'numberOfRooms', e.target.value)} required />

                            </div>
                        ))}
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="button" onClick={addBlock}
                            >
                                Add Block
                            </button>
                        </div>
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit" onClick={handleSubmit}
                            >
                                Create Hostel
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </DefaultLayout>
    );
};

export default FormElements;
