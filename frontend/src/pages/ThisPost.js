import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import SpecificCard from '../components/SpecificCard';
import { userTokenContext } from '../context/UserContext';


const ThisPost = () => {

    const { userToken, setUserToken } = useContext(userTokenContext)
    const [postData, setPostData] = useState([]);

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
            })
            .catch(error => {
                console.log(error, "dw, you'll get there")
            })
    };

    useEffect(() => {
        getThisData();
    }, [])

    return (
        <div className='main'>
            <Nav />
            Ici vous pouvez voir une publication précise
            <SpecificCard post={postData} />
        </div>
    );
};

export default ThisPost;