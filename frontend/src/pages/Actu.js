import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';
import userContext from '../context/UserContext';


const Actu = () => {
    const [data, setData] = useState([]);
    const { currentUser, setCurrentUser } = useContext(userContext)
    const navigate = useNavigate();
    const userConnected = localStorage.getItem("userConnected")
    console.log(localStorage)

    const getData = () => {
        axios.get('http://localhost:3001/api/posts')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    useEffect(() => {
        if (!localStorage.userConnected) {
            navigate("/login") // go to login/signup if not connected
        }
        console.log('user is :', currentUser)
        getData();
    }, []);

    return (

        <div className='main'>
            <Nav />
            <main>
                <h1>Bienvenue, {userConnected}</h1>
                <h2>Retrouvez l'actualité des publications</h2>
                <div className='postsection'>
                    {
                        data.map((post) =>
                            <Card key={post._id} post={post} />)
                    }

                </div>
            </main>
        </div>

    );
};

export default Actu;