import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";
import React, { useEffect, useState } from 'react'
import { Form, Button, Alert } from "react-bootstrap";

import { useNavigate } from 'react-router-dom'

const EditStudentProfile = () => {

    // const [getdiseasedata, setDiseasedata] = useState([]);
    // console.log(getdiseasedata);



    const navigate = useNavigate();
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        collegeid: "",
        phone: "",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    console.log(token);


    const getdata = async () => {

        const res = await fetch(`/api/v1/adminprofile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data.user)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateProfile = async (e) => {
        e.preventDefault();

        const { name, email, collegeid, phone } = inpval;

        const res2 = await fetch(`/api/v1/editAdminProfile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name, email, collegeid, phone
            })
        });

        const data2 = await res2.json();
        console.log("asdsd", data2.user);

        if (res2.status === 422 || !data2) {
            alert("fill the data");
        } else {
            alert("data updated");
            navigate('/ahomepage');
        }
    }


    return (
        <div className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <form className="shadow p-4 bg-white rounded">
                <div className="h4 mb-2 text-center">Edit Profile</div>
                <div class="mb-1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={inpval.name} onChange={setdata} name="name" />
                </div>
                <div class="mb-1">
                    <label for="exampleInputPassword1" class="form-label">Email</label>
                    <Form.Control type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="mb-1">
                    <label for="exampleInputPassword1" class="form-label">Emplyee</label>
                    <Form.Control type="text" value={inpval.collegeid} onChange={setdata} name="collegeid" class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="mb-1">
                    <label for="exampleInputPassword1" class="form-label">Phone</label>
                    <Form.Control type="text" value={inpval.phone} onChange={setdata} name="phone" class="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" onClick={updateProfile} class="w-100 btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditStudentProfile