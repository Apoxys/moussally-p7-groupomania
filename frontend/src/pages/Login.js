import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAdminContext, userContext, userTokenContext } from '../context/UserContext';
import logo from '../assets/GroupoLogos/logo-left-font.png';
import { FaEyeSlash, FaEye } from 'react-icons/fa';



const Login = () => {

    const { setCurrentUser } = useContext(userContext)
    const { setUserToken } = useContext(userTokenContext)
    const { setIsAdmin } = useContext(userAdminContext)
    let navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState(false);

    const [credError, setCredError] = useState(false);

    //toggle to show or hide password input
    const handleToggle = () => {
        setPasswordShown(!passwordShown)
    }

    const handleSubmit = (e) => {
        if (credError === true) {
            setCredError(!credError)
        }
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
                setCredError(true)
            })
    }

    useEffect(() => {

    }, [])
    return (
        <div className='logup'>
            <img className='logo' src={logo} alt='logo groupomania' />
            <h1>Page de connexion</h1>
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
                <input type='submit' value="Connexion" />
            </form>
            {
                credError ? <p className='login-error'>Erreur mot de passe ou mail</p> : ""
            }
            <p>Pas encore de compte ? Créez en un !</p>
            <NavLink to="/signup">
                S'inscrire !
            </NavLink>

        </div>
    );
};

export default Login;