import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/signup', {
            email: e.target.userMail.value,
            password: e.target.userPassword.value
        })
            .then(res => {
                console.log(e.target.userMail.value)
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            This is a Signup page
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='userMail'>
                    E-mail
                    <input type="text" name="userMail" required />
                </label>
                <label htmlFor="userPassword">
                    Password
                    <input type='text' name="userPassword" required />
                </label>
                <input type="submit" value="Sign up!" />
            </form>
            <br />
            Already an account ?
            <NavLink to="/login">
                Log in !
            </NavLink>
        </div>
    );
};

export default Signup;