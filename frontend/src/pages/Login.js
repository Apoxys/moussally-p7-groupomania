import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext, userTokenContext } from '../context/UserContext';



const Login = () => {

    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/login', {
            email: e.target.userMail.value,
            password: e.target.userPassword.value
        })
            .then(res => {
                setCurrentUser(`${res.data.userId}`)
                setUserToken(`${res.data.token}`)
                localStorage.setItem("userConnected", `${res.data.userId}`,)
                localStorage.setItem("userToken", `${res.data.token}`)
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {

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
                    <input type='password' name="userPassword" required />
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