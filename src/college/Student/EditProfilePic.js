import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";
import Navbar from "../Logins/Navbar"
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const EditImage = () => {

    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();
    console.log(token);


    console.log(url)
    const updateProfilePic = async(e)=>{
        e.preventDefault();
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
        console.log(url1)
        //const pus=url1.toString()
        console.log("asdasjbaskjbkjasbfakjs")
        const res2 = await fetch(`/api/v1/editImage`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               url:url1
            })
        });
        console.log("asdjankajs: "+res2.status)

        const data2 = await res2.json();
        console.log("asdsd",data2.user,url1);

        if(res2.status === 404 || !data2){
            alert("fill the data");
        }else{
            alert("data updated");
            navigate('/uhomepage');
        }
    }


  return (
    <><Navbar />
    <div className="sign-in__wrapper"
    style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <form className="shadow p-4 bg-white rounded">
            <div className="h4 mb-2 text-center">Change Image</div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Select Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                    </div>
                    <button type="submit" onClick={updateProfilePic} class="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
  )
}

export default EditImage