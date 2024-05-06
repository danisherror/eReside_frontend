import React, { useState } from 'react';
import DefaultLayout from '../../layout/HomePage';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Image1 from "../Images/image_1.jpg";
import Image2 from "../Images/image_2.jpg";
import Image3 from "../Images/image_3.jpg";
import Image4 from "../Images/image_4.jpg";
import Image5 from "../Images/image_5.jpg";
import Image6 from "../Images/image_6.jpg";
import Image7 from "../Images/image_7.jpg";
import Image8 from "../Images/image_8.jpg";
import Image9 from "../Images/image_9.jpg";
import Image10 from "../Images/image_10.jpg";
import Image11 from "../Images/image_11.jpg";
import Image12 from "../Images/image_12.jpg";
import Image13 from "../Images/image_13.jpg";
import Image14 from "../Images/image_14.jpg";
import Image15 from "../Images/image_15.jpg";
import Image16 from "../Images/image_16.jpg";
import Image17 from "../Images/image_17.jpg";
import Image18 from "../Images/image_18.jpg";
import Image19 from "../Images/image_19.jpg";
import Image20 from "../Images/image_20.jpg";
const HostelFacilities = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20]

    const handleCloseModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {images.map((image, index) => (
                    <div key={index} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" onClick={() => handleClick(image)}>
                        <img src={image} alt={`Hostel Image ${index + 1}`} />
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>

                    <div className="modal">
                        <button className="close-button" onClick={handleCloseModal}>
                            X
                        </button>
                        <img src={selectedImage} alt="Enlarged Image" className="modal-image" />
                    </div>
                </div>
            )}

            {/* CSS */}
            <style>
                {`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 20%; /* Align to 20% from left */
            width: 60%; /* Occupy 80% of the screen width */
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal {
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .modal-image {
            max-width: 100%;
            max-height: 100%;
        }

        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px;
            background-color: transparent;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
        }

        .close-button:hover {
            color: red; /* Change color on hover if desired */
        }
    `}
            </style>
        </DefaultLayout>
    );
}

export default HostelFacilities;
