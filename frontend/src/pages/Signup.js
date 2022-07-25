import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/GroupoLogos/logo-left-font.png'


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
        <div className='logup'>
            <img className='logo' src={logo} alt='logo groupomania' />
            <h1>This is a Signup page</h1>
            <form className='logup-form' onSubmit={(e) => handleSubmit(e)}>
                <label className='logup-form-email' htmlFor='userMail'>
                    E-mail
                    <input type="text" name="userMail" required />
                </label>
                <label className='logup-form-pwd' htmlFor="userPassword">
                    Password
                    <input type='text' name="userPassword" required />
                </label>
                <input type="submit" value="Sign up!" />
            </form>
            <br />
            <p>Already an account ?</p>
            <NavLink to="/login">
                Log in !
            </NavLink>
        </div>
    );
};

export default Signup;