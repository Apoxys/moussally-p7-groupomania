import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';
import userContext from '../context/UserContext';

const YourPosts = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("userConnected")) {
            navigate("/login")
        }
        if (currentUser) {
            axios.get('http://localhost:3001/api/posts')
        }
    }, [])

    return (
        <div className='main'>
            <Nav />
            <main>
                <h2>Ici les publications dont vous êtes à l'origine</h2>

            </main>
        </div>
    );
};

export default YourPosts;