import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import SpecificCard from '../components/SpecificCard';
import { userTokenContext } from '../context/UserContext';


const ThisPost = () => {

    const { userToken, setUserToken } = useContext(userTokenContext)
    const [postData, setPostData] = useState({});

    // Fetch data from specific post
    //define URLparams Object to get post id
    let URLparams = useParams()
    //define user token
    axios.defaults.headers.common['Authorization'] = userToken
    //fetch and set data to be used in component
    const getThisData = () => {
        axios.get(`http://localhost:3001/api/posts/${URLparams.id}`)
            .then(res => {
                setPostData(res.data)
                console.log(postData)
            })
            .catch(error => {
                console.log(error)
            })
    };

    useEffect(() => {
        getThisData();
    }, [])

    return (
        <div className='global'>
            <Nav />
            <main className='maincontent'>
                <h1>Ici vous pouvez voir une publication précise</h1>
                {
                    postData ? <SpecificCard post={postData} /> : <p>Loading ...</p>
                }
            </main>
        </div>
    );
};

export default ThisPost;