import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModifyPostForm from '../components/ModifyPostForm';
import Nav from '../components/Nav';
import { useParams } from 'react-router-dom';

const ModifyPost = () => {

    let URLparams = useParams()

    const [postData, setPostData] = useState([])

    const getThisData = () => {
        axios.get(`http://localhost:3001/api/posts/${URLparams.id}`)

            .then(res => {
                setPostData(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    };

    useEffect(() => {
        getThisData();
    }, [])

    return (
        <div className='main'>
            <Nav />
            Here you modify your post
            <ModifyPostForm post={postData} />
        </div>
    );
};

export default ModifyPost;