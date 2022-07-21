import React from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/signup', {
            email: e.target.userMail.value,
            password: e.target.userPassword.value
        })
            .then(res => {
                console.log(e.target.userMail.value)
                console.log(res)
                // créer une alerte pour confirmer la création de compte, puis renvoyer vers la page Login pour farire la connection
                window.alert("Votre compte a été créé ! Rendez vous sur la page Login pour vous connecter !")
                navigate("/Login")
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