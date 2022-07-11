import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IsConnected } from '../components/AppContext';


const Login = () => {
    const isConnected = useContext(IsConnected);
    let navigate = useNavigate();
    if (isConnected === true) {
        navigate("/") //go to app if connected
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/login', {
            email: e.target.userMail.value,
            password: e.target.userPassword.value
        })
            .then(res => {
                console.log(e.target.userMail.value, res)
            })
            .catch(error => {
                console.log(error)
            })
    }
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