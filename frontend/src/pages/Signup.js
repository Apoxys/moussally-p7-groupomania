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
                // Pop-up to confirm account creation, then links user to Login page
                mySwal.fire({
                    title: <strong>Votre compte a bien été créé !</strong>,
                    html: <p>Rendez vous sur la page de <a href="/login">connexion</a> pour vous connecter</p>
                })
            })
            .catch(error => {
                console.log(error)
                mySwal.fire({ title: <p>{error.response.data.error}</p> })
                setMailUsed(true)
            })
    }
    return (
        <div className='logup'>
            <img className='logo' src={logo} alt='logo groupomania' />
            <h1>Page d'inscription</h1>
            <form className='logup-form' onSubmit={(e) => handleSubmit(e)}>
                <label className='logup-form-email' htmlFor='userMail'>
                    E-mail
                    <input type="text" name="userMail" required />
                </label>
                <label className='logup-form-pwd' htmlFor="userPassword">
                    Mot de passe
                    <input type={passwordShown ? 'text' : 'password'} name="userPassword" required />
                    <span onClick={() => handleToggle()}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</span>
                </label>
                <small>Votre mot de passe doit contenir : <br /> 8 caractères minimum, <br />au moins une majuscule, <br />au moins un chiffre, <br />et aucun espace</small>
                <input type="submit" value="S'inscrire" />
            </form>
            {
                mailUsed ? <p className='login-error'>Ce mail est déjà utilisé</p> : ""
            }
            {
                accountCreated ? <p>Votre compte a bien été créé ! Rendez vous sur la page de connexion pour vous connecter</p> : ""
            }
            <br />
            <p>Vous avez déjà un compte ?</p>
            <NavLink to="/login">
                Connectez vous !
            </NavLink>
        </div>
    );
};

export default Signup;
