import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {

    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log('connected: ', connected);
    //     if (connected === true) {
    //         navigate("/") //go to app if connected
    //     }
    // }, [connected])
    // 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/login', {
            email: e.target.userMail.value,
            password: e.target.userPassword.value
        })
            .then(res => {
                console.log('ICI', res.data.userId)
                localStorage.setItem("userConnected", `${res.data.userId}`)
                navigate("/")
            })
            .catch(error => {
                console.log('ET LA', error)
            })
    }

    useEffect(() => {
        console.log('Login localStorage: ', localStorage)
    }, [])
    return (
        <div>
            This is a login page
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='userMail'>
                    E-mail
                    <input type="text" name="userMail" required />
                </label>
                <label htmlFor="userPassword">
                    Password
                    <input type='text' name="userPassword" required />
                </label>
                <input type='submit' value="Log in!" />
            </form>
            <br />
            No account yet ? Create one !
            <NavLink to="/signup">
                Sign up !
            </NavLink>
        </div>
    );
};

export default Login;