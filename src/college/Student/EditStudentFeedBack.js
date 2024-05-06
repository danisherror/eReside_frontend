import React, { useState,useEffect } from "react";
import Navbar from "../Logins/Navbar"
import Rating from "@mui/material/Rating";
import Box from '@mui/material/Box';
import { FaStar } from 'react-icons/fa';
import feedback from '../assets/img/feedback.jpg'
import Feedback1 from '../assets/img/Feedback1.png'
import Feedback2 from '../assets/img/Feedback2.png'
import Feedback3 from '../assets/img/Feedback3.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {  useNavigate } from 'react-router-dom'

function FeedbackPage() {

  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const images = [Feedback1, Feedback2, Feedback3];

  const labels = {
    0: "Unrated",
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };



  const containerStyle = {
    display: 'flex',
    height: '100vh',
  };

  const halfStyle = {
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    border: 'none', // Set border to none to make it invisible
  };

  const leftHalfStyle = {
    ...halfStyle,
    backgroundColor: '#f2f2f2', // Optional: Add background color for the left half
  };

  const rightHalfStyle = {
    ...halfStyle,
    width: '50%', // Adjust the width to your preference
    backgroundImage: `url(${feedback})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const id=localStorage.getItem("id")
  const submitFeedback = async () => {

    console.log(value)
    console.log(review)
    const response = await fetch(`/api/v1/updatefeedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: value,
        review: review,
      }),
    });
  //   const res = await fetch(`/api/v1/getfeedback`, {
  //     method: "GET",
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //     }
  // });
    console.log("-------------------\n-----------------\n")
    const data = await response.json();
    console.log(data)
    if (response.status === 422 || !data) {
      console.log("Error submitting feedback");
    } else {
      console.log("Feedback submitted successfully:", data);
      navigate('/uhomepage');
      // Optionally, you can handle success actions here
    }
  };
  const getdata = async () => {

    const res = await fetch(`/api/v1/getsinglefeedback/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");

    } else {
        // setINP(data.user)
        setValue(data.result.rating)
        console.log(value);
        setReview(data.result.review)
        console.log(review);
        console.log("get data");

    }
}

  useEffect(() => {
    getdata();
}, []);

  return (
    <>
    <Navbar />
    <div style={containerStyle}>
      <div style={leftHalfStyle}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Rate Your Experience</h1>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
                onChange={(e) => setValue(e.target.value)}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<FaStar style={{ opacity: 0.55, fontSize: "inherit" }} />}
              />
              {value !== null && (
                <Box sx={{ ml: 2, fontSize: "16px" }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </div>
          <div style={{ marginBottom: "20px", width: "300px" }}>
            <h1 style={{ fontSize: "18px", marginBottom: "10px" }}>Feedback</h1>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your feedback here..."
              style={{ width: "100%", minHeight: "200px", padding: "10px" }}
            />
          </div>
          <button
            disabled={value === 0}
            onClick={submitFeedback}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </button>
        </div>
      </div>
      <div style={rightHalfStyle}>
        {/* Content for the right half goes here */}
        <div >
          <div className="w-3/4 z-0">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={3000}
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              className="z-0"
            >
              {images.map((item, index) => (
                <div key={index}>
                  <img
                    src={item}
                    alt={`Room ${index + 1}`}
                    className=""
                    style={{ width: '75%', height: 'auto' }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default FeedbackPage;
