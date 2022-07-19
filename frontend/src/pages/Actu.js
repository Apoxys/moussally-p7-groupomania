import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav';
import { postContext } from '../context/PostContext';
import { userContext, userTokenContext } from '../context/UserContext';


const Actu = () => {
    const [data, setData] = useState([]);
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { currentPost, setCurrentPost } = useContext(postContext)

    const navigate = useNavigate();
    const userConnected = localStorage.getItem("userConnected")
    // console.log(localStorage)

    axios.defaults.headers.common['Authorization'] = userToken

    const getData = () => {
        axios.get('http://localhost:3001/api/posts')
            .then(res => {
                setData(res.data)
                console.log("boo", data)
            })
            .catch(error => {
                console.log(error)
            })
    };
    // const dataToStorage = () => {
    //     let postIdInMap = 0
    //     data.forEach((data) => {
    //         localStorage.setItem(postIdInMap, data._id)
    //         postIdInMap++;
    //     })
    //     console.log(localStorage)
    // };

    const handleSetPostId = (post_Id) => {
        // e.preventDefault();
        // console.log(e.target)
        setCurrentPost(post_Id)
        // console.log(currentPost)
        navigate("/post/id:" + post_Id)
    }

    useEffect(() => {
        if (!localStorage.userConnected) {
            navigate("/login") // go to login/signup if not connected
        }
        // console.log('user is :', currentUser)
        getData();
        // dataToStorage(data);
    }, []);

    return (

        <div className='main'>
            <Nav />
            <main>
                <h1>Bienvenue, {currentUser}</h1>
                <h2>Retrouvez l'actualité des publications</h2>
                <div className='postsection'>
                    {
                        data.map((post) =>
                            <Link
                                key={post._id}
                                to={"/post/id:" + post._id}
                            // onClick={() => handleSetPostId(post._id)}
                            // onClick={() => console.log('postid: ', post._id)}
                            >
                                <Card
                                    key={post._id}
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

export default Actu;