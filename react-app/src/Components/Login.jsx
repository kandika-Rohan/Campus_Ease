// Login.js
import './Header.css';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
    const navigate = useNavigate();

    const handleapi = () => {
        const url = "http://localhost:4000/login";
        const data = { username, password };

        axios.post(url, data)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    setIsLoggedIn(true); // Set login status to true
                    navigate('/');
                } else {
                    alert(res.data.message);
                    navigate('/login');
                }
            })
            .catch((e) => {
                console.log(e);
                alert("User not found");
                navigate('/login');
            });
    }

    return (
        <div className='loginclass'>
            <Header isLoggedIn={isLoggedIn} /> {/* Pass login status to Header */}
            <div className='background-image'>
                <div className='loginpage'>
                    <h1 className="heading">Welcome to the login page</h1>
                    <label htmlFor="" className='label-class'>Username</label>
                    <input
                        type="text"
                        value={username}
                        className='input-class'
                        placeholder='Enter username'
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <label htmlFor="" className='label-class'>Password</label>
                    <input
                        type="password"
                        placeholder='Enter password'
                        className='input-class'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <div className='btn-container'>
                        <button onClick={handleapi} className='login-btn btn btn-dark'>Login</button>
                        <button className='logout-btn mr-3'>
                            <Link to='/signup' className='signup-btn btn '>SignUp</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
