import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/GroupoLogos/logo-left-font.png'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Signup = () => {

    const [passwordShown, setPasswordShown] = useState(false);

    const handleToggle = () => {
        setPasswordShown(!passwordShown)
    }

    //popup alert MySweetAlert with react
    const mySwal = withReactContent(Swal)

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
                mySwal.fire({
                    title: <strong>Votre compte a bien été créé !</strong>,
                    html: <p>Rendez vous sur la page <a href="/login">Login</a> pour vous connecter</p>
                })
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
                    <input type={passwordShown ? 'text' : 'password'} name="userPassword" required />
                    <span onClick={() => handleToggle()}>{passwordShown ? 'Hide Password' : 'Show Password'}</span>

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