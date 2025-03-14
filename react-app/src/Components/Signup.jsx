import './Header.css';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const sendOtp = () => {
        axios.post('http://localhost:4000/send-otp', { email })
            .then(() => {
                alert("OTP sent to your email");
                setOtpSent(true);
            })
            .catch(e => console.log(e));
    };

    const verifyOtpAndSignup = () => {
    
    const url = "http://localhost:4000/verify-otp";
    const data = { username, mobile, email, password, otp };

    axios.post(url, data)
        .then((res) => {
            console.log("Verification successful:", res.data);
            alert(res.data.message);
            navigate('/login');
        })
        .catch((e) => {
            console.error("Error during OTP verification:", e.response?.data || e.message);
            alert(e.response?.data?.message || "Verification failed");
        });
    };
const handleSignup = () => {
    const url = "http://localhost:4000/signup";
    const data = { username, mobile, email, password, otp };

    console.log("Signup Data:", data); // Add this to see the data being sent

    axios.post(url, data)
        .then((res) => {
            console.log("Response from server:", res); // Add this to check server response
            if (res.data.message) {
                alert(res.data.message);
                navigate('/login');
            }
        })
        .catch((e) => {
            console.log("Error during signup:", e); // Log the error
        });
}

    

    return (
        <>
            <Header />
            <div className='signin'>
                <div className='center-page'>
                    <h1 id='sign'>Welcome to Signup Page</h1>
                    <div className='signup-page'>
                        {/* Input fields */}
                        <label className='label-class'>Username</label>
                        <input className='input-class' type="text" value={username} onChange={(e) => setusername(e.target.value)} />

                        <label className='label-class'>Mobile</label>
                        <input className='input-class' type="text" value={mobile} onChange={(e) => setmobile(e.target.value)} />

                        <label className='label-class'>Email</label>
                        <input className='input-class' type="email" value={email} onChange={(e) => setemail(e.target.value)} />

                        <label className='label-class'>Password</label>
                        <input className='input-class' type="password" value={password} onChange={(e) => setpassword(e.target.value)} />

                        {/* OTP Section */}
                        {otpSent && (
                            <>
                                <label className='label-class'>Enter OTP</label>
                                <input className='input-class' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </>
                        )}

                        {/* Buttons */}
                        <div className='btn-container'>
                            {!otpSent ? (
                                <button onClick={sendOtp} className='logout-btn btn btn-dark'>Send OTP</button>
                            ) : (
                                <button onClick={verifyOtpAndSignup} className='logout-btn btn btn-dark'>Signup</button>
                            )}
                            <button className='logout-btn btn'><Link to='/login' className='link-class'>Login</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;