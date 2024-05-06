import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/img/signin.png';

export default function Landing() {
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        fontFamily: 'roboto',
    };

    const innerContainerStyle = {
        marginRight: '-130%', // Adjust the margin as needed
        textAlign: 'right',
    };
    const textStyles = {
        color: '#blue', // Set the text color to white
        fontSize: '2rem', // Increase the font size, adjust as needed
        fontWeight: 'bold',
        margin: '0', // Reset default margin
    };

    return (
        <div style={backgroundStyle}>
            <div className='flex flex-col items-center justify-center my-auto text-black' style={innerContainerStyle}>
                <p style={{ ...textStyles, fontSize: '1.5rem',color:'white',marginRight:'15%' }}>Enter into the magical world of</p>
                <p style={{ ...textStyles, fontSize: '2.5rem',color:'white', textAlign: 'center', marginRight:'-50%' }}>HOSTEL 😇</p>
                <p style={{ ...textStyles, fontSize: '1.5rem',color:'white',marginRight:'-45%',textAlign: 'center' }}>We have created an awesome app to <br></br>
                tackle the problems related to hostels.  <br></br>
                Tighten your seat belt to go into a fascinating journey.</p>
                <div style={{ ...textStyles, fontSize: '1.0rem',marginRight:'-45%',textAlign: 'center' }} >
                    <button  onClick={() => navigate('/signup')}>
                        <p>Create Account</p>
                    </button>
                    <br></br>
                    <button  onClick={() => navigate('/signin')}>
                        <p>Login</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
