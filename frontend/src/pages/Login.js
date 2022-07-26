import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAdminContext, userContext, userTokenContext } from '../context/UserContext';
import logo from '../assets/GroupoLogos/logo-left-font.png'



const Login = () => {

    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)
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
                setIsAdmin(`${res.data.isAdmin}`)

                localStorage.setItem("userConnected", `${res.data.userId}`)
                localStorage.setItem("userToken", `${res.data.token}`)
                localStorage.setItem("isAdmin", `${res.data.isAdmin}`)
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {

    }, [])
    return (
        <div className='logup'>
            <img className='logo' src={logo} alt='logo groupomania' />
            <h1>This is a login page</h1>
            <form className='logup-form' onSubmit={(e) => handleSubmit(e)}>
                <label className='logup-form-email' htmlFor='userMail'>
                    E-mail
                    <input type="text" name="userMail" required />
                </label>
                <label className='logup-form-pwd' htmlFor="userPassword">
                    Password
                    <input type='password' name="userPassword" required />
                </label>
                <input type='submit' value="Log in!" />
            </form>
            <br />
            <p>No account yet ? Create one !</p>
            <NavLink to="/signup">
                Sign up !
            </NavLink>

        </div>
    );
};

export default Login;