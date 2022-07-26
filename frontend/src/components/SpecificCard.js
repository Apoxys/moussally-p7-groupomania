import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userContext, userTokenContext, userAdminContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';



const SpecificCard = ({ post }) => {

    let URLparams = useParams()

    //popup alert MySweetAlert with react
    const mySwal = withReactContent(Swal)

    const navigate = useNavigate();

    //contextimport
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)

    //define defaults axios headers
    axios.defaults.headers.common['Authorization'] = userToken

    //checking users rights for modification / deletion
    const [canModify, setCanModify] = useState(false)

    //init likes/dislikes counters
    const [likes, setLikes] = useState(Number)
    const [dislikes, setDislikes] = useState(Number)

    //pop to display enlarged image
    const enlargeImage = () => {
        mySwal.fire({
            imageUrl: post.imageUrl
        })
    }

    //Check if users have rights to modify current post
    const checkUserRights = () => {
        console.log(currentUser, post.authorId)
        if (isAdmin === 'true' || currentUser == post.authorId) {
            setCanModify(true)
        }
        console.log('check: ', canModify)
    }

    // Date formater to display FR date
    const dateFormater = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        })
        return newDate
    }


    //delete logic
    const deletePostHandler = () => {
        console.log(post._id)
        mySwal.fire({
            title: 'Do you really want to delete this post?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete("http://localhost:3001/api/posts/" + post._id)
                        .then(res => {
                            mySwal.fire('Post deleted')
                            navigate("/")
                        })
                        .catch(error => {
                            console.log("delete error : ", error)
                        })

                } else if (result.isDenied) {
                    mySwal.fire('Not deleted')
                }
            })
    };


    //Likes logic
    const handleLike = (e) => {
        axios.post("http://localhost:3001/api/posts/" + post._id,
            {
                "like": 1
            })
            .then(res => {
                axios.get(`http://localhost:3001/api/posts/${URLparams.id}`)
                    .then(res => {
                        setLikes(res.data.likes)
                        setDislikes(res.data.dislikes)

                    })
                    .catch(error => {
                        console.log(error)
                    })

            })
            .catch(error => {
                console.log("likes error", error)
            })
    }
    // Dislikes logic
    const handleDislike = (e) => {
        axios.post("http://localhost:3001/api/posts/" + post._id,
            {
                "like": -1
            })
            .then(res => {
                axios.get(`http://localhost:3001/api/posts/${URLparams.id}`)
                    .then(res => {
                        setLikes(res.data.likes)
                        setDislikes(res.data.dislikes)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log("likes error", error)
            })
    }

    useEffect(() => {
        checkUserRights();
    }, [checkUserRights])

    return (
        <main className='specific-card'>
            <article className='specific-card-article'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <figure>
                    <figcaption>Cliquez l'image pour voir en grand</figcaption>
                    <img src={post.imageUrl} alt='' onClick={(e) => { enlargeImage(e) }} />
                </figure>
            </article>
            <aside className='specific-card-aside'>
                <div className='specific-card-aside-likes'>
                    <span onClick={(e) => handleLike(e)}><FaRegThumbsUp />
                        {" " +
                            `${likes ?
                                likes
                                :
                                post.likes
                            }`
                        }
                    </span>
                    <span onClick={(e) => handleDislike(e)}><FaRegThumbsDown />
                        {" " +
                            `${dislikes ?
                                dislikes
                                :
                                post.dislikes
                            }`
                        }
                    </span>
                </div>
                <p>Posté le {dateFormater(post.date)}</p>
            </aside>
            <div>
                {
                    canModify ?
                        <div className='specific-card-modify'>
                            <button onClick={() => { navigate("/edit-post/" + post._id) }}>Modify post</button>
                            <button onClick={() => deletePostHandler()}>Delete post</button>
                        </div>
                        :
                        ""
                }
            </div>
        </main >
    );
};

export default SpecificCard;