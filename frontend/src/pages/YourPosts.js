import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';
import { userContext, userTokenContext } from '../context/UserContext';

const YourPosts = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const [yourData, setYourData] = useState([])


    const navigate = useNavigate()

    axios.defaults.headers.common['Authorization'] = userToken

    const getYourData = () => {
        if (!currentUser) {  // reset userId and auth token if user resfreshes based on localStorage
            setCurrentUser(localStorage.userConnected)
            setUserToken(localStorage.userToken)
        }
        axios.get('http://localhost:3001/api/posts/user-posts')
            .then(res => {
                setYourData(res.data)
                console.log(yourData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (!localStorage.getItem("userConnected")) {
            navigate("/login")
        }
        getYourData()
    }, [currentUser])

    return (
        <div className='global'>
            <Nav />
            <main className='maincontent'>
                <h1>Ici les publications dont vous êtes à l'origine</h1>
                <div className='postsection'>
                    {
                        !yourData.length ?
                            <div className='empty'>
                                <p>Vous n'avez encore rien publié. </p>
                                <p>Rendez vous sur la page <Link to='/publish'>Publier un nouveau post </Link> pour commencer !</p>
                            </div>
                            :
                            yourData.map((post) =>
                                <Link
                                    key={"link_key" + post._id}
                                    to={"/post/" + post._id}
                                >
                                    <Card
                                        key={"card_key" + post._id}
                                        post={post}
                                    />
                                </Link>
                            )
                    }
                </div>

            </main>
        </div>
    );
};

export default YourPosts;