import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';

const Actu = () => {
    const [connected, setConnected] = useState(false);
    // declarecontext + useContext to check if user is connected
    let navigate = useNavigate()

    useEffect(() => {
        if (connected === false) {
            navigate("/login") // create login/signup page
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