import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { userContext, userTokenContext, userAdminContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const SpecificCard = ({ post }) => {

    //popup alert MySweetAlert with react
    const mySwal = withReactContent(Swal)

    const navigate = useNavigate();

    //contextimport
    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)

    axios.defaults.headers.common['Authorization'] = userToken

    const [canModify, setCanModify] = useState(false)

    //Check if users have rights to modify current post
    const checkUserRights = () => {

        if (isAdmin === 'true' || currentUser == post.authorId) {
            setCanModify(true)
        }

        console.log('check: ', canModify)
    }

    // import from Card component / used to update
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
    //endofimport

    //delete logic
    const deletePostHandler = () => {
        console.log(post._id)
        mySwal.fire({
            title: 'Do you want to delete this post?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                console.log('here')
                axios.delete("http://localhost:3001/api/posts/" + post._id)
                    .then(res => {
                        // console.log(res)
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
                console.log(res)
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
                console.log(res)
            })
            .catch(error => {
                console.log("likes error", error)
            })
    }

    useEffect(() => {
        checkUserRights();
    }, [])

    return (
        <main className='specific-card'>
            <article className='specific-card-article'>

                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <img src={post.imageUrl} alt='' />
            </article>

            <aside className='specific-card-aside'>
                <span onClick={(e) => handleLike(e)}>number of likes : {" " + post.likes}</span>
                <br />
                <span onClick={(e) => handleDislike(e)}>number of dislikes : {" " + post.dislikes}</span>
                <br />
                Posté le {dateFormater(post.date)}
            </aside>
            <div>
                {
                    canModify ?
                        < div >
                            <button onClick={() => { navigate("/edit-post/" + post._id) }}>Modify post</button>
                            <button onClick={() => deletePostHandler()}>Delete post</button>
                        </div >
                        :
                        ""
                }
            </div>
        </main >
    );
};

export default SpecificCard;