// NOT USED IN ALPHA PROJECT

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Nav from '../components/Nav';

import axios from "axios";

const LikedPosts = () => {

    const [likedData, setLikedData] = useState([]);

    const getLikedData = () => {
        axios.get('http://localhost:3001/api/posts')
            .then(res => {
                // console.log(res.data);
                setLikedData(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    };


    useEffect(() => {
        getLikedData();
    }, []);

    return (
        <div className='global'>
            <Nav />
            <main>
                <h2>Ici vous retrouverez les posts que vous avez aimés</h2>
                {
                    likedData.map((post) =>
                        <Card key={post._id} post={post} />)
                }
            </main>
        </div>
    );
};

export default LikedPosts;