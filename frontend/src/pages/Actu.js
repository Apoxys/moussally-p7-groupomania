import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';
import { IsConnected } from '../components/AppContext';

const Actu = () => {
    const isConnected = useContext(IsConnected);
    // declarecontext + useContext to check if user is connected
    let navigate = useNavigate()

    useEffect(() => {
        if (isConnected === false) {
            navigate("/login") // go to login/signup if not connected
        }
        if (isConnected === true) {
            navigate("/") //go to app if connected
        }

    }, []);

    return (
        <div className='main'>
            <Nav />
            <h2>Retrouvez l'actualité des publications</h2>
            <div className='postsection'>
                <Card />
            </div>
        </div>
    );
};

export default Actu;