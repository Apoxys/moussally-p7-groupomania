import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/GroupoLogos/logo-left-font.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const Signup = () => {

    const [passwordShown, setPasswordShown] = useState(false);

    const [mailUsed, setMailUsed] = useState(false);
    const [accountCreated, setAccountedCreated] = useState(false)

    const handleToggle = () => {
        setPasswordShown(!passwordShown)
    }

    //popup alert MySweetAlert with react
    const mySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        if (mailUsed === true) {
            setMailUsed(!mailUsed)
        }
        e.preventDefault();
        axios.post('http://localhost:3001/api/auth/signup', {
            email: e.target.userMail.value,
            password: e.target.userPassword.value
        })
            .then(res => {
                setAccountedCreated(true)
                // créer une alerte pour confirmer la création de compte, puis renvoyer vers la page Login pour farire la connection
                mySwal.fire({
                    title: <strong>Votre compte a bien été créé !</strong>,
                    html: <p>Rendez vous sur la page <a href="/login">Login</a> pour vous connecter</p>
                })
            })
            .catch(error => {
                console.log(error)
                setMailUsed(true)
            })
    }
    return (
        <div className='logup'>
            <img className='logo' src={logo} alt='logo groupomania' />
            <h1>Signup page</h1>
            <form className='logup-form' onSubmit={(e) => handleSubmit(e)}>
                <label className='logup-form-email' htmlFor='userMail'>
                    E-mail
                    <input type="text" name="userMail" required />
                </label>
                <label className='logup-form-pwd' htmlFor="userPassword">
                    Password
                    <input type={passwordShown ? 'text' : 'password'} name="userPassword" required />
                    <span onClick={() => handleToggle()}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</span>

                </label>
                <input type="submit" value="Sign up!" />
            </form>
            {
                mailUsed ? <p className='login-error'>This mail is already used</p> : ""
            }
            {
                accountCreated ? <p>Votre compte a bien été créé ! Rendez vous sur la page login pour vous connecter</p> : ""
            }
            <br />
            <p>Already an account ?</p>
            <NavLink to="/login">
                Log in !
            </NavLink>
        </div>
    );
};

export default Signup;